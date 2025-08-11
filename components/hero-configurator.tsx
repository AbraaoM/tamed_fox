"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useBerrySync } from "@/hooks/use-berry-sync";
import { toast } from "sonner";
import { 
  validateHeroData,
  type HeroFormData
} from "@/models/display-info";

interface HeroConfiguratorProps {
  profile_id: string;
  headline: string;
  subheadline: string;
  call_to_action: string;
  call_to_action_url: string;
  hero_image_url: string;
}

export function HeroConfigurator({ 
  profile_id, 
  headline, 
  subheadline, 
  call_to_action,
  call_to_action_url,
  hero_image_url
}: HeroConfiguratorProps) {
  const router = useRouter();
  const { syncLeafToBushes } = useBerrySync();
  const [isLoading, setIsLoading] = useState(false);
  
  // Estados para os campos editáveis
  const [formData, setFormData] = useState<HeroFormData>({
    headline: headline || '',
    subheadline: subheadline || '',
    call_to_action: call_to_action || '',
    call_to_action_url: call_to_action_url || '',
    hero_image_url: hero_image_url || ''
  });
  
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Handler para mudanças nos campos
  const handleChange = (field: keyof HeroFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Limpar erro de validação quando o usuário começar a digitar
    if (validationErrors[field]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSave = async () => {
    const validation = validateHeroData(formData);
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      toast.error("Por favor, corrija os erros no formulário");
      return;
    }

    setIsLoading(true);
    try {
      const supabase = createClient();
  
      const { data, error } = await supabase
        .from('display_info')
        .update(formData)
        .eq('profile_id', profile_id)
        .select()
        .single();
      
      if (error) throw error;
      
      toast.success("Hero atualizado com sucesso!");
      
      // Invalidar cache da Vercel
      if (data) {
        await syncLeafToBushes({
          id: data.profile_id || profile_id,
          type: 'hero',
          data: data,
          updated_at: data.updated_at || new Date().toISOString()
        });
      }
      
      router.refresh();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Erro capturado:", error.message);
        toast.error(`Erro ao salvar: ${error.message}`);
      } else if (typeof error === 'string') {
        console.error("Erro capturado (string):", error);
        toast.error(`Erro ao salvar: ${error}`);
      } else {
        console.error("Erro desconhecido:", error);
        toast.error("Erro desconhecido ao salvar");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body p-8">
        <h2 className="text-2xl font-bold mb-8">Configurações do Hero</h2>
        
        <div className="space-y-6">
          {/* Headline */}
          <div className="form-control w-full">
            <label className="label pb-2">
              <span className="label-text text-base font-medium">Título Principal</span>
            </label>
            <input
              type="text"
              placeholder="Título impactante para a seção hero"
              className={`input input-bordered w-full h-12 text-base ${
                validationErrors.headline ? 'input-error' : ''
              }`}
              value={formData.headline}
              onChange={(e) => handleChange('headline', e.target.value)}
            />
            {validationErrors.headline && (
              <label className="label pt-1">
                <span className="label-text-alt text-error text-sm">
                  {validationErrors.headline}
                </span>
              </label>
            )}
          </div>

          {/* Subheadline */}
          <div className="form-control w-full">
            <label className="label pb-2">
              <span className="label-text text-base font-medium">Subtítulo</span>
            </label>
            <input
              type="text"
              placeholder="Subtítulo complementar"
              className={`input input-bordered w-full h-12 text-base ${
                validationErrors.subheadline ? 'input-error' : ''
              }`}
              value={formData.subheadline}
              onChange={(e) => handleChange('subheadline', e.target.value)}
            />
            {validationErrors.subheadline && (
              <label className="label pt-1">
                <span className="label-text-alt text-error text-sm">
                  {validationErrors.subheadline}
                </span>
              </label>
            )}
          </div>

          {/* Call to Action */}
          <div className="form-control w-full">
            <label className="label pb-2">
              <span className="label-text text-base font-medium">Call to Action</span>
            </label>
            <input
              type="text"
              placeholder="Texto do botão principal"
              className={`input input-bordered w-full h-12 text-base ${
                validationErrors.call_to_action ? 'input-error' : ''
              }`}
              value={formData.call_to_action}
              onChange={(e) => handleChange('call_to_action', e.target.value)}
            />
            {validationErrors.call_to_action && (
              <label className="label pt-1">
                <span className="label-text-alt text-error text-sm">
                  {validationErrors.call_to_action}
                </span>
              </label>
            )}
          </div>

          {/* Call to Action URL */}
          <div className="form-control w-full">
            <label className="label pb-2">
              <span className="label-text text-base font-medium">URL do Call to Action</span>
            </label>
            <input
              type="url"
              placeholder="https://exemplo.com"
              className={`input input-bordered w-full h-12 text-base ${
                validationErrors.call_to_action_url ? 'input-error' : ''
              }`}
              value={formData.call_to_action_url}
              onChange={(e) => handleChange('call_to_action_url', e.target.value)}
            />
            {validationErrors.call_to_action_url && (
              <label className="label pt-1">
                <span className="label-text-alt text-error text-sm">
                  {validationErrors.call_to_action_url}
                </span>
              </label>
            )}
          </div>

          {/* Hero Image URL */}
          <div className="form-control w-full">
            <label className="label pb-2">
              <span className="label-text text-base font-medium">Imagem de Fundo</span>
            </label>
            <input
              type="url"
              placeholder="https://exemplo.com/hero-image.jpg"
              className={`input input-bordered w-full h-12 text-base ${
                validationErrors.hero_image_url ? 'input-error' : ''
              }`}
              value={formData.hero_image_url}
              onChange={(e) => handleChange('hero_image_url', e.target.value)}
            />
            {validationErrors.hero_image_url && (
              <label className="label pt-1">
                <span className="label-text-alt text-error text-sm">
                  {validationErrors.hero_image_url}
                </span>
              </label>
            )}
          </div>
        </div>

        <div className="card-actions justify-end mt-8">
          <button 
            className="btn btn-primary btn-lg px-8"
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : null}
            {isLoading ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </div>
    </div>
  );
}