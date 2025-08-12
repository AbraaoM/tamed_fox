import { LoginForm } from "@/components/login-form";

export default function Page() {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md sm:max-w-lg">
        <LoginForm />
      </div>
    </div>
  );
}
