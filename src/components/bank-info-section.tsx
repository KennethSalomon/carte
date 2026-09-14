"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Check,
  CreditCard,
  Building2,
  Shield,
  Lock,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE, mailtoLink } from "@/lib/site";
import { useI18n } from "@/lib/i18n";

type PaymentType = "card" | "rib";
type FocusField = "number" | "holder" | "expire" | "cvv" | null;

function clampDigits(v: string, max: number) {
  return v.replace(/\D/g, "").slice(0, max);
}

function formatSpaced(n: string) {
  return n.replace(/\s+/g, "").replace(/(\d{4})(?=\d)/g, "$1 ");
}

export function BankInfoSection() {
  const { t } = useI18n();
  const [paymentType, setPaymentType] = useState<PaymentType>("card");

  /* ── personal ── */
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");

  /* ── card ── */
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [cardMonth, setCardMonth] = useState("");
  const [cardYear, setCardYear] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [focusField, setFocusField] = useState<FocusField>(null);

  /* ── rib ── */
  const [ribHolder, setRibHolder] = useState("");
  const [iban, setIban] = useState("");
  const [bic, setBic] = useState("");
  const [ribBank, setRibBank] = useState("");

  /* ── submission ── */
  const [sent, setSent] = useState(false);
  const [sentBody, setSentBody] = useState("");
  const [sentType, setSentType] = useState<PaymentType>("card");

  const flip = focusField === "cvv";

  const years = useMemo(() => {
    const start = new Date().getFullYear();
    return Array.from({ length: 10 }, (_, i) => String(start + i));
  }, []);

  /* ── card number display slots ── */
  const displayDigits = useMemo(() => cardNumber.slice(0, 16).split(""), [cardNumber]);
  const slots = useMemo(() => {
    return Array.from({ length: 16 }, (_, i) => {
      let text = "#";
      if (i < displayDigits.length) {
        text = i >= 4 && i <= 11 ? "*" : displayDigits[i]!;
      }
      return { text, filed: i < displayDigits.length };
    });
  }, [displayDigits]);

  /* ── highlight position ── */
  const highlightClass = (() => {
    switch (focusField) {
      case "number": return "bi-highlight__number";
      case "holder": return "bi-highlight__holder";
      case "expire": return "bi-highlight__expire";
      case "cvv": return "bi-highlight__cvv";
      default: return "bi-highlight--hidden";
    }
  })();

  /* ── submit ── */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let body = "";
    if (paymentType === "card") {
      body = [
        `Informations carte bancaire`, ``,
        `Nom : ${lastName}`, `Prénom : ${firstName}`,
        `Titulaire : ${cardHolder}`, `Numéro : ${cardNumber}`,
        `Expire : ${cardMonth}/${cardYear}`, `CVV : ${cardCvv}`,
      ].join("\n");
    } else {
      body = [
        `Informations RIB`, ``,
        `Nom : ${lastName}`, `Prénom : ${firstName}`,
        `Titulaire : ${ribHolder}`, `IBAN : ${iban}`,
        `BIC/SWIFT : ${bic}`, `Banque : ${ribBank}`,
      ].join("\n");
    }
    const subject = paymentType === "card"
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
    { icon: CreditCard, text: t("Carte bancaire ou RIB selon votre besoin") },
  ];

  const field =
    "h-11 w-full rounded-xl border border-input bg-background px-3 text-xs outline-none transition-all duration-200 focus:border-foreground focus:ring-4 focus:ring-ring/15 sm:h-12 sm:px-4 sm:text-sm";

  /* ── SENT STATE ── */
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
              {t("Vos informations ont été transmises par email à la société. Vous recevrez une confirmation sous peu.")}
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
                <Send className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> {t("Renvoyer l'email")}
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

  /* ── MAIN ── */
  return (
    <section className="bg-background py-12 sm:py-16 md:py-20">
      <div className="container-x">
        {/* header */}
        <div className="mb-10 text-center sm:mb-14">
          <h2 className="display-lg mt-5 sm:mt-7">
            {t("Transmettez vos informations en toute sécurité.")}
          </h2>
          <p className="mx-auto mt-4 max-w-[52ch] text-xs leading-relaxed text-muted-foreground sm:mt-5 sm:text-sm">
            {t("Vos données sont envoyées directement par email à la société et ne sont conservées sur aucun serveur.")}
          </p>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
          {/* ── LEFT: card preview + features ── */}
          <div className="space-y-6">
            {/* animated card */}
            {paymentType === "card" && (
              <div className="bi-card-scene" style={{ perspective: "1000px" }}>
                <div className={`bi-card ${flip ? "bi-card--flip" : ""}`}>
                  {/* highlight glow */}
                  <div id="bi-highlight" className={highlightClass} />

                  {/* FRONT */}
                  <div className="bi-card__face bi-card__front">
                    {/* decorative rings */}
                    <span aria-hidden className="bi-ring bi-ring--1" />
                    <span aria-hidden className="bi-ring bi-ring--2" />

                    <div className="bi-card__top">
                      <span className="text-sm font-semibold tracking-wide">CreditCard</span>
                      <svg xmlns="http://www.w3.org/2000/svg" height="32" width="48" viewBox="-96 -98.908 832 593.448">
                        <path fill="#ff5f00" d="M224.833 42.298h190.416v311.005H224.833z" />
                        <path d="M244.446 197.828a197.448 197.448 0 0175.54-155.475 197.777 197.777 0 100 311.004 197.448 197.448 0 01-75.54-155.53z" fill="#eb001b" />
                        <path d="M640 197.828a197.777 197.777 0 01-320.015 155.474 197.777 197.777 0 000-311.004A197.777 197.777 0 01640 197.773z" fill="#f79e1b" />
                      </svg>
                    </div>

                    <div className="bi-card__number" aria-label="Card number">
                      {slots.map((s, i) => (
                        <span key={i} className="bi-slot">
                          <span className={`bi-digit ${s.filed ? "bi-digit--filed" : ""}`}>
                            <span className="bi-row">#</span>
                            <span className="bi-row">{s.text}</span>
                          </span>
                        </span>
                      ))}
                    </div>

                    <div className="bi-card__bottom">
                      <div className="min-w-0">
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-white/50">Titulaire</p>
                        <p className="truncate text-xs font-medium uppercase">{cardHolder || "NOM SUR LA CARTE"}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-white/50">Expire</p>
                        <p className="text-xs font-medium">{cardMonth || "MM"}/{cardYear ? cardYear.slice(-2) : "AA"}</p>
                      </div>
                    </div>
                  </div>

                  {/* BACK */}
                  <div className="bi-card__face bi-card__back">
                    <span aria-hidden className="bi-ring bi-ring--1" />
                    <span aria-hidden className="bi-ring bi-ring--2" />
                    <div className="bi-card__mag" />
                    <div className="bi-card__cvv-area">
                      <span className="text-xs font-semibold uppercase tracking-widest">CVV</span>
                      <div className="bi-card__cvv-field">
                        {"*".repeat(cardCvv.length)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* RIB visual */}
            {paymentType === "rib" && (
              <div className="relative mx-auto w-full max-w-[420px] overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
                <img
                  src="/rib.png"
                  alt="Relevé d'identité bancaire (RIB)"
                  className="h-auto w-full object-cover"
                />
              </div>
            )}

            {/* features */}
            <div className="space-y-3 px-2">
              {features.map((f) => (
                <div key={f.text} className="flex items-center gap-2">
                  <f.icon className="h-4 w-4 shrink-0 text-accent" />
                  <p className="text-xs sm:text-sm">{f.text}</p>
                </div>
              ))}
            </div>

            <div className="mx-2 rounded-xl border border-border bg-surface-muted p-3">
              <p className="text-[11px] leading-relaxed text-muted-foreground sm:text-xs">
                {t("En soumettant ce formulaire, je confirme que les informations fournies sont exactes et autorise leur transmission par email à la société.")}
              </p>
            </div>
          </div>

          {/* ── RIGHT: form ── */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-soft sm:p-6 lg:p-8">
            <form onSubmit={handleSubmit} className="grid gap-3.5">
              {/* toggle */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentType("card")}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-full border py-2.5 text-xs font-medium transition-all duration-200 sm:text-sm ${
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
                  className={`flex flex-1 items-center justify-center gap-2 rounded-full border py-2.5 text-xs font-medium transition-all duration-200 sm:text-sm ${
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

              {/* personal */}
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="bi-lastname" className="mb-1 block text-xs font-medium sm:text-sm">{t("Nom")}</label>
                  <input id="bi-lastname" type="text" placeholder={t("Dupont")} className={field} required value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="bi-firstname" className="mb-1 block text-xs font-medium sm:text-sm">{t("Prénom")}</label>
                  <input id="bi-firstname" type="text" placeholder={t("Jean")} className={field} required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
              </div>

              {/* card fields */}
              {paymentType === "card" && (
                <>
                  <div>
                    <label htmlFor="bi-card-number" className="mb-1 block text-xs font-medium sm:text-sm">{t("Numéro de carte")}</label>
                    <input
                      id="bi-card-number"
                      inputMode="numeric"
                      autoComplete="cc-number"
                      placeholder="0000 0000 0000 0000"
                      className={field}
                      required
                      value={formatSpaced(cardNumber)}
                      onChange={(e) => setCardNumber(clampDigits(e.target.value, 16))}
                      onFocus={() => setFocusField("number")}
                      onBlur={() => setFocusField(null)}
                    />
                  </div>
                  <div>
                    <label htmlFor="bi-card-holder" className="mb-1 block text-xs font-medium sm:text-sm">{t("Titulaire de la carte")}</label>
                    <input
                      id="bi-card-holder"
                      type="text"
                      autoComplete="cc-name"
                      placeholder={t("JEAN DUPONT")}
                      className={field}
                      required
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value.toUpperCase().replace(/[^A-ZÀ-Ÿ' -]/g, "").slice(0, 40))}
                      onFocus={() => setFocusField("holder")}
                      onBlur={() => setFocusField(null)}
                    />
                  </div>
                  <div className="grid gap-3 sm:grid-cols-[2fr_1fr]">
                    <div>
                      <label className="mb-1 block text-xs font-medium sm:text-sm">{t("Date d'expiration")}</label>
                      <div className="grid grid-cols-2 gap-2">
                        <select
                          aria-label="Mois"
                          autoComplete="cc-exp-month"
                          value={cardMonth}
                          onChange={(e) => setCardMonth(e.target.value)}
                          onFocus={() => setFocusField("expire")}
                          onBlur={() => setFocusField(null)}
                          className={field}
                        >
                          <option value="">Mois</option>
                          {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0")).map((m) => (
                            <option key={m} value={m}>{m}</option>
                          ))}
                        </select>
                        <select
                          aria-label="Année"
                          autoComplete="cc-exp-year"
                          value={cardYear}
                          onChange={(e) => setCardYear(e.target.value)}
                          onFocus={() => setFocusField("expire")}
                          onBlur={() => setFocusField(null)}
                          className={field}
                        >
                          <option value="">Année</option>
                          {years.map((y) => (
                            <option key={y} value={y}>{y}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="bi-card-cvv" className="mb-1 block text-xs font-medium sm:text-sm">CVV</label>
                      <input
                        id="bi-card-cvv"
                        inputMode="numeric"
                        autoComplete="cc-csc"
                        placeholder="***"
                        className={field}
                        required
                        value={cardCvv}
                        onChange={(e) => setCardCvv(clampDigits(e.target.value, 4))}
                        onFocus={() => setFocusField("cvv")}
                        onBlur={() => setFocusField(null)}
                      />
                    </div>
                  </div>
                </>
              )}

              {/* rib fields */}
              {paymentType === "rib" && (
                <>
                  <div>
                    <label htmlFor="bi-rib-holder" className="mb-1 block text-xs font-medium sm:text-sm">{t("Titulaire du compte")}</label>
                    <input id="bi-rib-holder" type="text" placeholder={t("JEAN DUPONT")} className={field} required value={ribHolder} onChange={(e) => setRibHolder(e.target.value)} />
                  </div>
                  <div>
                    <label htmlFor="bi-iban" className="mb-1 block text-xs font-medium sm:text-sm">IBAN</label>
                    <input id="bi-iban" type="text" placeholder="FR76 0000 0000 0000 0000 0000 000" className={field} required value={iban} onChange={(e) => setIban(e.target.value)} />
                  </div>
                  <div>
                    <label htmlFor="bi-bic" className="mb-1 block text-xs font-medium sm:text-sm">BIC / SWIFT</label>
                    <input id="bi-bic" type="text" placeholder="BNPAFRPP" className={field} required value={bic} onChange={(e) => setBic(e.target.value)} />
                  </div>
                  <div>
                    <label htmlFor="bi-rib-bank" className="mb-1 block text-xs font-medium sm:text-sm">{t("Nom de la banque")}</label>
                    <input id="bi-rib-bank" type="text" placeholder={t("BNP Paribas")} className={field} required value={ribBank} onChange={(e) => setRibBank(e.target.value)} />
                  </div>
                </>
              )}

              <Button type="submit" className="mt-1 h-11 w-full rounded-full sm:h-12 sm:text-sm">
                <Send className="mr-2 h-4 w-4" />
                {t("Valider et envoyer")}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* ── card animation styles ── */}
      <style>{`
        /* ── card scene ── */
        .bi-card-scene { width: 100%; max-width: 420px; margin: 0 auto; perspective: 1000px; }

        .bi-card {
          position: relative;
          width: 100%;
          transform-style: preserve-3d;
          transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .bi-card--flip { transform: rotateY(180deg); }

        .bi-card__face {
          position: relative;
          width: 100%;
          aspect-ratio: 1.586 / 1;
          border-radius: 20px;
          padding: 24px;
          background: linear-gradient(135deg, #323941 0%, #061018 100%);
          box-shadow: 0 33px 50px -15px rgba(50, 55, 63, 0.66);
          color: #fff;
          overflow: hidden;
          backface-visibility: hidden;
        }
        .bi-card__back {
          position: absolute;
          top: 0; left: 0;
          transform: rotateY(180deg);
          display: flex;
          flex-direction: column;
          padding-top: 0;
        }

        /* decorative glow rings */
        .bi-ring {
          position: absolute;
          border-radius: 100%;
          border: 16px solid;
          filter: blur(13px);
          pointer-events: none;
        }
        .bi-ring--1 { border-color: #ff6be7; left: -17%; top: -45px; height: 300px; width: 300px; }
        .bi-ring--2 { border-color: #7288ff; left: -200px; top: 55%; height: 300px; width: 300px; }

        /* highlight glow on focus */
        #bi-highlight {
          position: absolute;
          border: 1px solid #fff;
          border-radius: 12px;
          z-index: 1;
          width: 0; height: 0;
          top: 0; left: 0;
          box-shadow: 0 0 8px rgba(255,255,255,0.6);
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: none;
        }
        .bi-highlight__number { width: calc(100% - 48px); height: 36px; top: 92px; left: 24px; }
        .bi-highlight__holder { width: 65%; height: 48px; top: 152px; left: 24px; }
        .bi-highlight__expire { width: 28%; height: 48px; top: 152px; right: 24px; left: auto; }
        .bi-highlight__cvv { width: calc(100% - 48px); height: 80px; top: 80px; left: 24px; }
        .bi-highlight--hidden { opacity: 0; width: 0; height: 0; }

        /* card top row */
        .bi-card__top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 28px;
          position: relative;
          z-index: 1;
        }

        /* card number with slide */
        .bi-card__number {
          font-size: 20px;
          margin-bottom: 28px;
          position: relative;
          z-index: 1;
          display: flex;
          height: 28px;
          overflow: hidden;
        }
        @media (min-width: 640px) { .bi-card__number { font-size: 22px; height: 30px; } }
        .bi-slot { display: inline-flex; }
        .bi-slot:nth-child(4n) { margin-right: 10px; }
        .bi-digit {
          display: flex;
          flex-direction: column;
          height: 28px;
          line-height: 28px;
          transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }
        @media (min-width: 640px) { .bi-digit { height: 30px; line-height: 30px; } }
        .bi-digit--filed { transform: translateY(-28px); }
        @media (min-width: 640px) { .bi-digit--filed { transform: translateY(-30px); } }
        .bi-row { height: inherit; display: block; }

        /* card bottom */
        .bi-card__bottom {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          position: relative;
          z-index: 1;
        }

        /* back */
        .bi-card__mag {
          height: 40px;
          width: 100%;
          background: #6b7280;
          margin-bottom: 20px;
        }
        .bi-card__cvv-area {
          padding: 0 32px;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }
        .bi-card__cvv-field {
          margin-top: 6px;
          background: #fff;
          border-radius: 10px;
          height: 40px;
          width: 100%;
          color: #000;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding: 0 12px;
          font-size: 22px;
          letter-spacing: 4px;
        }

        @media (max-width: 480px) {
          .bi-card__face { padding: 16px; }
          .bi-ring--1 { left: -25%; top: -30px; height: 200px; width: 200px; }
          .bi-ring--2 { left: -140px; height: 200px; width: 200px; }
          .bi-highlight__number { top: 76px; left: 16px; width: calc(100% - 32px); }
          .bi-highlight__holder { top: 128px; left: 16px; width: 60%; }
          .bi-highlight__expire { top: 128px; right: 16px; }
          .bi-highlight__cvv { top: 68px; left: 16px; width: calc(100% - 32px); }
        }
      `}</style>
    </section>
  );
}
