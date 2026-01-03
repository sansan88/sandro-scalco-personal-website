import { NavLink } from "@/components/NavLink";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-3xl items-center justify-between px-4">
        <NavLink to="/" className="text-xl font-semibold tracking-tight">
          Sandro Scalco
        </NavLink>
        <div className="flex items-center gap-6">
          <nav className="flex items-center gap-8">
            <NavLink
              to="/"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeClassName="text-foreground"
            >
              Feed
            </NavLink>
            <NavLink
              to="/about"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeClassName="text-foreground"
            >
              Über mich
            </NavLink>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
