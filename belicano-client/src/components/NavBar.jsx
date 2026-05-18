import { NavLink } from 'react-router-dom';

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Articles', to: '/articles' },
];

const navLinkClassName = ({ isActive }) =>
  [
    'rounded-full border-2 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] transition relative group',
    isActive
      ? 'border-yellow-600/70 bg-yellow-600/10 text-yellow-500'
      : 'border-transparent text-zinc-500 hover:border-yellow-600/70 hover:bg-yellow-600/5 hover:text-yellow-500',
  ].join(' ');

const NavBar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-zinc-950/95 backdrop-blur-md border-b border-yellow-600/70 overflow-visible">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-yellow-500/60 to-transparent" />
      <div className="mx-auto flex max-w-6xl h-20 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="group flex items-center gap-3">
          <img
            src="/assets/images/Logo.svg"
            alt="Logo"
            className="h-22 w-auto object-contain"
          />
        </NavLink>

        <nav className="hidden items-center gap-2 md:flex">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === '/'}
              className={navLinkClassName}>
              {link.label}
            </NavLink>
          ))}

          <span className="mx-1 h-4 w-px bg-yellow-600/30" />

          <NavLink
            to="/auth/signin"
            className="rounded-full border-2 border-yellow-600/70 bg-yellow-600/10 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-yellow-500 transition hover:bg-yellow-600/20 hover:text-yellow-400"
          >
            Sign In
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;