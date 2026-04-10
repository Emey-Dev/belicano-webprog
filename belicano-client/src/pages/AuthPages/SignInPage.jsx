import { Link } from "react-router-dom";

const SignInPage = () => {
  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow-500 mb-2">
          Welcome back
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-black">Log In</h1>
        <p className="mt-2 text-sm text-zinc-400">
          Don't have an account?{" "}
          <Link
            to="/auth/signup"
            className="text-black font-semibold underline underline-offset-2 decoration-yellow-400 hover:decoration-black transition-all"
          >
            Sign up
          </Link>
        </p>
      </div>

      {/* Form */}
      <form className="space-y-4">
        <div>
          <label
            htmlFor="signin-email"
            className="block text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-1.5"
          >
            Email
          </label>
          <input
            id="signin-email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-black outline-none transition placeholder:text-zinc-300 hover:border-zinc-300 focus:border-black focus:bg-white focus:ring-2 focus:ring-black focus:ring-offset-0"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="signin-password"
              className="block text-xs font-semibold uppercase tracking-widest text-zinc-400"
            >
              Password
            </label>
            <button
              type="button"
              className="text-xs text-zinc-400 hover:text-black transition-colors"
            >
              Forgot password?
            </button>
          </div>
          <input
            id="signin-password"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-black outline-none transition placeholder:text-zinc-300 hover:border-zinc-300 focus:border-black focus:bg-white focus:ring-2 focus:ring-black focus:ring-offset-0"
          />
        </div>

        <div className="flex items-center gap-2 pt-1">
          <input
            type="checkbox"
            id="remember"
            className="h-4 w-4 rounded border-zinc-300 accent-yellow-400"
          />
          <label htmlFor="remember" className="text-sm text-zinc-500">
            Remember me
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="mt-2 w-full rounded-lg bg-black py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-all hover:bg-zinc-800 active:scale-[0.99]"
        >
          Log In
        </button>

        {/* Divider */}
        <div className="relative py-3">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-100" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-black px-4 text-xs uppercase tracking-widest text-zinc-300">
              or continue with
            </span>
          </div>
        </div>

        {/* Social */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-white py-3 text-xs font-semibold uppercase tracking-widest text-zinc-700 transition hover:border-zinc-400 hover:bg-zinc-50 active:scale-[0.99]"
          >
            Google
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-white py-3 text-xs font-semibold uppercase tracking-widest text-zinc-700 transition hover:border-zinc-400 hover:bg-zinc-50 active:scale-[0.99]"
          >
            Apple
          </button>
        </div>
      </form>
    </>
  );
};

export default SignInPage;
