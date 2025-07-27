import { redirect } from "next/navigation";
import { ensureUserProfile } from "@/lib/ensure-profile";
import { SidebarMenu } from "@/components/sidebar-menu";
import { ProfileManager } from "@/components/profile-manager";

export default async function ProfilePage() {
  try {
    const { user, profile } = await ensureUserProfile();

    return (
      <div className="flex min-h-screen">
        <SidebarMenu />
        <div className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
              👤 Gerenciar Perfil
            </h1>
            <ProfileManager 
              userId={user.id}
              initialData={profile}
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