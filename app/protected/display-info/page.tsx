import { redirect } from "next/navigation";
import { ensureUserProfile } from "@/lib/ensure-profile";
import { createClient } from "@/lib/supabase/server";
import { SidebarMenu } from "@/components/sidebar-menu";
import { DisplayInfo } from "@/models/display-info";
import { HeaderConfigurator } from "@/components/header-configurator";

export default async function DisplayInfoPage() {
  try {
    const { user, profile } = await ensureUserProfile();
    const supabase = await createClient();

    // Buscar dados existentes do display_info usando o profile.id
    const { data: displayInfo }: { data: DisplayInfo | null} = await supabase
      .from('display_info')
      .select('*')
      .eq('profile_id', profile.id)
      .single();

    return (
      <div className="flex min-h-screen">
        <SidebarMenu />
        <div className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
              📋 Informações Básicas
 
            </h1>
            <HeaderConfigurator
              profile_id={profile.id}
              display_name={displayInfo?.display_name || ""}
              logo_url={displayInfo?.logo_url || ""}
            />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Erro:", error);
    redirect("/auth/login");
  }
}
