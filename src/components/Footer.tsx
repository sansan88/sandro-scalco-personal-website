import { Github, Leaf } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="mt-auto border-t border-border py-6">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 text-sm text-muted-foreground sm:flex-row">
        <a
          href="https://www.websitecarbon.com/website/scalco-ch/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 transition-colors hover:text-foreground"
        >
          <Leaf className="h-4 w-4 text-green-500" />
          <span>{t("footer.carbon")}</span>
        </a>

        <a
          href="https://github.com/sansan88/sandro-scalco-personal-website"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 transition-colors hover:text-foreground"
        >
          <Github className="h-4 w-4" />
          <span>{t("footer.github")}</span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
