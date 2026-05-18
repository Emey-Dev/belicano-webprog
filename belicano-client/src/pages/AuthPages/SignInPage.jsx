import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/UserService";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await loginUser({ email, password });
      console.log("Login successful:", data);

      localStorage.setItem("token", data.token);
      localStorage.setItem("firstName", data.firstName);
      localStorage.setItem("type", data.type);
      localStorage.setItem("userRole", data.type); 

      navigate("/dashboard", {
        state: { firstName: data.firstName, type: data.type },
      });
    } catch (err) {
      console.error("Login failed:", err.response?.data?.message || err.message);
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div
      className="w-full rounded-2xl p-8 shadow-xl"
      style={{ border: "1px solid #f0f0f0" }}
    >
      <div className="flex items-center gap-2 mb-6">
        <div
          className="h-px flex-1"
          style={{ backgroundColor: "#D4AF37", opacity: 0.4 }}
        />
        <span
          className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
          style={{ backgroundColor: "#0a1628", color: "#D4AF37" }}
        >
          Member Access
        </span>
        <div
          className="h-px flex-1"
          style={{ backgroundColor: "#D4AF37", opacity: 0.4 }}
        />
      </div>

      <div className="mb-7">
        <h1
          className="text-5xl font-black tracking-tight text-black leading-none mb-1"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Log In
        </h1>
        <p className="text-sm text-zinc-400 mt-2">
          Don't have an account?{" "}
          <Link
            to="/auth/signup"
            className="font-semibold underline underline-offset-2 decoration-yellow-400 hover:decoration-black transition-all"
            style={{ color: "#0a1628" }}
          >
            Sign up
          </Link>
        </p>
      </div>

      {error && (
        <p className="text-sm text-red-500 mb-4 font-medium">{error}</p>
      )}

      <form className="space-y-4" onSubmit={handleLogin}>
        <div>
          <label
            htmlFor="signin-email"
            className="block text-xs font-bold uppercase tracking-widest mb-2"
            style={{ color: "#0a1628" }}
          >
            Email Address
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </span>
            <input
              id="signin-email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-xl border-2 border-zinc-100 bg-zinc-50 pl-11 pr-4 py-3.5 text-sm text-black outline-none transition-all placeholder:text-zinc-300 hover:border-zinc-200 focus:border-yellow-400 focus:bg-white focus:ring-0"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label
              htmlFor="signin-password"
              className="block text-xs font-bold uppercase tracking-widest"
              style={{ color: "#0a1628" }}
            >
              Password
            </label>
            <button
              type="button"
              className="text-xs font-medium underline underline-offset-2 transition-colors"
              style={{ color: "#D4AF37" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#0a1628")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#D4AF37")}
            >
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </span>
            <input
              id="signin-password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-xl border-2 border-zinc-100 bg-zinc-50 pl-11 pr-4 py-3.5 text-sm text-black outline-none transition-all placeholder:text-zinc-300 hover:border-zinc-200 focus:border-yellow-400 focus:bg-white focus:ring-0"
            />
          </div>
        </div>

        <div className="flex items-center gap-2.5 pt-1">
          <input
            type="checkbox"
            id="remember"
            className="h-4 w-4 rounded border-zinc-300 accent-yellow-400"
          />
          <label htmlFor="remember" className="text-sm text-zinc-500 select-none">
            Keep me signed in
          </label>
        </div>

        <button
          type="submit"
          className="w-full rounded-xl py-4 text-sm font-bold uppercase tracking-widest text-white transition-all active:scale-95 mt-2"
          style={{ backgroundColor: "#0a1628", letterSpacing: "0.18em" }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#D4AF37")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#0a1628")}
        >
          Log In →
        </button>

        <div className="relative py-1">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-100" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-4 text-xs uppercase tracking-widest text-zinc-300">
              or continue with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-xl border-2 border-zinc-100 bg-white py-3 text-xs font-bold uppercase tracking-wider text-zinc-700 transition-all hover:border-zinc-300 hover:shadow-sm active:scale-95"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-xl border-2 border-zinc-100 bg-white py-3 text-xs font-bold uppercase tracking-wider text-zinc-700 transition-all hover:border-zinc-300 hover:shadow-sm active:scale-95"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            Apple
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignInPage;