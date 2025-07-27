"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { 
  Save, 
  RefreshCw, 
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
  X
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
  const [mode, setMode] = useState<'view' | 'edit' | 'create'>(
    initialData ? 'view' : 'create'
  );

  const [formData, setFormData] = useState<ProfileFormData>(
    initialData ? formatProfileData(initialData) : createEmptyProfile()
  );

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: keyof ProfileFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Limpar erro específico quando o usuário começar a digitar
    if (validationErrors[field]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSave = async () => {
    // Validar dados
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
    } catch (error: any) {
      console.error("Erro ao salvar:", error);
      toast.error(`Erro ao salvar: ${error.message}`);
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
    } catch (error: any) {
      console.error("Erro ao excluir:", error);
      toast.error("Erro ao excluir o perfil");
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
      <div className="hero min-h-96">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <div className="text-6xl mb-6">👤</div>
            <h1 className="text-4xl font-bold mb-4">Nenhum perfil encontrado</h1>
            <p className="text-lg text-base-content/70 mb-8">
              Configure suas informações de perfil para começar
            </p>
            <button 
              className="btn btn-primary btn-lg gap-3"
              onClick={() => setMode('create')}
            >
              <Plus className="h-5 w-5" />
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
    <div className="space-y-8">
      {/* Header com ações */}
      <div className="flex justify-between items-center flex-wrap gap-6">
        <div className="flex items-center gap-3 flex-wrap">
          <div className={`badge badge-lg gap-2 px-4 py-3 text-sm font-medium ${
            mode === 'view' ? 'badge-primary' : 
            mode === 'edit' ? 'badge-secondary' : 
            'badge-outline'
          }`}>
            {mode === 'view' ? (
              <>
                <Eye className="h-4 w-4" />
                Visualização
              </>
            ) : mode === 'edit' ? (
              <>
                <Edit className="h-4 w-4" />
                Editando
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" />
                Criando
              </>
            )}
          </div>
          
          {initialData && (
            <>
              <div className="badge badge-outline badge-md font-mono text-xs px-3 py-2">
                ID: {initialData.id.slice(0, 8)}...
              </div>
              <div className={`badge badge-lg gap-2 px-4 py-3 text-sm font-medium ${
                isComplete ? 'badge-success' : 'badge-warning'
              }`}>
                {isComplete ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <AlertCircle className="h-4 w-4" />
                )}
                {completionPercentage}% completo
              </div>
            </>
          )}
        </div>
        
        <div className="flex gap-3">
          {mode === 'view' && initialData && (
            <>
              <button 
                className="btn btn-outline gap-2"
                onClick={() => setMode('edit')}
              >
                <Edit className="h-4 w-4" />
                Editar
              </button>
              <button 
                className="btn btn-error gap-2"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
                {isDeleting ? "Excluindo..." : "Excluir"}
              </button>
            </>
          )}
          
          {(mode === 'edit' || mode === 'create') && (
            <>
              <button 
                className="btn btn-ghost gap-2"
                onClick={handleCancel}
              >
                <X className="h-4 w-4" />
                Cancelar
              </button>
              <button 
                className="btn btn-primary gap-2"
                onClick={handleSave}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  <Save className="h-4 w-4" />
                )}
                {isLoading ? "Salvando..." : "Salvar"}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Formulário Principal */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body p-8">
          <h2 className="card-title flex items-center gap-3 text-xl mb-6">
            <User className="h-6 w-6" />
            Informações Pessoais
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nome Completo */}
            <div className="form-control">
              <label className="label pb-2">
                <span className="label-text flex items-center gap-2 text-base font-medium">
                  <User className="h-4 w-4" />
                  {PROFILE_LABELS[PROFILE_FIELDS.FULL_NAME]}
                  <span className="text-error text-lg">*</span>
                </span>
              </label>
              {mode === 'view' ? (
                <div className="p-4 bg-base-200 rounded-lg min-h-[52px] flex items-center text-base">
                  {formData.full_name || <span className="text-base-content/50">Não informado</span>}
                </div>
              ) : (
                <>
                  <input
                    type="text"
                    placeholder="Digite seu nome completo"
                    className={`input input-bordered w-full h-[52px] text-base ${
                      validationErrors.full_name ? 'input-error' : ''
                    }`}
                    value={formData.full_name}
                    onChange={(e) => handleInputChange('full_name', e.target.value)}
                  />
                  {validationErrors.full_name && (
                    <label className="label pt-1">
                      <span className="label-text-alt text-error text-sm">
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
                <span className="label-text flex items-center gap-2 text-base font-medium">
                  <Mail className="h-4 w-4" />
                  {PROFILE_LABELS[PROFILE_FIELDS.INTERNAL_EMAIL]}
                  <span className="text-error text-lg">*</span>
                </span>
              </label>
              {mode === 'view' ? (
                <div className="p-4 bg-base-200 rounded-lg min-h-[52px] flex items-center text-base">
                  {formData.internal_email || <span className="text-base-content/50">Não informado</span>}
                </div>
              ) : (
                <>
                  <input
                    type="email"
                    placeholder="email@empresa.com"
                    className={`input input-bordered w-full h-[52px] text-base ${
                      validationErrors.internal_email ? 'input-error' : ''
                    }`}
                    value={formData.internal_email}
                    onChange={(e) => handleInputChange('internal_email', e.target.value)}
                  />
                  {validationErrors.internal_email && (
                    <label className="label pt-1">
                      <span className="label-text-alt text-error text-sm">
                        {validationErrors.internal_email}
                      </span>
                    </label>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {/* Telefone Interno */}
            <div className="form-control">
              <label className="label pb-2">
                <span className="label-text flex items-center gap-2 text-base font-medium">
                  <Phone className="h-4 w-4" />
                  {PROFILE_LABELS[PROFILE_FIELDS.INTERNAL_PHONE]}
                  <span className="text-error text-lg">*</span>
                </span>
              </label>
              {mode === 'view' ? (
                <div className="p-4 bg-base-200 rounded-lg min-h-[52px] flex items-center text-base">
                  {formData.internal_phone || <span className="text-base-content/50">Não informado</span>}
                </div>
              ) : (
                <>
                  <input
                    type="tel"
                    placeholder="(11) 99999-9999"
                    className={`input input-bordered w-full h-[52px] text-base ${
                      validationErrors.internal_phone ? 'input-error' : ''
                    }`}
                    value={formData.internal_phone}
                    onChange={(e) => handleInputChange('internal_phone', e.target.value)}
                  />
                  {validationErrors.internal_phone && (
                    <label className="label pt-1">
                      <span className="label-text-alt text-error text-sm">
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
                <span className="label-text flex items-center gap-2 text-base font-medium">
                  <Building className="h-4 w-4" />
                  {PROFILE_LABELS[PROFILE_FIELDS.COMPANY_NAME]}
                </span>
              </label>
              {mode === 'view' ? (
                <div className="p-4 bg-base-200 rounded-lg min-h-[52px] flex items-center text-base">
                  {formData.company_name || <span className="text-base-content/50">Não informado</span>}
                </div>
              ) : (
                <input
                  type="text"
                  placeholder="Nome da sua empresa"
                  className="input input-bordered w-full h-[52px] text-base"
                  value={formData.company_name}
                  onChange={(e) => handleInputChange('company_name', e.target.value)}
                />
              )}
            </div>
          </div>

          {/* Documento */}
          <div className="form-control mt-4">
            <label className="label pb-2">
              <span className="label-text flex items-center gap-2 text-base font-medium">
                <FileText className="h-4 w-4" />
                {PROFILE_LABELS[PROFILE_FIELDS.DOCUMENT_ID]}
              </span>
            </label>
            {mode === 'view' ? (
              <div className="p-4 bg-base-200 rounded-lg min-h-[52px] flex items-center text-base">
                {formData.document_id || <span className="text-base-content/50">Não informado</span>}
              </div>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="CPF ou CNPJ"
                  className={`input input-bordered w-full h-[52px] text-base ${
                    validationErrors.document_id ? 'input-error' : ''
                  }`}
                  value={formData.document_id}
                  onChange={(e) => handleInputChange('document_id', e.target.value)}
                />
                {validationErrors.document_id && (
                  <label className="label pt-1">
                    <span className="label-text-alt text-error text-sm">
                      {validationErrors.document_id}
                    </span>
                  </label>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Informações do Sistema */}
      {initialData && (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body p-8">
            <h2 className="card-title text-xl mb-6">Informações do Sistema</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="form-control">
                <label className="label pb-2">
                  <span className="label-text text-base font-medium">ID do Usuário:</span>
                </label>
                <div className="p-4 bg-base-200 rounded-lg font-mono text-sm break-all">
                  {initialData.user_id}
                </div>
              </div>
              <div className="form-control">
                <label className="label pb-2">
                  <span className="label-text text-base font-medium">Criado em:</span>
                </label>
                <div className="p-4 bg-base-200 rounded-lg text-base">
                  {formatDate(initialData.created_at)}
                </div>
              </div>
              <div className="form-control">
                <label className="label pb-2">
                  <span className="label-text text-base font-medium">Última atualização:</span>
                </label>
                <div className="p-4 bg-base-200 rounded-lg text-base">
                  {formatDate(initialData.updated_at)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dicas de preenchimento */}
      {(mode === 'edit' || mode === 'create') && (
        <div className="alert alert-info">
          <div>
            <h3 className="font-bold text-lg mb-3">💡 Dicas de Preenchimento</h3>
            <div className="text-sm space-y-2">
              <ul className="list-disc list-inside space-y-2">
                <li>Os campos marcados com <span className="text-error font-semibold">*</span> são obrigatórios</li>
                <li>Use um email válido para facilitar o contato</li>
                <li>O telefone deve incluir DDD e código do país se necessário</li>
                <li>O documento pode ser CPF (11 dígitos) ou CNPJ (14 dígitos)</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Progress Bar para completude do perfil */}
      {initialData && (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body p-8">
            <h3 className="card-title text-xl mb-6">Completude do Perfil</h3>
            <div className="flex items-center gap-6">
              <progress 
                className={`progress w-full h-4 ${
                  completionPercentage === 100 ? 'progress-success' :
                  completionPercentage >= 75 ? 'progress-info' :
                  completionPercentage >= 50 ? 'progress-warning' :
                  'progress-error'
                }`}
                value={completionPercentage} 
                max="100"
              ></progress>
              <span className="font-bold text-lg min-w-fit">{completionPercentage}%</span>
            </div>
            <div className="text-base mt-4">
              {isComplete ? (
                <span className="text-success font-medium">✅ Perfil completo!</span>
              ) : (
                <span className="text-warning font-medium">⚠️ Complete seu perfil para melhor experiência</span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}