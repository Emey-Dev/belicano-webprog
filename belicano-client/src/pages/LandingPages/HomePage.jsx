import Button from "../../components/Button";

const HomePage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Name
            </p>
            <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
              Mark Antonio A. Belicano
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
              Enjoys music and cozy games.
            </p>
            <div className="mt-6">
              <Button to="/about" variant="primary">
                Learn More
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="rounded-3xl border-2 border-dashed border-zinc-300 bg-zinc-100 p-1">
              <div className="flex h-70 w-70 items-center justify-center rounded-[1.25rem] bg-zinc-200">
                <img
                  src="src/assets/images/ProfilePic.jpg"
                  alt="Mark Antonio A. Belicano"
                  className="h-70 w-70 rounded-[1.25rem] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            KPI Section
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
            Quick overview 
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">React.js</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Most Used Programming Language
            </p>
          </div>
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">4</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Porjects
            </p>
          </div>
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">BSIT - MWA</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Course
            </p>
          </div>
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">College</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Education Level
            </p>
          </div>
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Featured Musics
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
            My daily music picks
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-zinc-200 overflow-hidden">
              <img
                src="src/assets/images/SoGood.avif"
                alt="Feature Card One"
                className="h-full w-full object-cover"
              />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-zinc-900">
              So Good
            </h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              - Weston State
            </p>
            <Button className="mt-4" variant="primary">
              View More
            </Button>
          </article>

          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-zinc-200 overflow-hidden">
              <img
                src="src/assets/images/Yellow.avif"
                alt="Feature Card Two"
                className="h-full w-full object-cover"
              />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-zinc-900">
              Yellow
            </h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              - Coldplay
            </p>
            <Button className="mt-4" variant="primary">
              View More
            </Button>
          </article>

          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-zinc-200 overflow-hidden">
              <img
                src="src/assets/images/North.avif"
                alt="Feature Card Three"
                className="h-full w-full object-cover"
              />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-zinc-900">
              North
            </h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              - Fly By Midnight
            </p>
            <Button className="mt-4" variant="primary">
              View More
            </Button>
          </article>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
