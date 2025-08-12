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
  
  const [formData, setFormData] = useState<HeroFormData>({
    headline: headline || '',
    subheadline: subheadline || '',
    call_to_action: call_to_action || '',
    call_to_action_url: call_to_action_url || '',
    hero_image_url: hero_image_url || ''
  });
  
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const handleChange = (field: keyof HeroFormData, value: string) => {
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
      <div className="card-body p-4 sm:p-6 lg:p-8">
        {/* Header responsivo */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 lg:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold">🍃 Configurações do Hero</h2>
          <div className="badge badge-success gap-2 text-xs sm:text-sm px-2 sm:px-3 py-2">
            🌳 Afeta Bushes
          </div>
        </div>
        
        {/* Grid responsivo para os campos */}
        <div className="space-y-4 sm:space-y-6">
          {/* Headline */}
          <div className="form-control w-full">
            <label className="label pb-2">
              <span className="label-text text-sm sm:text-base font-medium">Título Principal</span>
            </label>
            <input
              type="text"
              placeholder="Título impactante para a seção hero"
              className={`input input-bordered w-full h-11 sm:h-12 text-sm sm:text-base ${
                validationErrors.headline ? 'input-error' : ''
              }`}
              value={formData.headline}
              onChange={(e) => handleChange('headline', e.target.value)}
            />
            {validationErrors.headline && (
              <label className="label pt-1">
                <span className="label-text-alt text-error text-xs sm:text-sm">
                  {validationErrors.headline}
                </span>
              </label>
            )}
          </div>

          {/* Subheadline */}
          <div className="form-control w-full">
            <label className="label pb-2">
              <span className="label-text text-sm sm:text-base font-medium">Subtítulo</span>
            </label>
            <input
              type="text"
              placeholder="Subtítulo complementar"
              className={`input input-bordered w-full h-11 sm:h-12 text-sm sm:text-base ${
                validationErrors.subheadline ? 'input-error' : ''
              }`}
              value={formData.subheadline}
              onChange={(e) => handleChange('subheadline', e.target.value)}
            />
            {validationErrors.subheadline && (
              <label className="label pt-1">
                <span className="label-text-alt text-error text-xs sm:text-sm">
                  {validationErrors.subheadline}
                </span>
              </label>
            )}
          </div>

          {/* Grid para CTA */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Call to Action */}
            <div className="form-control w-full">
              <label className="label pb-2">
                <span className="label-text text-sm sm:text-base font-medium">Call to Action</span>
              </label>
              <input
                type="text"
                placeholder="Texto do botão principal"
                className={`input input-bordered w-full h-11 sm:h-12 text-sm sm:text-base ${
                  validationErrors.call_to_action ? 'input-error' : ''
                }`}
                value={formData.call_to_action}
                onChange={(e) => handleChange('call_to_action', e.target.value)}
              />
              {validationErrors.call_to_action && (
                <label className="label pt-1">
                  <span className="label-text-alt text-error text-xs sm:text-sm">
                    {validationErrors.call_to_action}
                  </span>
                </label>
              )}
            </div>

            {/* Call to Action URL */}
            <div className="form-control w-full">
              <label className="label pb-2">
                <span className="label-text text-sm sm:text-base font-medium">URL do CTA</span>
              </label>
              <input
                type="url"
                placeholder="https://exemplo.com"
                className={`input input-bordered w-full h-11 sm:h-12 text-sm sm:text-base ${
                  validationErrors.call_to_action_url ? 'input-error' : ''
                }`}
                value={formData.call_to_action_url}
                onChange={(e) => handleChange('call_to_action_url', e.target.value)}
              />
              {validationErrors.call_to_action_url && (
                <label className="label pt-1">
                  <span className="label-text-alt text-error text-xs sm:text-sm">
                    {validationErrors.call_to_action_url}
                  </span>
                </label>
              )}
            </div>
          </div>

          {/* Hero Image URL */}
          <div className="form-control w-full">
            <label className="label pb-2">
              <span className="label-text text-sm sm:text-base font-medium">Imagem de Fundo</span>
            </label>
            <input
              type="url"
              placeholder="https://exemplo.com/hero-image.jpg"
              className={`input input-bordered w-full h-11 sm:h-12 text-sm sm:text-base ${
                validationErrors.hero_image_url ? 'input-error' : ''
              }`}
              value={formData.hero_image_url}
              onChange={(e) => handleChange('hero_image_url', e.target.value)}
            />
            {validationErrors.hero_image_url && (
              <label className="label pt-1">
                <span className="label-text-alt text-error text-xs sm:text-sm">
                  {validationErrors.hero_image_url}
                </span>
              </label>
            )}
          </div>
        </div>

        {/* Preview responsivo */}
        <div className="mt-6 lg:mt-8">
          <h3 className="font-medium mb-3 sm:mb-4 text-sm sm:text-base">🔍 Preview do Hero</h3>
          <div className="border rounded-lg p-3 sm:p-4 bg-base-200">
            <div 
              className="relative p-6 sm:p-8 lg:p-12 rounded-lg text-center text-white min-h-[200px] sm:min-h-[250px] lg:min-h-[300px] flex flex-col justify-center"
              style={{ 
                backgroundColor: '#6366f1',
                backgroundImage: formData.hero_image_url ? `url(${formData.hero_image_url})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="relative z-10 space-y-3 sm:space-y-4">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                  {formData.headline || 'Título Principal'}
                </h1>
                {formData.subheadline && (
                  <h2 className="text-lg sm:text-xl lg:text-2xl opacity-90">
                    {formData.subheadline}
                  </h2>
                )}
                {formData.call_to_action && (
                  <button className="btn btn-primary btn-sm sm:btn-md lg:btn-lg mt-4">
                    {formData.call_to_action}
                  </button>
                )}
              </div>
              {formData.hero_image_url && (
                <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg"></div>
              )}
            </div>
          </div>
        </div>

        {/* Botão responsivo */}
        <div className="card-actions justify-end mt-6 lg:mt-8">
          <button 
            className="btn btn-primary w-full sm:w-auto sm:btn-lg px-6 sm:px-8"
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : null}
            <span className="text-sm sm:text-base">
              {isLoading ? "Salvando..." : "Salvar"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}