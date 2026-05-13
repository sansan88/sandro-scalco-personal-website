import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const LanguageToggle = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLanguage(language === "de" ? "en" : "de")}
      aria-label={t("lang.toggle")}
      className="gap-1.5 px-2"
    >
      <Languages className="h-4 w-4" />
      <span className="text-xs font-medium uppercase">
        {language === "de" ? "EN" : "DE"}
      </span>
    </Button>
  );
};

export default LanguageToggle;
