import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SidebarMenu } from "@/components/sidebar-menu";
import { DisplayInfoManager } from "@/components/display-info-manager";

export default async function DisplayInfoPage() {
  const supabase = await createClient();

  const { data: user, error } = await supabase.auth.getUser();
  if (error || !user?.user) {
    redirect("/auth/login");
  }

  // Buscar dados existentes do display_info
  const { data: displayInfo } = await supabase
    .from('display_info')
    .select('*')
    .eq('profile_id', user.user.id)
    .single();

  return (
    <div className="flex min-h-screen">
      <SidebarMenu />
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Informações Básicas</h1>
          <DisplayInfoManager 
            userId={user.user.id}
            initialData={displayInfo}
          />
        </div>
      </div>
    </div>
  );
}
