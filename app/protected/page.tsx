import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SidebarMenu } from "@/components/sidebar-menu";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  return (
    <div className="flex min-h-screen">
      <SidebarMenu />
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Cards de exemplo */}
            <div className="p-6 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">Projetos Ativos</h3>
              <p className="text-2xl font-bold text-primary">12</p>
            </div>
            <div className="p-6 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">Tarefas Pendentes</h3>
              <p className="text-2xl font-bold text-orange-500">8</p>
            </div>
            <div className="p-6 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">Tarefas Concluídas</h3>
              <p className="text-2xl font-bold text-green-500">24</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
