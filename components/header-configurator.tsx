"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useBerrySync } from "@/hooks/use-berry-sync";
import { toast } from "sonner";
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
  
  // Estados para os campos editáveis
  const [formData, setFormData] = useState({
    display_name: display_name || '',
    logo_url: logo_url || ''
  });
  
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Handler para mudanças nos campos
  const handleChange = (field: string, value: string) => {
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
      
      // Invalidar cache da Vercel
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
      <div className="card-body p-8">
        <h2 className="text-2xl font-bold mb-8">Configurações do Header</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Display Name */}
          <div className="form-control w-full">
            <label className="label pb-2">
              <span className="label-text text-base font-medium">Nome de Exibição</span>
            </label>
            <input
              type="text"
              placeholder="Nome ou marca para exibir no header"
              className={`input input-bordered w-full h-12 text-base ${
                validationErrors.display_name ? 'input-error' : ''
              }`}
              value={formData.display_name}
              onChange={(e) => handleChange('display_name', e.target.value)}
            />
            {validationErrors.display_name && (
              <label className="label pt-1">
                <span className="label-text-alt text-error text-sm">
                  {validationErrors.display_name}
                </span>
              </label>
            )}
          </div>

          {/* Logo URL */}
          <div className="form-control w-full">
            <label className="label pb-2">
              <span className="label-text text-base font-medium">URL do Logo</span>
            </label>
            <input
              type="url"
              placeholder="https://exemplo.com/logo.png"
              className={`input input-bordered w-full h-12 text-base ${
                validationErrors.logo_url ? 'input-error' : ''
              }`}
              value={formData.logo_url}
              onChange={(e) => handleChange('logo_url', e.target.value)}
            />
            {validationErrors.logo_url && (
              <label className="label pt-1">
                <span className="label-text-alt text-error text-sm">
                  {validationErrors.logo_url}
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