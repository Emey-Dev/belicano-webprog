const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t-2 border-zinc-900 bg-zinc-900 text-zinc-100">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
          <p className="text-sm text-zinc-400">
            © {currentYear} National University Manila
          </p>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-zinc-400 transition-colors duration-150 hover:text-white"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;