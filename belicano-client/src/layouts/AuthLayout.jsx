import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <section className="min-h-screen bg-zinc-100 text-zinc-900">
      <div className="grid min-h-screen w-full lg:grid-cols-[1fr_0.95fr]">
        <div
          className="relative flex items-center justify-center overflow-hidden border-b-2 border-yellow-600/20 p-8 sm:p-10 lg:border-b-0 lg:border-r-2 lg:border-yellow-600/20 lg:p-16"
          style={{ backgroundColor: "#0a1628" }}
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 90% 50% at 50% 0%, #1a3050 0%, transparent 70%)",
            }}
          />
          <img
            src="/src/assets/images/Logo.svg"
            alt="Logo"
            className="relative z-10 w-full object-contain"
            style={{ maxWidth: "24rem" }}
          />
        </div>
        <main className="flex items-center bg-white px-6 py-10 sm:px-10 lg:px-16">
          <div className="mx-auto w-full max-w-md">
            <Outlet />
          </div>
        </main>
      </div>
    </section>
  );
};

export default AuthLayout;
