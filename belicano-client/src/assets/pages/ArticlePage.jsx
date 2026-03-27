import Button from "../components/Button";

const ArticlePage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
          Articles
        </p>
        <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
          Featured languages that I have used to develop projects.
        </h1>
        <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
          Some of the languages I have used are listed below.
        </p>
        <div className="mt-6">
          <Button to="/">Back Home</Button>
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Featured Articles
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
           My most used programming languages.
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-zinc-200 overflow-hidden">
              <img
                src="/React.png"
                alt="React.js"
                className="h-full w-full object-cover"
              />
            </div>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Article 01
            </p>
            <h3 className="mt-2 text-lg font-semibold text-zinc-900">
              React.js
            </h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              React.js is a JavaScript library used for building modern web user
              interfaces. It focuses on creating reusable components and
              efficiently updating the UI when data changes, making it ideal for
              dynamic applications like dashboards and single-page apps.
            </p>
            <Button className="mt-4">Read More</Button>
          </article>

          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-zinc-200 overflow-hidden">
              <img
                src="/Java.avif"
                alt="Java"
                className="h-full w-full object-cover"
              />
            </div>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Article 02
            </p>
            <h3 className="mt-2 text-lg font-semibold text-zinc-900">Java</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Java is a general-purpose, object-oriented programming language
              used for building a wide range of applications, including Android
              apps and backend systems.
            </p>
            <Button className="mt-4">Read More</Button>
          </article>

          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-zinc-200 overflow-hidden">
              <img
                src="/Css.png"
                alt="CSS"
                className="h-full w-full object-cover"
              />
            </div>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Article 03
            </p>
            <h3 className="mt-2 text-lg font-semibold text-zinc-900">CSS</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              CSS (Cascading Style Sheets) is used to style and design web
              pages, controlling things like colors, fonts, spacing, and layout
              to make websites visually appealing and consistent.
            </p>
            <Button className="mt-4">Read More</Button>
          </article>

          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-zinc-200 overflow-hidden">
              <img
                src="/Flutter.jpg"
                alt="Flutter"
                className="h-full w-full object-cover"
              />
            </div>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Article 04
            </p>
            <h3 className="mt-2 text-lg font-semibold text-zinc-900">
              Flutter
            </h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Flutter is a UI framework developed by Google used for building
              cross-platform mobile applications. It allows developers to create
              apps for both Android and iOS using a single codebase, focusing on
              fast performance and smooth, responsive user interfaces.
            </p>
            <Button className="mt-4">Read More</Button>
          </article>
        </div>
      </section>
    </div>
  );
};

export default ArticlePage;
