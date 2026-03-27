import Button from "../components/Button";

const AboutPage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-12 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center gap-18">
          <div className="flex items-center justify-center">
            <div className="rounded-3xl border-2 border-dashed border-zinc-300 bg-zinc-100 p-1">
              <div className="flex h-70 w-70 items-center justify-center rounded-[1.25rem] bg-zinc-200">
                <img
                  src="/ProfilePic.jpg"
                  alt="Mark Antonio A. Belicano"
                  className="h-70 w-70 rounded-[1.25rem] object-cover"
                />
              </div>
            </div>
          </div>

          <div className="max-w-lg">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              ABOUT ME
            </p>
            <h1 className="text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
              Mark Antonio A. Belicano
            </h1>
            <p className="mt-4 text-sm leading-7 text-zinc-600 sm:text-base">
              Hi! I'm Mark, simple dude who likes music and cozy games.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/" variant="primary">
                Back Home
              </Button>
              <Button to="/articles">Open Articles</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Profile Overview
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
            Quick summary blocks
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">22</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Age
            </p>
          </div>
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">Student</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Occupation
            </p>
          </div>
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">Male</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Gender
            </p>
          </div>
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">Caloocan City</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Hometown
            </p>
          </div>
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Other Information
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
              Educational Background
            </h2>

            <div className="mt-6 space-y-4">
              <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                <h3 className="text-lg font-semibold text-zinc-900">
                  National University - Manila
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  College / BSIT-MWA
                </p>
              </article>

              <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                <h3 className="text-lg font-semibold text-zinc-900">
                  Espiritu Santo Parochial School - Manila
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  Senior High School / ABM Strand
                </p>
              </article>

              <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                <h3 className="text-lg font-semibold text-zinc-900">
                  Maria Clara High School - Caloocan
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  High School.
                </p>
              </article>

              <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                <h3 className="text-lg font-semibold text-zinc-900">
                  Central 1 - Laguna
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  Elementary.
                </p>
              </article>
            </div>
          </div>

          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Games I like to play
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="flex aspect-video items-center justify-center rounded-[1.25rem] overflow-hidden">
                <img
                  src="/StardewValley.jpg"
                  alt="Stardew Valley"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex aspect-video items-center justify-center rounded-[1.25rem] overflow-hidden">
                <img
                  src="/AQWorlds.jpg"
                  alt="AQWorlds"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex aspect-video items-center justify-center rounded-[1.25rem] overflow-hidden">
                <img
                  src="/Dave.avif"
                  alt="Dave"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex aspect-video items-center justify-center rounded-[1.25rem] overflow-hidden">
                <img
                  src="/Terraria.jpg"
                  alt="Terraria"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <Button className="mt-5">View Section</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
