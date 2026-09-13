import {
  BadgeCheck,
  Clock3,
  Headphones,
  Lock,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";

const STEPS = [
  {
    n: "1",
    title: "Choisissez votre formule",
    text: "De 100 € à 1 000 €, avec un plafond d'utilisation affiché clairement.",
  },
  {
    n: "2",
    title: "Réglez en toute sécurité",
    text: "Recharge prépayée Transcash, PCS ou Neosurf, avec confirmation par WhatsApp ou e-mail.",
  },
  {
    n: "3",
    title: "Recevez votre code",
    text: "Code vérifié puis transmis par WhatsApp ou e-mail en quelques minutes.",
  },
];

const GUARANTEES = [
  {
    icon: Lock,
    title: "Données chiffrées",
    text: "Aucune information bancaire n'est stockée sur nos serveurs.",
  },
  {
    icon: BadgeCheck,
    title: "Contrôle avant traitement",
    text: "Chaque demande est relue avant toute confirmation par l'équipe.",
  },
  {
    icon: Clock3,
    title: "Livraison < 15 min",
    text: "97,8 % des commandes sont honorées en moins d'un quart d'heure.",
  },
  {
    icon: Headphones,
    title: "Conseiller humain",
    text: "Une équipe joignable 7j/7 par téléphone et sur WhatsApp.",
  },
];

export function TrustSection() {
  const { t } = useI18n();
  return (
    <>
      <section className="bg-background py-10 sm:py-12 md:py-20">
        <div className="container-x">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground sm:h-7 sm:w-7 sm:text-xs">
              1
            </span>
            <span className="rounded-full border border-border px-3 py-1 text-[10px] font-medium sm:px-4 sm:py-1.5 sm:text-xs">
              {t("Comment ça marche")}
            </span>
          </div>
          <h2 className="display-lg mt-5 sm:mt-7 max-w-[20ch]">
            {t("Trois étapes, aucune mauvaise surprise.")}
          </h2>

          <div className="mt-8 grid gap-4 sm:mt-12 sm:gap-5 md:grid-cols-3">
            {STEPS.map((s) => (
              <div
                key={s.n}
                className="rounded-2xl border border-border bg-card p-5 shadow-soft sm:p-7"
              >
                <span className="eyebrow">{t("Étape {n}", { n: s.n })}</span>
                <h3 className="mt-3 text-base font-medium tracking-tight sm:text-xl">
                  {t(s.title)}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  {t(s.text)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-3 sm:mt-14 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {GUARANTEES.map((g) => (
              <div key={g.title} className="rounded-2xl bg-surface-muted p-4 sm:p-6">
                <g.icon className="h-5 w-5 text-accent" />
                <h3 className="mt-3 text-xs font-semibold sm:mt-4 sm:text-sm">{t(g.title)}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  {t(g.text)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
