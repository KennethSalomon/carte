"use client";

import { useState } from "react";
import {
  Check,
  CreditCard,
  Building2,
  Shield,
  Lock,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SITE, mailtoLink } from "@/lib/site";
import { useI18n } from "@/lib/i18n";

type PaymentType = "card" | "rib";

export function BankInfoSection() {
  const { t } = useI18n();
  const [paymentType, setPaymentType] = useState<PaymentType>("card");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    cardNumber: "",
    cardHolder: "",
    cardExpiry: "",
    cardCvv: "",
    iban: "",
    bic: "",
    ribHolder: "",
    ribBank: "",
  });
  const [sent, setSent] = useState(false);
  const [sentBody, setSentBody] = useState("");
  const [sentType, setSentType] = useState<PaymentType>("card");

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let body = "";
    if (paymentType === "card") {
      body = [
        `Informations carte bancaire`,
        ``,
        `Nom : ${form.lastName}`,
        `Prénom : ${form.firstName}`,
        `Titulaire de la carte : ${form.cardHolder}`,
        `Numéro de carte : ${form.cardNumber}`,
        `Date d'expiration : ${form.cardExpiry}`,
        `CVV : ${form.cardCvv}`,
      ].join("\n");
    } else {
      body = [
        `Informations RIB`,
        ``,
        `Nom : ${form.lastName}`,
        `Prénom : ${form.firstName}`,
        `Titulaire du compte : ${form.ribHolder}`,
        `IBAN : ${form.iban}`,
        `BIC/SWIFT : ${form.bic}`,
        `Banque : ${form.ribBank}`,
      ].join("\n");
    }

    const subject =
      paymentType === "card"
        ? `Informations carte bancaire — ${SITE.name}`
        : `Informations RIB — ${SITE.name}`;

    window.location.href = mailtoLink(subject, body);
    setSentBody(body);
    setSentType(paymentType);
    setSent(true);
  };

  const features = [
    { icon: Shield, text: t("Transmission sécurisée par email") },
    { icon: Lock, text: t("Aucune donnée stockée en ligne") },
    {
      icon: CreditCard,
      text: t("Carte bancaire ou RIB selon votre besoin"),
    },
  ];

  if (sent) {
    return (
      <section className="bg-background py-12 sm:py-16 md:py-20">
        <div className="container-x">
          <div className="mx-auto max-w-lg rounded-2xl border border-success/30 bg-card p-6 text-center shadow-soft sm:p-8">
            <Check className="mx-auto h-10 w-10 text-success" />
            <h3 className="mt-4 text-lg font-medium sm:text-xl">
              {t("Informations envoyées")}
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
              {t(
                "Vos informations ont été transmises par email à la société. Vous recevrez une confirmation sous peu.",
              )}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a
                href={mailtoLink(
                  sentType === "card"
                    ? `Informations carte bancaire — ${SITE.name}`
                    : `Informations RIB — ${SITE.name}`,
                  sentBody,
                )}
                className="inline-flex h-10 items-center gap-2 rounded-full bg-accent px-5 text-xs font-medium text-accent-foreground sm:h-11 sm:px-6 sm:text-sm"
              >
                <Send className="h-3.5 w-3.5 sm:h-4 sm:w-4" />{" "}
                {t("Renvoyer l'email")}
              </a>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="inline-flex h-10 items-center rounded-full border border-border px-5 text-xs font-medium sm:h-11 sm:px-6 sm:text-sm"
              >
                {t("Envoyer d'autres informations")}
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-background py-12 sm:py-16 md:py-20">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-0">
          {/* LEFT — info */}
          <div className="space-y-8 rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8 lg:rounded-r-none lg:border-r-0 xl:p-12">
            <div>
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground sm:h-7 sm:w-7 sm:text-xs">
                  4
                </span>
                <span className="rounded-full border border-border px-3 py-1 text-[10px] font-medium sm:px-4 sm:py-1.5 sm:text-xs">
                  {t("Informations bancaires")}
                </span>
              </div>
              <h2 className="display-lg mt-5 max-w-[24ch] sm:mt-7">
                {t("Transmettez vos informations en toute sécurité.")}
              </h2>
              <p className="mt-4 max-w-[46ch] text-xs leading-relaxed text-muted-foreground sm:mt-5 sm:text-sm">
                {t(
                  "Vos données sont envoyées directement par email à la société et ne sont conservées sur aucun serveur.",
                )}
              </p>
            </div>

            <div className="space-y-4">
              {features.map((f) => (
                <div key={f.text} className="flex items-center gap-2">
                  <f.icon className="h-4 w-4 shrink-0 text-accent" />
                  <p className="text-xs sm:text-sm">{f.text}</p>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-border bg-background p-4">
              <p className="text-[11px] leading-relaxed text-muted-foreground sm:text-xs">
                {t(
                  "En soumettant ce formulaire, je confirme que les informations fournies sont exactes et autorise leur transmission par email à la société.",
                )}
              </p>
            </div>
          </div>

          {/* RIGHT — form */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8 lg:rounded-l-none lg:border-l-0 xl:p-12">
            <form onSubmit={handleSubmit} className="grid gap-4">
              {/* Payment type toggle */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentType("card")}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-full border py-2.5 text-xs font-medium transition-all sm:text-sm ${
                    paymentType === "card"
                      ? "border-primary bg-primary text-primary-foreground shadow-sm"
                      : "border-border bg-background text-muted-foreground hover:border-primary/50"
                  }`}
                  aria-pressed={paymentType === "card"}
                >
                  <CreditCard className="h-4 w-4" />
                  {t("Carte bancaire")}
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentType("rib")}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-full border py-2.5 text-xs font-medium transition-all sm:text-sm ${
                    paymentType === "rib"
                      ? "border-primary bg-primary text-primary-foreground shadow-sm"
                      : "border-border bg-background text-muted-foreground hover:border-primary/50"
                  }`}
                  aria-pressed={paymentType === "rib"}
                >
                  <Building2 className="h-4 w-4" />
                  RIB
                </button>
              </div>

              {/* Personal info */}
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <Label htmlFor="bi-lastname">{t("Nom")}</Label>
                  <Input
                    id="bi-lastname"
                    type="text"
                    placeholder={t("Dupont")}
                    className="mt-1.5"
                    required
                    value={form.lastName}
                    onChange={(e) => update("lastName", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="bi-firstname">{t("Prénom")}</Label>
                  <Input
                    id="bi-firstname"
                    type="text"
                    placeholder={t("Jean")}
                    className="mt-1.5"
                    required
                    value={form.firstName}
                    onChange={(e) => update("firstName", e.target.value)}
                  />
                </div>
              </div>

              {/* Card fields */}
              {paymentType === "card" && (
                <>
                  <div>
                    <Label htmlFor="bi-card-number">
                      {t("Numéro de carte")}
                    </Label>
                    <Input
                      id="bi-card-number"
                      type="text"
                      inputMode="numeric"
                      autoComplete="cc-number"
                      placeholder="0000 0000 0000 0000"
                      className="mt-1.5"
                      required
                      value={form.cardNumber}
                      onChange={(e) => update("cardNumber", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bi-card-holder">
                      {t("Titulaire de la carte")}
                    </Label>
                    <Input
                      id="bi-card-holder"
                      type="text"
                      autoComplete="cc-name"
                      placeholder={t("JEAN DUPONT")}
                      className="mt-1.5"
                      required
                      value={form.cardHolder}
                      onChange={(e) => update("cardHolder", e.target.value)}
                    />
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="bi-card-expiry">
                        {t("Date d'expiration")}
                      </Label>
                      <Input
                        id="bi-card-expiry"
                        type="text"
                        autoComplete="cc-exp"
                        placeholder="MM / AA"
                        className="mt-1.5"
                        required
                        value={form.cardExpiry}
                        onChange={(e) => update("cardExpiry", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="bi-card-cvv">CVV</Label>
                      <Input
                        id="bi-card-cvv"
                        type="text"
                        inputMode="numeric"
                        autoComplete="cc-csc"
                        placeholder="123"
                        className="mt-1.5"
                        required
                        value={form.cardCvv}
                        onChange={(e) => update("cardCvv", e.target.value)}
                      />
                    </div>
                  </div>
                </>
              )}

              {/* RIB fields */}
              {paymentType === "rib" && (
                <>
                  <div>
                    <Label htmlFor="bi-rib-holder">
                      {t("Titulaire du compte")}
                    </Label>
                    <Input
                      id="bi-rib-holder"
                      type="text"
                      placeholder={t("JEAN DUPONT")}
                      className="mt-1.5"
                      required
                      value={form.ribHolder}
                      onChange={(e) => update("ribHolder", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bi-iban">IBAN</Label>
                    <Input
                      id="bi-iban"
                      type="text"
                      placeholder="FR76 0000 0000 0000 0000 0000 000"
                      className="mt-1.5"
                      required
                      value={form.iban}
                      onChange={(e) => update("iban", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bi-bic">BIC / SWIFT</Label>
                    <Input
                      id="bi-bic"
                      type="text"
                      placeholder="BNPAFRPP"
                      className="mt-1.5"
                      required
                      value={form.bic}
                      onChange={(e) => update("bic", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bi-rib-bank">
                      {t("Nom de la banque")}
                    </Label>
                    <Input
                      id="bi-rib-bank"
                      type="text"
                      placeholder={t("BNP Paribas")}
                      className="mt-1.5"
                      required
                      value={form.ribBank}
                      onChange={(e) => update("ribBank", e.target.value)}
                    />
                  </div>
                </>
              )}

              <Button
                type="submit"
                className="mt-2 h-11 w-full rounded-full sm:h-12 sm:text-sm"
              >
                <Send className="mr-2 h-4 w-4" />
                {t("Valider et envoyer")}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
