import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <div
      className="relative z-0 bg-primary bg-hero-pattern bg-cover bg-no-repeat bg-center"
      style={{
        height: "100vh",
      }}
    >
      <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10 dark:bg-zinc-800">
        <div className="w-full max-w-sm md:max-w-3xl">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
