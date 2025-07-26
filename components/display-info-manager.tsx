"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  ImageIcon
} from "lucide-react";
import { toast } from "sonner";

interface DisplayInfo {
  profile_id: string;
  display_name?: string;
  avatar_url?: string;
  phone_number?: string;
  email_contact?: string;
  agenda_link?: string;
  whatsapp_link?: string;
  facebook_link?: string;
  instagram_link?: string;
  linkedin_link?: string;
  website_url?: string;
  bio?: string;
  created_at?: string;
  updated_at?: string;
}

interface DisplayInfoManagerProps {
  userId: string;
  initialData?: DisplayInfo | null;
}

export function DisplayInfoManager({ userId, initialData }: DisplayInfoManagerProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [mode, setMode] = useState<'view' | 'edit' | 'create'>(
    initialData ? 'view' : 'create'
  );

  const [formData, setFormData] = useState<Omit<DisplayInfo, 'profile_id'>>({
    display_name: initialData?.display_name || "",
    avatar_url: initialData?.avatar_url || "",
    phone_number: initialData?.phone_number || "",
    email_contact: initialData?.email_contact || "",
    agenda_link: initialData?.agenda_link || "",
    whatsapp_link: initialData?.whatsapp_link || "",
    facebook_link: initialData?.facebook_link || "",
    instagram_link: initialData?.instagram_link || "",
    linkedin_link: initialData?.linkedin_link || "",
    website_url: initialData?.website_url || "",
    bio: initialData?.bio || "",
  });

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
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
        const { error } = await supabase
          .from('display_info')
          .update(formData)
          .eq('profile_id', userId);
        
        if (error) throw error;
        toast.success("Informações atualizadas com sucesso!");
        setMode('view');
      }
      
      router.refresh();
    } catch (error) {
      console.error("Erro ao salvar:", error);
      toast.error("Erro ao salvar as informações");
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
      setFormData({
        display_name: "",
        avatar_url: "",
        phone_number: "",
        email_contact: "",
        agenda_link: "",
        whatsapp_link: "",
        facebook_link: "",
        instagram_link: "",
        linkedin_link: "",
        website_url: "",
        bio: "",
      });
      router.refresh();
    } catch (error) {
      console.error("Erro ao excluir:", error);
      toast.error("Erro ao excluir as informações");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancel = () => {
    if (initialData) {
      setFormData({
        display_name: initialData.display_name || "",
        avatar_url: initialData.avatar_url || "",
        phone_number: initialData.phone_number || "",
        email_contact: initialData.email_contact || "",
        agenda_link: initialData.agenda_link || "",
        whatsapp_link: initialData.whatsapp_link || "",
        facebook_link: initialData.facebook_link || "",
        instagram_link: initialData.instagram_link || "",
        linkedin_link: initialData.linkedin_link || "",
        website_url: initialData.website_url || "",
        bio: initialData.bio || "",
      });
      setMode('view');
    } else {
      setMode('create');
    }
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
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🦊</div>
        <h2 className="text-xl font-semibold mb-2">Nenhuma informação encontrada</h2>
        <p className="text-muted-foreground mb-6">
          Configure suas informações básicas para começar
        </p>
        <Button onClick={() => setMode('create')}>
          <Plus className="h-4 w-4 mr-2" />
          Criar Informações
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header com ações */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Badge variant={mode === 'view' ? 'default' : mode === 'edit' ? 'secondary' : 'outline'}>
            {mode === 'view' ? 'Visualização' : mode === 'edit' ? 'Editando' : 'Criando'}
          </Badge>
          {initialData && (
            <Badge variant="outline">
              ID: {initialData.profile_id?.slice(0, 8)}...
            </Badge>
          )}
        </div>
        
        <div className="flex gap-2">
          {mode === 'view' && initialData && (
            <>
              <Button variant="outline" onClick={() => setMode('edit')}>
                Editar
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4 mr-2" />
                )}
                {isDeleting ? "Excluindo..." : "Excluir"}
              </Button>
            </>
          )}
          
          {(mode === 'edit' || mode === 'create') && (
            <>
              <Button variant="outline" onClick={handleCancel}>
                Cancelar
              </Button>
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                {isLoading ? "Salvando..." : "Salvar"}
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Formulário */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Informações Pessoais
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Nome e Avatar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="display_name" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Nome de Exibição
              </Label>
              {mode === 'view' ? (
                <div className="p-2 bg-muted rounded-md">
                  {formData.display_name || "Não informado"}
                </div>
              ) : (
                <Input
                  id="display_name"
                  value={formData.display_name}
                  onChange={(e) => handleInputChange('display_name', e.target.value)}
                  placeholder="Seu nome público"
                />
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="avatar_url" className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                URL do Avatar
              </Label>
              {mode === 'view' ? (
                <div className="p-2 bg-muted rounded-md">
                  {formData.avatar_url || "Não informado"}
                </div>
              ) : (
                <Input
                  id="avatar_url"
                  type="url"
                  value={formData.avatar_url}
                  onChange={(e) => handleInputChange('avatar_url', e.target.value)}
                  placeholder="https://exemplo.com/avatar.jpg"
                />
              )}
            </div>
          </div>

          {/* Biografia */}
          <div className="space-y-2">
            <Label htmlFor="bio">Biografia</Label>
            {mode === 'view' ? (
              <div className="p-2 bg-muted rounded-md min-h-[80px]">
                {formData.bio || "Não informado"}
              </div>
            ) : (
              <textarea
                id="bio"
                className="textarea textarea-bordered w-full"
                rows={4}
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                placeholder="Conte um pouco sobre você..."
              />
            )}
          </div>
        </CardContent>
      </Card>

      {/* Informações de Contato */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Informações de Contato
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email_contact" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email de Contato
              </Label>
              {mode === 'view' ? (
                <div className="p-2 bg-muted rounded-md">
                  {formData.email_contact || "Não informado"}
                </div>
              ) : (
                <Input
                  id="email_contact"
                  type="email"
                  value={formData.email_contact}
                  onChange={(e) => handleInputChange('email_contact', e.target.value)}
                  placeholder="contato@exemplo.com"
                />
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone_number" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Telefone
              </Label>
              {mode === 'view' ? (
                <div className="p-2 bg-muted rounded-md">
                  {formData.phone_number || "Não informado"}
                </div>
              ) : (
                <Input
                  id="phone_number"
                  value={formData.phone_number}
                  onChange={(e) => handleInputChange('phone_number', e.target.value)}
                  placeholder="(11) 99999-9999"
                />
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="whatsapp_link" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Link do WhatsApp
            </Label>
            {mode === 'view' ? (
              <div className="p-2 bg-muted rounded-md">
                {formData.whatsapp_link || "Não informado"}
              </div>
            ) : (
              <Input
                id="whatsapp_link"
                type="url"
                value={formData.whatsapp_link}
                onChange={(e) => handleInputChange('whatsapp_link', e.target.value)}
                placeholder="https://wa.me/5511999999999"
              />
            )}
          </div>
        </CardContent>
      </Card>

      {/* Links e Redes Sociais */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Links e Redes Sociais
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="website_url" className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Website
              </Label>
              {mode === 'view' ? (
                <div className="p-2 bg-muted rounded-md">
                  {formData.website_url || "Não informado"}
                </div>
              ) : (
                <Input
                  id="website_url"
                  type="url"
                  value={formData.website_url}
                  onChange={(e) => handleInputChange('website_url', e.target.value)}
                  placeholder="https://seusite.com"
                />
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="agenda_link" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Link da Agenda
              </Label>
              {mode === 'view' ? (
                <div className="p-2 bg-muted rounded-md">
                  {formData.agenda_link || "Não informado"}
                </div>
              ) : (
                <Input
                  id="agenda_link"
                  type="url"
                  value={formData.agenda_link}
                  onChange={(e) => handleInputChange('agenda_link', e.target.value)}
                  placeholder="https://calendly.com/seu-usuario"
                />
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="linkedin_link" className="flex items-center gap-2">
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </Label>
              {mode === 'view' ? (
                <div className="p-2 bg-muted rounded-md">
                  {formData.linkedin_link || "Não informado"}
                </div>
              ) : (
                <Input
                  id="linkedin_link"
                  type="url"
                  value={formData.linkedin_link}
                  onChange={(e) => handleInputChange('linkedin_link', e.target.value)}
                  placeholder="https://linkedin.com/in/seu-usuario"
                />
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="instagram_link" className="flex items-center gap-2">
                <Instagram className="h-4 w-4" />
                Instagram
              </Label>
              {mode === 'view' ? (
                <div className="p-2 bg-muted rounded-md">
                  {formData.instagram_link || "Não informado"}
                </div>
              ) : (
                <Input
                  id="instagram_link"
                  type="url"
                  value={formData.instagram_link}
                  onChange={(e) => handleInputChange('instagram_link', e.target.value)}
                  placeholder="https://instagram.com/seu-usuario"
                />
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="facebook_link" className="flex items-center gap-2">
                <Facebook className="h-4 w-4" />
                Facebook
              </Label>
              {mode === 'view' ? (
                <div className="p-2 bg-muted rounded-md">
                  {formData.facebook_link || "Não informado"}
                </div>
              ) : (
                <Input
                  id="facebook_link"
                  type="url"
                  value={formData.facebook_link}
                  onChange={(e) => handleInputChange('facebook_link', e.target.value)}
                  placeholder="https://facebook.com/seu-usuario"
                />
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Informações do Sistema */}
      {initialData && (
        <Card>
          <CardHeader>
            <CardTitle>Informações do Sistema</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <Label>Criado em:</Label>
                <div className="p-2 bg-muted rounded-md">
                  {formatDate(initialData.created_at)}
                </div>
              </div>
              <div>
                <Label>Última atualização:</Label>
                <div className="p-2 bg-muted rounded-md">
                  {formatDate(initialData.updated_at)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}