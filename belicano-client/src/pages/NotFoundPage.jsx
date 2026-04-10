import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="flex w-full min-h-screen flex-col items-center justify-center border-y-2 border-zinc-900 bg-zinc-50 px-4 py-16 text-center">
      <p className="fade-up-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500 mb-6">
        Error
      </p>

      <div className="fade-up-2 glitch-wrapper" data-text="404">
        <span
          style={{
            fontSize: "clamp(6rem, 20vw, 10rem)",
            fontWeight: 700,
            lineHeight: 1,
            color: "#18181b",
            letterSpacing: "-0.04em",
            display: "block",
          }}
        >
          404
        </span>
      </div>

      <div className="fade-up-3 mt-6 border-t-2 border-zinc-900 pt-6 max-w-sm">
        <h1 className="text-xl font-semibold text-zinc-900">Page not found</h1>
        <p className="mt-2 text-sm leading-6 text-zinc-500">
          The link you followed must be broken, or the page has been moved.
        </p>
      </div>
    </div>
  );
}

export default NotFoundPage;
