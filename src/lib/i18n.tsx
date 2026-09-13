import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { EN } from "./locales/en";
import { ES } from "./locales/es";
import type { Product } from "./catalog";

export type Lang = "fr" | "en" | "es";

export const LANGS: { id: Lang; label: string; short: string; flag: string }[] =
  [
    { id: "fr", label: "Français", short: "FR", flag: "🇫🇷" },
    { id: "en", label: "English", short: "EN", flag: "🇬🇧" },
    { id: "es", label: "Español", short: "ES", flag: "🇪🇸" },
  ];

const DICTS: Record<Lang, Record<string, string>> = {
  fr: {},
  en: EN,
  es: ES,
};

const LOCALES: Record<Lang, string> = {
  fr: "fr-FR",
  en: "en-GB",
  es: "es-ES",
};

const STORAGE_KEY = "k917.lang.v1";

type Vars = Record<string, string | number>;

type I18nValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  locale: string;
  /** Traduit une chaîne source française. */
  t: (fr: string, vars?: Vars) => string;
  /** Formate un montant en euros dans la locale active. */
  money: (value: number) => string;
  /** Formate un nombre dans la locale active. */
  num: (value: number) => string;
};

const I18nContext = createContext<I18nValue | null>(null);

function interpolate(text: string, vars?: Vars) {
  if (!vars) return text;
  return text.replace(/\{(\w+)\}/g, (match, key: string) => {
    const value = vars[key];
    return value === undefined ? match : String(value);
  });
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  useEffect(() => {
    let next: Lang | null = null;
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (stored && stored in DICTS) next = stored;
    } catch {
      /* ignore */
    }
    if (!next) {
      const nav = navigator.language?.slice(0, 2).toLowerCase();
      if (nav === "en" || nav === "es") next = nav;
    }
    if (next && next !== "fr") setLangState(next);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<I18nValue>(() => {
    const dict = DICTS[lang];
    const locale = LOCALES[lang];
    return {
      lang,
      setLang,
      locale,
      t: (fr, vars) => interpolate(dict[fr] ?? fr, vars),
      money: (v) =>
        new Intl.NumberFormat(locale, {
          style: "currency",
          currency: "EUR",
          minimumFractionDigits: 2,
        }).format(v),
      num: (v) => new Intl.NumberFormat(locale).format(v),
    };
  }, [lang, setLang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

/** Textes produits générés (nom, plafond, description) traduits. */
export function useProductText() {
  const { t, num } = useI18n();
  return useCallback(
    (product: Product) => ({
      name: t("Formule de {price} €", { price: num(product.price) }),
      ceiling: t("{amount} € sur la carte", {
        amount: num(product.ceilingValue),
      }),
      description: t(
        "La carte de {price} € vous offre {amount} € sur la carte. Achat en ligne ou retrait au guichet.",
        { price: num(product.price), amount: num(product.ceilingValue) },
      ),
    }),
    [t, num],
  );
}
