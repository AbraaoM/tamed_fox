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
  Globe,
  Calendar,
  MessageCircle,
  Facebook,
  Instagram,
  Linkedin,
  ImageIcon,
  Building,
  Eye,
  Edit,
  X,
  CheckCircle,
  AlertCircle,
  FileText
} from "lucide-react";
import { toast } from "sonner";
import { 
  DisplayInfo, 
  DisplayInfoFormData, 
  UpdateDisplayInfoData,
  validateDisplayInfo,
  formatDisplayInfoData,
  createEmptyDisplayInfo,
  isDisplayInfoComplete,
  getDisplayInfoCompletionPercentage,
  DISPLAY_INFO_LABELS,
  DISPLAY_INFO_CATEGORIES,
  extractSocialLinks
} from "@/models/display-info";
import { Profile } from "@/models/profile";

interface DisplayInfoManagerProps {
  userId: string;
  profile: Profile;
  initialData?: DisplayInfo | null;
}

export function DisplayInfoManager({ userId, profile, initialData }: DisplayInfoManagerProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [mode, setMode] = useState<'view' | 'edit' | 'create'>(
    initialData ? 'view' : 'create'
  );

  const [formData, setFormData] = useState<DisplayInfoFormData>(
    initialData ? formatDisplayInfoData(initialData) : createEmptyDisplayInfo()
  );

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: keyof DisplayInfoFormData, value: string) => {
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
    const validation = validateDisplayInfo(formData);
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
          .from('display_info')
          .insert([{ ...formData, profile_id: userId }]);
        
        if (error) throw error;
        toast.success("Informações criadas com sucesso!");
        setMode('view');
      } else if (mode === 'edit') {
        const updateData: UpdateDisplayInfoData = { ...formData };
        
        const { error } = await supabase
          .from('display_info')
          .update(updateData)
          .eq('profile_id', userId);
        
        if (error) throw error;
        toast.success("Informações atualizadas com sucesso!");
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
    if (!confirm("Tem certeza que deseja excluir todas as informações? Esta ação não pode ser desfeita.")) {
      return;
    }

    setIsDeleting(true);
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('display_info')
        .delete()
        .eq('profile_id', userId);
      
      if (error) throw error;
      toast.success("Informações excluídas com sucesso!");
      setMode('create');
      setFormData(createEmptyDisplayInfo());
      router.refresh();
    } catch (error: any) {
      console.error("Erro ao excluir:", error);
      toast.error("Erro ao excluir as informações");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancel = () => {
    if (initialData) {
      setFormData(formatDisplayInfoData(initialData));
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
            <div className="text-6xl mb-6">📋</div>
            <h1 className="text-4xl font-bold mb-4">Nenhuma informação encontrada</h1>
            <p className="text-lg text-base-content/70 mb-8">
              Configure suas informações básicas para começar
            </p>
            <button 
              className="btn btn-primary btn-lg gap-3"
              onClick={() => setMode('create')}
            >
              <Plus className="h-5 w-5" />
              Criar Informações
            </button>
          </div>
        </div>
      </div>
    );
  }

  const completionPercentage = initialData ? getDisplayInfoCompletionPercentage(initialData) : 0;
  const isComplete = initialData ? isDisplayInfoComplete(initialData) : false;
  const socialLinks = initialData ? extractSocialLinks(initialData) : [];

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
                ID: {initialData.profile_id.slice(0, 8)}...
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

      {/* Informações Pessoais */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body p-8">
          <h2 className="card-title flex items-center gap-3 text-xl mb-6">
            <User className="h-6 w-6" />
            {DISPLAY_INFO_CATEGORIES.PERSONAL.label}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nome de Exibição */}
            <div className="form-control">
              <label className="label pb-2">
                <span className="label-text flex items-center gap-2 text-base font-medium">
                  <User className="h-4 w-4" />
                  {DISPLAY_INFO_LABELS.display_name}
                </span>
              </label>
              {mode === 'view' ? (
                <div className="p-4 bg-base-200 rounded-lg min-h-[52px] flex items-center text-base">
                  {formData.display_name || <span className="text-base-content/50">Não informado</span>}
                </div>
              ) : (
                <>
                  <input
                    type="text"
                    placeholder="Seu nome público"
                    className={`input input-bordered w-full h-[52px] text-base ${
                      validationErrors.display_name ? 'input-error' : ''
                    }`}
                    value={formData.display_name}
                    onChange={(e) => handleInputChange('display_name', e.target.value)}
                  />
                  {validationErrors.display_name && (
                    <label className="label pt-1">
                      <span className="label-text-alt text-error text-sm">
                        {validationErrors.display_name}
                      </span>
                    </label>
                  )}
                </>
              )}
            </div>

            {/* URL do Avatar */}
            <div className="form-control">
              <label className="label pb-2">
                <span className="label-text flex items-center gap-2 text-base font-medium">
                  <ImageIcon className="h-4 w-4" />
                  {DISPLAY_INFO_LABELS.avatar_url}
                </span>
              </label>
              {mode === 'view' ? (
                <div className="p-4 bg-base-200 rounded-lg min-h-[52px] flex items-center text-base">
                  {formData.avatar_url ? (
                    <a href={formData.avatar_url} target="_blank" rel="noopener noreferrer" className="link link-primary">
                      Ver avatar
                    </a>
                  ) : (
                    <span className="text-base-content/50">Não informado</span>
                  )}
                </div>
              ) : (
                <>
                  <input
                    type="url"
                    placeholder="https://exemplo.com/avatar.jpg"
                    className={`input input-bordered w-full h-[52px] text-base ${
                      validationErrors.avatar_url ? 'input-error' : ''
                    }`}
                    value={formData.avatar_url}
                    onChange={(e) => handleInputChange('avatar_url', e.target.value)}
                  />
                  {validationErrors.avatar_url && (
                    <label className="label pt-1">
                      <span className="label-text-alt text-error text-sm">
                        {validationErrors.avatar_url}
                      </span>
                    </label>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Biografia */}
          <div className="form-control mt-4">
            <label className="label pb-2">
              <span className="label-text flex items-center gap-2 text-base font-medium">
                <FileText className="h-4 w-4" />
                {DISPLAY_INFO_LABELS.bio}
              </span>
            </label>
            {mode === 'view' ? (
              <div className="p-4 bg-base-200 rounded-lg min-h-[100px] text-base">
                {formData.bio || <span className="text-base-content/50">Não informado</span>}
              </div>
            ) : (
              <textarea
                className="textarea textarea-bordered w-full h-24 text-base resize-none"
                placeholder="Conte um pouco sobre você..."
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
              />
            )}
          </div>
        </div>
      </div>

      {/* Informações de Contato */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body p-8">
          <h2 className="card-title flex items-center gap-3 text-xl mb-6">
            <Mail className="h-6 w-6" />
            {DISPLAY_INFO_CATEGORIES.CONTACT.label}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email de Contato */}
            <div className="form-control">
              <label className="label pb-2">
                <span className="label-text flex items-center gap-2 text-base font-medium">
                  <Mail className="h-4 w-4" />
                  {DISPLAY_INFO_LABELS.email_contact}
                </span>
              </label>
              {mode === 'view' ? (
                <div className="p-4 bg-base-200 rounded-lg min-h-[52px] flex items-center text-base">
                  {formData.email_contact || <span className="text-base-content/50">Não informado</span>}
                </div>
              ) : (
                <>
                  <input
                    type="email"
                    placeholder="contato@exemplo.com"
                    className={`input input-bordered w-full h-[52px] text-base ${
                      validationErrors.email_contact ? 'input-error' : ''
                    }`}
                    value={formData.email_contact}
                    onChange={(e) => handleInputChange('email_contact', e.target.value)}
                  />
                  {validationErrors.email_contact && (
                    <label className="label pt-1">
                      <span className="label-text-alt text-error text-sm">
                        {validationErrors.email_contact}
                      </span>
                    </label>
                  )}
                </>
              )}
            </div>

            {/* Telefone */}
            <div className="form-control">
              <label className="label pb-2">
                <span className="label-text flex items-center gap-2 text-base font-medium">
                  <Phone className="h-4 w-4" />
                  {DISPLAY_INFO_LABELS.phone_number}
                </span>
              </label>
              {mode === 'view' ? (
                <div className="p-4 bg-base-200 rounded-lg min-h-[52px] flex items-center text-base">
                  {formData.phone_number || <span className="text-base-content/50">Não informado</span>}
                </div>
              ) : (
                <>
                  <input
                    type="tel"
                    placeholder="(11) 99999-9999"
                    className={`input input-bordered w-full h-[52px] text-base ${
                      validationErrors.phone_number ? 'input-error' : ''
                    }`}
                    value={formData.phone_number}
                    onChange={(e) => handleInputChange('phone_number', e.target.value)}
                  />
                  {validationErrors.phone_number && (
                    <label className="label pt-1">
                      <span className="label-text-alt text-error text-sm">
                        {validationErrors.phone_number}
                      </span>
                    </label>
                  )}
                </>
              )}
            </div>
          </div>

          {/* WhatsApp */}
          <div className="form-control mt-4">
            <label className="label pb-2">
              <span className="label-text flex items-center gap-2 text-base font-medium">
                <MessageCircle className="h-4 w-4" />
                {DISPLAY_INFO_LABELS.whatsapp_link}
              </span>
            </label>
            {mode === 'view' ? (
              <div className="p-4 bg-base-200 rounded-lg min-h-[52px] flex items-center text-base">
                {formData.whatsapp_link ? (
                  <a href={formData.whatsapp_link} target="_blank" rel="noopener noreferrer" className="link link-primary">
                    {formData.whatsapp_link}
                  </a>
                ) : (
                  <span className="text-base-content/50">Não informado</span>
                )}
              </div>
            ) : (
              <>
                <input
                  type="url"
                  placeholder="https://wa.me/5511999999999"
                  className={`input input-bordered w-full h-[52px] text-base ${
                    validationErrors.whatsapp_link ? 'input-error' : ''
                  }`}
                  value={formData.whatsapp_link}
                  onChange={(e) => handleInputChange('whatsapp_link', e.target.value)}
                />
                {validationErrors.whatsapp_link && (
                  <label className="label pt-1">
                    <span className="label-text-alt text-error text-sm">
                      {validationErrors.whatsapp_link}
                    </span>
                  </label>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Redes Sociais */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body p-8">
          <h2 className="card-title flex items-center gap-3 text-xl mb-6">
            <Globe className="h-6 w-6" />
            {DISPLAY_INFO_CATEGORIES.SOCIAL.label}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Facebook */}
            <div className="form-control">
              <label className="label pb-2">
                <span className="label-text flex items-center gap-2 text-base font-medium">
                  <Facebook className="h-4 w-4" />
                  {DISPLAY_INFO_LABELS.facebook_link}
                </span>
              </label>
              {mode === 'view' ? (
                <div className="p-4 bg-base-200 rounded-lg min-h-[52px] flex items-center text-base">
                  {formData.facebook_link ? (
                    <a href={formData.facebook_link} target="_blank" rel="noopener noreferrer" className="link link-primary">
                      Ver perfil
                    </a>
                  ) : (
                    <span className="text-base-content/50">Não informado</span>
                  )}
                </div>
              ) : (
                <>
                  <input
                    type="url"
                    placeholder="https://facebook.com/seu-usuario"
                    className={`input input-bordered w-full h-[52px] text-base ${
                      validationErrors.facebook_link ? 'input-error' : ''
                    }`}
                    value={formData.facebook_link}
                    onChange={(e) => handleInputChange('facebook_link', e.target.value)}
                  />
                  {validationErrors.facebook_link && (
                    <label className="label pt-1">
                      <span className="label-text-alt text-error text-sm">
                        {validationErrors.facebook_link}
                      </span>
                    </label>
                  )}
                </>
              )}
            </div>

            {/* Instagram */}
            <div className="form-control">
              <label className="label pb-2">
                <span className="label-text flex items-center gap-2 text-base font-medium">
                  <Instagram className="h-4 w-4" />
                  {DISPLAY_INFO_LABELS.instagram_link}
                </span>
              </label>
              {mode === 'view' ? (
                <div className="p-4 bg-base-200 rounded-lg min-h-[52px] flex items-center text-base">
                  {formData.instagram_link ? (
                    <a href={formData.instagram_link} target="_blank" rel="noopener noreferrer" className="link link-primary">
                      Ver perfil
                    </a>
                  ) : (
                    <span className="text-base-content/50">Não informado</span>
                  )}
                </div>
              ) : (
                <>
                  <input
                    type="url"
                    placeholder="https://instagram.com/seu-usuario"
                    className={`input input-bordered w-full h-[52px] text-base ${
                      validationErrors.instagram_link ? 'input-error' : ''
                    }`}
                    value={formData.instagram_link}
                    onChange={(e) => handleInputChange('instagram_link', e.target.value)}
                  />
                  {validationErrors.instagram_link && (
                    <label className="label pt-1">
                      <span className="label-text-alt text-error text-sm">
                        {validationErrors.instagram_link}
                      </span>
                    </label>
                  )}
                </>
              )}
            </div>

            {/* LinkedIn */}
            <div className="form-control">
              <label className="label pb-2">
                <span className="label-text flex items-center gap-2 text-base font-medium">
                  <Linkedin className="h-4 w-4" />
                  {DISPLAY_INFO_LABELS.linkedin_link}
                </span>
              </label>
              {mode === 'view' ? (
                <div className="p-4 bg-base-200 rounded-lg min-h-[52px] flex items-center text-base">
                  {formData.linkedin_link ? (
                    <a href={formData.linkedin_link} target="_blank" rel="noopener noreferrer" className="link link-primary">
                      Ver perfil
                    </a>
                  ) : (
                    <span className="text-base-content/50">Não informado</span>
                  )}
                </div>
              ) : (
                <>
                  <input
                    type="url"
                    placeholder="https://linkedin.com/in/seu-usuario"
                    className={`input input-bordered w-full h-[52px] text-base ${
                      validationErrors.linkedin_link ? 'input-error' : ''
                    }`}
                    value={formData.linkedin_link}
                    onChange={(e) => handleInputChange('linkedin_link', e.target.value)}
                  />
                  {validationErrors.linkedin_link && (
                    <label className="label pt-1">
                      <span className="label-text-alt text-error text-sm">
                        {validationErrors.linkedin_link}
                      </span>
                    </label>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Links Úteis */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body p-8">
          <h2 className="card-title flex items-center gap-3 text-xl mb-6">
            <Building className="h-6 w-6" />
            {DISPLAY_INFO_CATEGORIES.LINKS.label}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Website */}
            <div className="form-control">
              <label className="label pb-2">
                <span className="label-text flex items-center gap-2 text-base font-medium">
                  <Globe className="h-4 w-4" />
                  {DISPLAY_INFO_LABELS.website_url}
                </span>
              </label>
              {mode === 'view' ? (
                <div className="p-4 bg-base-200 rounded-lg min-h-[52px] flex items-center text-base">
                  {formData.website_url ? (
                    <a href={formData.website_url} target="_blank" rel="noopener noreferrer" className="link link-primary">
                      {formData.website_url}
                    </a>
                  ) : (
                    <span className="text-base-content/50">Não informado</span>
                  )}
                </div>
              ) : (
                <>
                  <input
                    type="url"
                    placeholder="https://seusite.com"
                    className={`input input-bordered w-full h-[52px] text-base ${
                      validationErrors.website_url ? 'input-error' : ''
                    }`}
                    value={formData.website_url}
                    onChange={(e) => handleInputChange('website_url', e.target.value)}
                  />
                  {validationErrors.website_url && (
                    <label className="label pt-1">
                      <span className="label-text-alt text-error text-sm">
                        {validationErrors.website_url}
                      </span>
                    </label>
                  )}
                </>
              )}
            </div>

            {/* Agenda */}
            <div className="form-control">
              <label className="label pb-2">
                <span className="label-text flex items-center gap-2 text-base font-medium">
                  <Calendar className="h-4 w-4" />
                  {DISPLAY_INFO_LABELS.agenda_link}
                </span>
              </label>
              {mode === 'view' ? (
                <div className="p-4 bg-base-200 rounded-lg min-h-[52px] flex items-center text-base">
                  {formData.agenda_link ? (
                    <a href={formData.agenda_link} target="_blank" rel="noopener noreferrer" className="link link-primary">
                      Agendar reunião
                    </a>
                  ) : (
                    <span className="text-base-content/50">Não informado</span>
                  )}
                </div>
              ) : (
                <>
                  <input
                    type="url"
                    placeholder="https://calendly.com/seu-usuario"
                    className={`input input-bordered w-full h-[52px] text-base ${
                      validationErrors.agenda_link ? 'input-error' : ''
                    }`}
                    value={formData.agenda_link}
                    onChange={(e) => handleInputChange('agenda_link', e.target.value)}
                  />
                  {validationErrors.agenda_link && (
                    <label className="label pt-1">
                      <span className="label-text-alt text-error text-sm">
                        {validationErrors.agenda_link}
                      </span>
                    </label>
                  )}
                </>
              )}
            </div>
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
                  <span className="label-text text-base font-medium">ID do Perfil:</span>
                </label>
                <div className="p-4 bg-base-200 rounded-lg font-mono text-sm break-all">
                  {initialData.profile_id}
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

      {/* Progress Bar para completude */}
      {initialData && (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body p-8">
            <h3 className="card-title text-xl mb-6">Completude das Informações</h3>
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
                <span className="text-success font-medium">✅ Informações completas!</span>
              ) : (
                <span className="text-warning font-medium">⚠️ Complete suas informações para melhor experiência</span>
              )}
            </div>
            
            {/* Links sociais válidos */}
            {socialLinks.length > 0 && (
              <div className="mt-6">
                <h4 className="font-semibold mb-3">Links Sociais Configurados:</h4>
                <div className="flex flex-wrap gap-2">
                  {socialLinks.map((link) => (
                    <div key={link.platform} className={`badge badge-lg gap-2 ${
                      link.isValid ? 'badge-success' : 'badge-error'
                    }`}>
                      {link.platform === 'facebook' && <Facebook className="h-3 w-3" />}
                      {link.platform === 'instagram' && <Instagram className="h-3 w-3" />}
                      {link.platform === 'linkedin' && <Linkedin className="h-3 w-3" />}
                      {link.platform === 'whatsapp' && <MessageCircle className="h-3 w-3" />}
                      {link.platform}
                      {link.isValid ? '✓' : '✗'}
                    </div>
                  ))}
                </div>
              </div>
            )}
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
                <li>Use URLs completas para links (começando com https://)</li>
                <li>Para WhatsApp, use o formato: https://wa.me/5511999999999</li>
                <li>URLs de redes sociais devem ser os links oficiais dos perfis</li>
                <li>O avatar deve ser uma imagem pública e acessível</li>
                <li>Complete o máximo de informações para melhor apresentação</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}