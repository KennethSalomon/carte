import { Globe } from "lucide-react";
import { LANGS, useI18n, type Lang } from "@/lib/i18n";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SHORT: Record<Lang, string> = { fr: "FR", en: "EN", es: "ES" };

export function LanguageSwitcher({
  tone = "light",
  className = "",
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  const { lang, setLang, t } = useI18n();
  const dark = tone === "dark";

  return (
    <Select value={lang} onValueChange={(v) => setLang(v as Lang)}>
      <SelectTrigger
        aria-label={t("Changer de langue")}
        className={`h-9 w-auto gap-1 rounded-full px-2 text-xs font-medium min-[380px]:h-10 min-[380px]:gap-1.5 min-[380px]:px-3 sm:text-sm ${
          dark
            ? "bg-ink-foreground/10 text-ink-foreground"
            : "bg-secondary text-secondary-foreground"
        } ${className}`}
      >
        <Globe className="hidden h-4 w-4 shrink-0 min-[380px]:block" aria-hidden="true" />
        {/* NOTE: `!` (important) requis : le `[&>span]:line-clamp-1` du
            SelectTrigger shadcn a une spécificité supérieure à `hidden`. */}
        <span className="sm:hidden!">{SHORT[lang]}</span>
        <span className="hidden! whitespace-nowrap sm:inline!">
          <SelectValue />
        </span>
      </SelectTrigger>
      <SelectContent>
        {LANGS.map((l) => (
          <SelectItem key={l.id} value={l.id}>
            {l.flag} {l.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
