import { useState, useEffect } from "react";
import Button from "../../components/Button";
import { fetchArticles, mapArticleFromApi } from "../../services/ArticleService";

const HomePage = () => {
  const [featuredArticles, setFeaturedArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeatured = async () => {
      try {
        setLoading(true);
        const { data } = await fetchArticles();
        const featured = (data?.articles ?? [])
          .filter((a) => a.isActive && a.isFeatured)
          .map(mapArticleFromApi);
        setFeaturedArticles(featured);
      } catch (err) {
        console.error("Failed to load featured articles:", err);
        setFeaturedArticles([]);
      } finally {
        setLoading(false);
      }
    };

    loadFeatured();
  }, []);

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
                  src="/assets/images/ProfilePic.jpg"
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
              Projects
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
            Featured Articles
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
            {loading ? "Loading articles..." : "Highlighted reads"}
          </h2>
        </div>

        {!loading && featuredArticles.length === 0 ? (
          <div className="rounded-lg bg-zinc-100 border-2 border-zinc-200 p-6 text-center text-zinc-500 text-sm">
            No featured articles yet.
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-3">
            {featuredArticles.map((article) => (
              <article
                key={article._id || article.name}
                className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4 flex flex-col"
              >
                <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-zinc-200 overflow-hidden">
                  {article.imageUrl ? (
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.target.src =
                          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23ddd' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23999' font-size='24'%3ENo Image%3C/text%3E%3C/svg%3E";
                      }}
                    />
                  ) : (
                    <span className="text-sm text-zinc-400">No image</span>
                  )}
                </div>
                <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500 truncate">
                  {article.name}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-zinc-900 line-clamp-2">
                  {article.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600 flex-grow line-clamp-3">
                  {article.description || "No description available."}
                </p>
                <Button to={`/articles/${article.name}`} className="mt-4" variant="primary">
                  Read More
                </Button>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;