import { Link } from 'react-router-dom';

const SignUpPage = () => {
  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow-500 mb-2">Get started</p>
        <h1 className="text-4xl font-bold tracking-tight text-black">Sign Up</h1>
        <p className="mt-2 text-sm text-zinc-400">Already have an account?{' '}
          <Link to="/auth/signin" className="text-black font-semibold underline underline-offset-2 decoration-yellow-400 hover:decoration-black transition-all">
            Log in
          </Link>
        </p>
      </div>

      {/* Form */}
      <form className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="first-name" className="block text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-1.5">
              First Name
            </label>
            <input
              id="first-name"
              type="text"
              placeholder="John"
              autoComplete="given-name"
              className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-black outline-none transition placeholder:text-zinc-300 hover:border-zinc-300 focus:border-black focus:bg-white focus:ring-2 focus:ring-black focus:ring-offset-0"
            />
          </div>
          <div>
            <label htmlFor="last-name" className="block text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-1.5">
              Last Name
            </label>
            <input
              id="last-name"
              type="text"
              placeholder="Doe"
              autoComplete="family-name"
              className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-black outline-none transition placeholder:text-zinc-300 hover:border-zinc-300 focus:border-black focus:bg-white focus:ring-2 focus:ring-black focus:ring-offset-0"
            />
          </div>
        </div>

        <div>
          <label htmlFor="signup-email" className="block text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-1.5">
            Email
          </label>
          <input
            id="signup-email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-black outline-none transition placeholder:text-zinc-300 hover:border-zinc-300 focus:border-black focus:bg-white focus:ring-2 focus:ring-black focus:ring-offset-0"
          />
        </div>

        <div>
          <label htmlFor="signup-password" className="block text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-1.5">
            Password
          </label>
          <input
            id="signup-password"
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
            className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-black outline-none transition placeholder:text-zinc-300 hover:border-zinc-300 focus:border-black focus:bg-white focus:ring-2 focus:ring-black focus:ring-offset-0"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="mt-2 w-full rounded-lg bg-black py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-all hover:bg-zinc-800 active:scale-[0.99]"
        >
          Create Account
        </button>

        {/* Divider */}
        <div className="relative py-3">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-100" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-black px-4 text-xs uppercase tracking-widest text-zinc-300">or continue with</span>
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

        <p className="text-center text-xs text-zinc-300 pt-2">
          By signing up you agree to our{' '}
          <span className="text-zinc-500 underline underline-offset-2 cursor-pointer hover:text-black transition-colors">Terms</span>
          {' '}and{' '}
          <span className="text-zinc-500 underline underline-offset-2 cursor-pointer hover:text-black transition-colors">Privacy Policy</span>.
        </p>
      </form>
    </>
  );
};

export default SignUpPage;