import { Globe } from "lucide-react";
import { LANGS, useI18n, type Lang } from "@/lib/i18n";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
        className={`h-10 w-auto gap-1.5 rounded-full px-3 text-sm font-medium ${
          dark
            ? "bg-ink-foreground/10 text-ink-foreground"
            : "bg-secondary text-secondary-foreground"
        } ${className}`}
      >
        <Globe className="h-4 w-4 shrink-0" aria-hidden="true" />
        <SelectValue />
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
