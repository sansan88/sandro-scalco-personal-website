import { NavLink } from "@/components/NavLink";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";

const Header = () => {
  const { t } = useLanguage();
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-3xl items-center justify-between px-4">
        <NavLink to="/" className="text-xl font-semibold tracking-tight">
          Sandro Scalco
        </NavLink>
        <div className="flex items-center gap-4 sm:gap-6">
          <nav className="flex items-center gap-6 sm:gap-8">
            <NavLink
              to="/"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeClassName="text-foreground"
            >
              {t("nav.feed")}
            </NavLink>
            <NavLink
              to="/about"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeClassName="text-foreground"
            >
              {t("nav.about")}
            </NavLink>
          </nav>
          <div className="flex items-center gap-1">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
