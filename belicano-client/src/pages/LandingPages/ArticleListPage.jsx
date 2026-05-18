import { useState, useEffect } from "react";
import Button from "../../components/Button";
import { fetchArticles, mapArticleFromApi } from "../../services/ArticleService";

const ArticleListPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadArticles = async () => {
      try {
        setLoading(true);
        setError("");
        const { data } = await fetchArticles();
        const activeArticles = (data?.articles ?? [])
          .filter((article) => article.isActive)
          .map(mapArticleFromApi);
        setArticles(activeArticles);
      } catch (err) {
        console.error("Failed to load articles:", err);
        setError("Failed to load articles. Please try again later.");
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, []);

  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
          Articles
        </p>
        <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
          Featured Articles and Languages
        </h1>
        <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
          Explore articles about the languages and technologies I use to develop projects.
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
            {loading ? "Loading articles..." : `${articles.length} Articles Available`}
          </h2>
        </div>

        {error ? (
          <div className="rounded-lg bg-red-100 p-4 text-red-700">
            <p>{error}</p>
          </div>
        ) : articles.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {articles.map((article) => (
              <article
                key={article._id || article.name}
                className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4 flex flex-col"
              >
                <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-zinc-200 overflow-hidden">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23ddd' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23999' font-size='24'%3EImage not found%3C/text%3E%3C/svg%3E";
                    }}
                  />
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
                <Button to={`/articles/${article.name}`} className="mt-4">
                  Read More
                </Button>
              </article>
            ))}
          </div>
        ) : !loading ? (
          <div className="rounded-lg bg-blue-100 p-4 text-blue-700">
            <p>No articles available yet. Check back soon!</p>
          </div>
        ) : null}
      </section>
    </div>
  );
};

export default ArticleListPage;