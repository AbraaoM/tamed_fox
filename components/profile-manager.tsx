"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { 
  Save, 
  Trash2, 
  Plus,
  User,
  Mail,
  Phone,
  Building,
  FileText,
  CheckCircle,
  AlertCircle,
  Edit,
  Eye,
  X,
  Copy,
  Check
} from "lucide-react";
import { toast } from "sonner";
import { 
  Profile, 
  ProfileFormData, 
  UpdateProfileData,
  validateProfile,
  formatProfileData,
  createEmptyProfile,
  isProfileComplete,
  getProfileCompletionPercentage,
  PROFILE_LABELS,
  PROFILE_FIELDS
} from "@/models/profile";

interface ProfileManagerProps {
  userId: string;
  initialData?: Profile | null;
}

export function ProfileManager({ userId, initialData }: ProfileManagerProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [mode, setMode] = useState<'view' | 'edit' | 'create'>(
    initialData ? 'view' : 'create'
  );

  const [formData, setFormData] = useState<ProfileFormData>(
    initialData ? formatProfileData(initialData) : createEmptyProfile()
  );

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const handleCopyToClipboard = async (text: string, fieldName: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      toast.success(`${fieldName} copiado!`);
      
      setTimeout(() => {
        setCopiedField(null);
      }, 2000);
    } catch (err) {
      toast.error("Erro ao copiar");
    }
  };

  const handleInputChange = (field: keyof ProfileFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    if (validationErrors[field]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSave = async () => {
    const validation = validateProfile(formData);
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      toast.error("Por favor, corrija os erros no formulário");
      return;
    }

    setIsLoading(true);
    try {
      const supabase = createClient();
      
      if (mode === 'create') {
        const { error } = await supabase
          .from('profiles')
          .insert([{ ...formData, user_id: userId }]);
        
        if (error) throw error;
        toast.success("Perfil criado com sucesso!");
        setMode('view');
      } else if (mode === 'edit') {
        const updateData: UpdateProfileData = { ...formData };
        
        const { error } = await supabase
          .from('profiles')
          .update(updateData)
          .eq('user_id', userId);
        
        if (error) throw error;
        toast.success("Perfil atualizado com sucesso!");
        setMode('view');
      }
      
      router.refresh();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Erro capturado:", error.message);
        toast.error(`Erro ao salvar: ${error.message}`);
      } else {
        console.error("Erro desconhecido:", error);
        toast.error("Erro desconhecido ao salvar");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Tem certeza que deseja excluir o perfil? Esta ação não pode ser desfeita.")) {
      return;
    }

    setIsDeleting(true);
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('user_id', userId);
      
      if (error) throw error;
      toast.success("Perfil excluído com sucesso!");
      setMode('create');
      setFormData(createEmptyProfile());
      router.refresh();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Erro capturado:", error.message);
        toast.error(`Erro ao excluir perfil: ${error.message}`);
      } else {
        console.error("Erro desconhecido:", error);
        toast.error("Erro desconhecido ao excluir");
      }
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancel = () => {
    if (initialData) {
      setFormData(formatProfileData(initialData));
      setMode('view');
    } else {
      setMode('create');
    }
    setValidationErrors({});
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Não informado";
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Se não há dados e não está criando, mostrar tela inicial
  if (!initialData && mode === 'view') {
    return (
      <div className="hero min-h-96 bg-base-200 rounded-box">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <div className="text-4xl sm:text-6xl mb-4 sm:mb-6">👤</div>
            <h1 className="text-2xl sm:text-4xl font-bold mb-3 sm:mb-4">Nenhum perfil encontrado</h1>
            <p className="text-sm sm:text-lg text-base-content/70 mb-6 sm:mb-8">
              Configure suas informações de perfil para começar
            </p>
            <button 
              className="btn btn-primary btn-sm sm:btn-lg gap-2 sm:gap-3"
              onClick={() => setMode('create')}
            >
              <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
              Criar Perfil
            </button>
          </div>
        </div>
      </div>
    );
  }

  const completionPercentage = initialData ? getProfileCompletionPercentage(initialData) : 0;
  const isComplete = initialData ? isProfileComplete(initialData) : false;

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Header com ações - responsivo */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-6">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <div className={`badge badge-lg gap-2 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium ${
            mode === 'view' ? 'badge-primary' : 
            mode === 'edit' ? 'badge-secondary' : 
            'badge-outline'
          }`}>
            {mode === 'view' ? (
              <>
                <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                Visualização
              </>
            ) : mode === 'edit' ? (
              <>
                <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                Editando
              </>
            ) : (
              <>
                <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                Criando
              </>
            )}
          </div>
          
          {initialData && (
            <div className={`badge badge-lg gap-2 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium ${
              isComplete ? 'badge-success' : 'badge-warning'
            }`}>
              {isComplete ? (
                <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />
              ) : (
                <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4" />
              )}
              {completionPercentage}% completo
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {mode === 'view' && initialData && (
            <>
              <button 
                className="btn btn-outline btn-sm sm:btn-md gap-2"
                onClick={() => setMode('edit')}
              >
                <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Editar</span>
              </button>
              <button 
                className="btn btn-error btn-sm sm:btn-md gap-2"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                )}
                <span className="hidden sm:inline">
                  {isDeleting ? "Excluindo..." : "Excluir"}
                </span>
              </button>
            </>
          )}
          
          {(mode === 'edit' || mode === 'create') && (
            <>
              <button 
                className="btn btn-ghost btn-sm sm:btn-md gap-2"
                onClick={handleCancel}
              >
                <X className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Cancelar</span>
              </button>
              <button 
                className="btn btn-primary btn-sm sm:btn-md gap-2"
                onClick={handleSave}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  <Save className="h-3 w-3 sm:h-4 sm:w-4" />
                )}
                <span className="hidden sm:inline">
                  {isLoading ? "Salvando..." : "Salvar"}
                </span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Formulário Principal - responsivo */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body p-4 sm:p-6 lg:p-8">
          <h2 className="card-title flex items-center gap-3 text-lg sm:text-xl mb-4 sm:mb-6">
            <User className="h-5 w-5 sm:h-6 sm:w-6" />
            Informações Pessoais
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Nome Completo */}
            <div className="form-control">
              <label className="label pb-2">
                <span className="label-text flex items-center gap-2 text-sm sm:text-base font-medium">
                  <User className="h-4 w-4" />
                  Nome Completo
                  <span className="text-error text-lg">*</span>
                </span>
              </label>
              {mode === 'view' ? (
                <div className="p-3 sm:p-4 bg-base-200 rounded-lg min-h-[44px] sm:min-h-[52px] flex items-center justify-between text-sm sm:text-base">
                  <span>{formData.full_name || <span className="text-base-content/50">Não informado</span>}</span>
                  {formData.full_name && (
                    <button
                      className="btn btn-ghost btn-xs sm:btn-sm gap-1 ml-2"
                      onClick={() => handleCopyToClipboard(formData.full_name, 'Nome')}
                      title="Copiar nome"
                    >
                      {copiedField === 'Nome' ? (
                        <Check className="h-3 w-3" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </button>
                  )}
                </div>
              ) : (
                <>
                  <input
                    type="text"
                    placeholder="Digite seu nome completo"
                    className={`input input-bordered w-full h-11 sm:h-[52px] text-sm sm:text-base ${
                      validationErrors.full_name ? 'input-error' : ''
                    }`}
                    value={formData.full_name}
                    onChange={(e) => handleInputChange('full_name', e.target.value)}
                  />
                  {validationErrors.full_name && (
                    <label className="label pt-1">
                      <span className="label-text-alt text-error text-xs sm:text-sm">
                        {validationErrors.full_name}
                      </span>
                    </label>
                  )}
                </>
              )}
            </div>

            {/* Email Interno */}
            <div className="form-control">
              <label className="label pb-2">
                <span className="label-text flex items-center gap-2 text-sm sm:text-base font-medium">
                  <Mail className="h-4 w-4" />
                  Email Interno
                  <span className="text-error text-lg">*</span>
                </span>
              </label>
              {mode === 'view' ? (
                <div className="p-3 sm:p-4 bg-base-200 rounded-lg min-h-[44px] sm:min-h-[52px] flex items-center justify-between text-sm sm:text-base">
                  <span className="truncate mr-2">{formData.internal_email || <span className="text-base-content/50">Não informado</span>}</span>
                  {formData.internal_email && (
                    <button
                      className="btn btn-ghost btn-xs sm:btn-sm gap-1 flex-shrink-0"
                      onClick={() => handleCopyToClipboard(formData.internal_email, 'Email')}
                      title="Copiar email"
                    >
                      {copiedField === 'Email' ? (
                        <Check className="h-3 w-3 text-success" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </button>
                  )}
                </div>
              ) : (
                <>
                  <input
                    type="email"
                    placeholder="email@empresa.com"
                    className={`input input-bordered w-full h-11 sm:h-[52px] text-sm sm:text-base ${
                      validationErrors.internal_email ? 'input-error' : ''
                    }`}
                    value={formData.internal_email}
                    onChange={(e) => handleInputChange('internal_email', e.target.value)}
                  />
                  {validationErrors.internal_email && (
                    <label className="label pt-1">
                      <span className="label-text-alt text-error text-xs sm:text-sm">
                        {validationErrors.internal_email}
                      </span>
                    </label>
                  )}
                </>
              )}
            </div>

            {/* Telefone Interno */}
            <div className="form-control">
              <label className="label pb-2">
                <span className="label-text flex items-center gap-2 text-sm sm:text-base font-medium">
                  <Phone className="h-4 w-4" />
                  Telefone Interno
                  <span className="text-error text-lg">*</span>
                </span>
              </label>
              {mode === 'view' ? (
                <div className="p-3 sm:p-4 bg-base-200 rounded-lg min-h-[44px] sm:min-h-[52px] flex items-center justify-between text-sm sm:text-base">
                  <span>{formData.internal_phone || <span className="text-base-content/50">Não informado</span>}</span>
                  {formData.internal_phone && (
                    <button
                      className="btn btn-ghost btn-xs sm:btn-sm gap-1 ml-2"
                      onClick={() => handleCopyToClipboard(formData.internal_phone, 'Telefone')}
                      title="Copiar telefone"
                    >
                      {copiedField === 'Telefone' ? (
                        <Check className="h-3 w-3 text-success" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </button>
                  )}
                </div>
              ) : (
                <>
                  <input
                    type="tel"
                    placeholder="(11) 99999-9999"
                    className={`input input-bordered w-full h-11 sm:h-[52px] text-sm sm:text-base ${
                      validationErrors.internal_phone ? 'input-error' : ''
                    }`}
                    value={formData.internal_phone}
                    onChange={(e) => handleInputChange('internal_phone', e.target.value)}
                  />
                  {validationErrors.internal_phone && (
                    <label className="label pt-1">
                      <span className="label-text-alt text-error text-xs sm:text-sm">
                        {validationErrors.internal_phone}
                      </span>
                    </label>
                  )}
                </>
              )}
            </div>

            {/* Nome da Empresa */}
            <div className="form-control">
              <label className="label pb-2">
                <span className="label-text flex items-center gap-2 text-sm sm:text-base font-medium">
                  <Building className="h-4 w-4" />
                  Nome da Empresa
                </span>
              </label>
              {mode === 'view' ? (
                <div className="p-3 sm:p-4 bg-base-200 rounded-lg min-h-[44px] sm:min-h-[52px] flex items-center justify-between text-sm sm:text-base">
                  <span>{formData.company_name || <span className="text-base-content/50">Não informado</span>}</span>
                  {formData.company_name && (
                    <button
                      className="btn btn-ghost btn-xs sm:btn-sm gap-1 ml-2"
                      onClick={() => handleCopyToClipboard(formData.company_name, 'Empresa')}
                      title="Copiar nome da empresa"
                    >
                      {copiedField === 'Empresa' ? (
                        <Check className="h-3 w-3 text-success" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </button>
                  )}
                </div>
              ) : (
                <input
                  type="text"
                  placeholder="Nome da sua empresa"
                  className="input input-bordered w-full h-11 sm:h-[52px] text-sm sm:text-base"
                  value={formData.company_name}
                  onChange={(e) => handleInputChange('company_name', e.target.value)}
                />
              )}
            </div>
          </div>

          {/* Documento - full width */}
          <div className="form-control mt-4 sm:mt-6">
            <label className="label pb-2">
              <span className="label-text flex items-center gap-2 text-sm sm:text-base font-medium">
                <FileText className="h-4 w-4" />
                Documento (CPF/CNPJ)
              </span>
            </label>
            {mode === 'view' ? (
              <div className="p-3 sm:p-4 bg-base-200 rounded-lg min-h-[44px] sm:min-h-[52px] flex items-center justify-between text-sm sm:text-base">
                <span>{formData.document_id || <span className="text-base-content/50">Não informado</span>}</span>
                {formData.document_id && (
                  <button
                    className="btn btn-ghost btn-xs sm:btn-sm gap-1 ml-2"
                    onClick={() => handleCopyToClipboard(formData.document_id, 'Documento')}
                    title="Copiar documento"
                  >
                    {copiedField === 'Documento' ? (
                      <Check className="h-3 w-3 text-success" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </button>
                )}
              </div>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="CPF ou CNPJ"
                  className={`input input-bordered w-full h-11 sm:h-[52px] text-sm sm:text-base ${
                    validationErrors.document_id ? 'input-error' : ''
                  }`}
                  value={formData.document_id}
                  onChange={(e) => handleInputChange('document_id', e.target.value)}
                />
                {validationErrors.document_id && (
                  <label className="label pt-1">
                    <span className="label-text-alt text-error text-xs sm:text-sm">
                      {validationErrors.document_id}
                    </span>
                  </label>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Progress Bar para completude do perfil */}
      {initialData && (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body p-4 sm:p-6 lg:p-8">
            <h3 className="card-title text-lg sm:text-xl mb-4 sm:mb-6">🎯 Completude do Perfil</h3>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <progress 
                className={`progress w-full h-3 sm:h-4 ${
                  completionPercentage === 100 ? 'progress-success' :
                  completionPercentage >= 75 ? 'progress-info' :
                  completionPercentage >= 50 ? 'progress-warning' :
                  'progress-error'
                }`}
                value={completionPercentage} 
                max="100"
              ></progress>
              <span className="font-bold text-lg sm:text-xl min-w-fit">{completionPercentage}%</span>
            </div>
            <div className="text-sm sm:text-base mt-3 sm:mt-4">
              {isComplete ? (
                <span className="text-success font-medium">✅ Perfil completo!</span>
              ) : (
                <span className="text-warning font-medium">⚠️ Complete seu perfil para melhor experiência</span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Dicas de preenchimento - só no modo edição/criação */}
      {(mode === 'edit' || mode === 'create') && (
        <div className="alert alert-info">
          <div className="w-full">
            <h3 className="font-bold text-base sm:text-lg mb-2 sm:mb-3">💡 Dicas de Preenchimento</h3>
            <div className="text-xs sm:text-sm space-y-1 sm:space-y-2">
              <ul className="list-disc list-inside space-y-1 sm:space-y-2">
                <li>Os campos marcados com <span className="text-error font-semibold">*</span> são obrigatórios</li>
                <li>Use um email válido para facilitar o contato</li>
                <li>O telefone deve incluir DDD</li>
                <li>O documento pode ser CPF (11 dígitos) ou CNPJ (14 dígitos)</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}