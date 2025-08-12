"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useBerrySync } from "@/hooks/use-berry-sync";
import { toast } from "sonner";
import Image from "next/image";
import { 
  validateHeaderData,
} from "@/models/display-info";

interface HeaderConfiguratorProps {
  profile_id: string;
  display_name: string;
  logo_url: string;
}

export function HeaderConfigurator({ profile_id, display_name, logo_url }: HeaderConfiguratorProps) {
  const router = useRouter();
  const { syncLeafToBushes } = useBerrySync();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    display_name: display_name || '',
    logo_url: logo_url || ''
  });
  
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string) => {
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
    const validation = validateHeaderData(formData);
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
      
      toast.success("Header atualizado com sucesso!");
      
      if (data) {
        await syncLeafToBushes({
          id: data.id || profile_id,
          type: 'header',
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
          <h2 className="text-xl sm:text-2xl font-bold">🍃 Configurações do Header</h2>
          <div className="badge badge-success gap-2 text-xs sm:text-sm px-2 sm:px-3 py-2">
            🌳 Afeta Bushes
          </div>
        </div>
        
        {/* Grid responsivo para os campos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {/* Display Name */}
          <div className="form-control w-full">
            <label className="label pb-2">
              <span className="label-text text-sm sm:text-base font-medium">Nome de Exibição</span>
            </label>
            <input
              type="text"
              placeholder="Nome ou marca para exibir no header"
              className={`input input-bordered w-full h-11 sm:h-12 text-sm sm:text-base ${
                validationErrors.display_name ? 'input-error' : ''
              }`}
              value={formData.display_name}
              onChange={(e) => handleChange('display_name', e.target.value)}
            />
            {validationErrors.display_name && (
              <label className="label pt-1">
                <span className="label-text-alt text-error text-xs sm:text-sm">
                  {validationErrors.display_name}
                </span>
              </label>
            )}
          </div>

          {/* Logo URL */}
          <div className="form-control w-full">
            <label className="label pb-2">
              <span className="label-text text-sm sm:text-base font-medium">URL do Logo</span>
            </label>
            <input
              type="url"
              placeholder="https://exemplo.com/logo.png"
              className={`input input-bordered w-full h-11 sm:h-12 text-sm sm:text-base ${
                validationErrors.logo_url ? 'input-error' : ''
              }`}
              value={formData.logo_url}
              onChange={(e) => handleChange('logo_url', e.target.value)}
            />
            {validationErrors.logo_url && (
              <label className="label pt-1">
                <span className="label-text-alt text-error text-xs sm:text-sm">
                  {validationErrors.logo_url}
                </span>
              </label>
            )}
          </div>
        </div>

        {/* Preview responsivo */}
        <div className="mt-6 lg:mt-8">
          <h3 className="font-medium mb-3 sm:mb-4 text-sm sm:text-base">🔍 Preview do Header</h3>
          <div className="border rounded-lg p-3 sm:p-4 bg-base-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-white rounded-lg shadow-sm gap-3 sm:gap-0">
              <div className="flex items-center gap-2 sm:gap-3">
                {formData.logo_url && (
                  <Image 
                    src={formData.logo_url} 
                    alt="Logo" 
                    className="h-6 w-6 sm:h-8 sm:w-8 object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                )}
                <span className="font-bold text-sm sm:text-lg text-gray-800 truncate">
                  {formData.display_name || 'Nome da Empresa'}
                </span>
              </div>
              <nav className="hidden md:flex gap-4 lg:gap-6 text-gray-600 text-sm">
                <span>Home</span>
                <span>Sobre</span>
                <span>Serviços</span>
                <span>Contato</span>
              </nav>
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