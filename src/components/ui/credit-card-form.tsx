import React, { useEffect, useMemo, useState } from "react";

export type CardState = {
  number: string;
  holder: string;
  month: string;
  year: string;
  cvv: string;
};

export type CardValidity = {
  number: boolean;
  holder: boolean;
  month: boolean;
  year: boolean;
  cvv: boolean;
  allValid: boolean;
};

type Props = {
  defaultHolder?: string;
  maskMiddle?: boolean;
  submitLabel?: string;
  pending?: boolean;
  onChange?: (state: CardState, validity: CardValidity) => void;
  onSubmit?: (state: CardState, validity: CardValidity) => void;
};

type Field = "number" | "holder" | "expire" | "cvv" | null;

function clampDigits(value: string, maxLen: number) {
  return value.replace(/\D/g, "").slice(0, maxLen);
}

function luhn(num: string) {
  let sum = 0;
  let alt = false;
  for (let i = num.length - 1; i >= 0; i--) {
    let d = Number(num[i]);
    if (alt) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
    alt = !alt;
  }
  return sum % 10 === 0;
}

function brandOf(num: string) {
  if (/^4/.test(num)) return "VISA";
  if (/^(5[1-5]|2[2-7])/.test(num)) return "MASTERCARD";
  if (/^3[47]/.test(num)) return "AMEX";
  return "CARTE";
}

export function CreditCardForm({
  defaultHolder = "",
  maskMiddle = true,
  submitLabel = "Payer maintenant",
  pending = false,
  onChange,
  onSubmit,
}: Props) {
  const [number, setNumber] = useState("");
  const [holder, setHolder] = useState(defaultHolder.toUpperCase());
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [cvv, setCVV] = useState("");
  const [focusField, setFocusField] = useState<Field>(null);
  const [touched, setTouched] = useState(false);

  const flip = focusField === "cvv";
  const years = useMemo(() => {
    const start = new Date().getFullYear();
    return Array.from({ length: 10 }, (_, i) => String(start + i));
  }, []);

  const validity: CardValidity = useMemo(() => {
    const now = new Date();
    const numberValid = number.length >= 13 && luhn(number);
    const holderValid =
      holder.trim().length >= 2 && /^[A-ZÀ-Ÿ' -]+$/.test(holder.trim());
    const monthValid = !!month && +month >= 1 && +month <= 12;
    const yearValid = !!year && +year >= now.getFullYear();
    const notExpired =
      monthValid &&
      yearValid &&
      (+year > now.getFullYear() || +month >= now.getMonth() + 1);
    const cvvValid = /^\d{3,4}$/.test(cvv);
    return {
      number: numberValid,
      holder: holderValid,
      month: monthValid && notExpired,
      year: yearValid && notExpired,
      cvv: cvvValid,
      allValid: numberValid && holderValid && notExpired && cvvValid,
    };
  }, [number, holder, month, year, cvv]);

  useEffect(() => {
    onChange?.({ number, holder, month, year, cvv }, validity);
  }, [number, holder, month, year, cvv, validity, onChange]);

  const slots = useMemo(() => {
    const digits = number.slice(0, 16).split("");
    return Array.from({ length: 16 }, (_, i) => {
      if (i >= digits.length) return "#";
      return maskMiddle && i >= 4 && i <= 11 ? "*" : digits[i]!;
    });
  }, [number, maskMiddle]);

  const fieldClass = (ok: boolean) =>
    `h-13 w-full rounded-xl border px-4 py-3 text-base outline-none transition-shadow focus:ring-4 focus:ring-ring/15 ${
      touched && !ok ? "border-destructive" : "border-input focus:border-ring"
    } bg-background text-foreground`;

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
      {/* CARD PREVIEW */}
      <div
        className="relative mx-auto w-full max-w-[420px]"
        style={{ perspective: "1000px" }}
      >
        <div
          className="relative aspect-[1.75/1] w-full transition-transform duration-700"
          style={{
            transformStyle: "preserve-3d",
            transform: flip ? "rotateY(180deg)" : undefined,
          }}
        >
          {/* front */}
          <div
            className="absolute inset-0 overflow-hidden rounded-[20px] p-6 text-white shadow-card"
            style={{
              backfaceVisibility: "hidden",
              background: "linear-gradient(to bottom right, #323941, #061018)",
            }}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -left-[17%] -top-11 h-[300px] w-[300px] rounded-full border-[16px] blur-[13px]"
              style={{ borderColor: "var(--accent)" }}
            />
            <span
              aria-hidden
              className="pointer-events-none absolute left-[-200px] top-[55%] h-[300px] w-[300px] rounded-full border-[16px] blur-[13px]"
              style={{ borderColor: "#7288ff" }}
            />
            <div className="relative flex items-center justify-between font-semibold">
              <span className="text-sm tracking-wide">
                {brandOf(number)}
              </span>
              <span className="flex gap-1.5" aria-hidden>
                <span className="h-4 w-4 rounded-full bg-white/70" />
                <span className="-ml-3 h-4 w-4 rounded-full bg-white/40" />
              </span>
            </div>

            <div className="relative mt-8 flex h-8 items-center overflow-hidden text-[22px] tracking-wide">
              {slots.map((s, i) => (
                <span
                  key={i}
                  className={`inline-flex ${i % 4 === 3 ? "mr-2.5" : ""}`}
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="relative mt-6 flex items-end justify-between">
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-white/60">
                  Titulaire
                </p>
                <p className="truncate text-sm font-medium uppercase">
                  {holder || "NOM SUR LA CARTE"}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-white/60">
                  Expire
                </p>
                <p className="text-sm font-medium">
                  {month || "MM"}/{year ? year.slice(-2) : "AA"}
                </p>
              </div>
            </div>
          </div>

          {/* back */}
          <div
            className="absolute inset-0 overflow-hidden rounded-[20px] pt-6 text-white shadow-card"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              background: "linear-gradient(to bottom right, #323941, #061018)",
            }}
          >
            <div className="h-10 w-full bg-neutral-600" />
            <div className="mt-6 flex flex-col items-end px-8">
              <span className="text-xs font-semibold uppercase tracking-widest">
                CVV
              </span>
              <span className="mt-1.5 flex h-11 w-full items-center justify-end rounded-xl bg-white px-3 text-2xl text-black">
                {"*".repeat(cvv.length)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* FORM */}
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          setTouched(true);
          if (!validity.allValid) return;
          onSubmit?.({ number, holder, month, year, cvv }, validity);
        }}
        className="grid gap-4 rounded-2xl border border-border bg-card p-6 shadow-soft"
      >
        <div>
          <label
            htmlFor="cc-number"
            className="mb-1.5 block text-sm font-medium"
          >
            Numéro de carte
          </label>
          <input
            id="cc-number"
            inputMode="numeric"
            autoComplete="cc-number"
            placeholder="0000 0000 0000 0000"
            value={number.replace(/(\d{4})(?=\d)/g, "$1 ")}
            onChange={(e) => setNumber(clampDigits(e.target.value, 19))}
            onFocus={() => setFocusField("number")}
            onBlur={() => setFocusField(null)}
            aria-invalid={touched && !validity.number}
            className={fieldClass(validity.number)}
          />
          {number.length >= 13 && !validity.number && (
            <p className="mt-1 text-xs text-destructive">
              Ce numéro de carte est invalide.
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="cc-holder"
            className="mb-1.5 block text-sm font-medium"
          >
            Titulaire de la carte
          </label>
          <input
            id="cc-holder"
            autoComplete="cc-name"
            placeholder="PRENOM NOM"
            value={holder}
            onChange={(e) =>
              setHolder(
                e.target.value
                  .toUpperCase()
                  .replace(/[^A-ZÀ-Ÿ' -]/g, "")
                  .slice(0, 40),
              )
            }
            onFocus={() => setFocusField("holder")}
            onBlur={() => setFocusField(null)}
            aria-invalid={touched && !validity.holder}
            className={fieldClass(validity.holder)}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-[2fr_1fr]">
          <div>
            <span className="mb-1.5 block text-sm font-medium">
              Date d'expiration
            </span>
            <div className="grid grid-cols-2 gap-3">
              <select
                aria-label="Mois d'expiration"
                autoComplete="cc-exp-month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                onFocus={() => setFocusField("expire")}
                onBlur={() => setFocusField(null)}
                className={fieldClass(validity.month)}
              >
                <option value="">Mois</option>
                {Array.from({ length: 12 }, (_, i) =>
                  String(i + 1).padStart(2, "0"),
                ).map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              <select
                aria-label="Année d'expiration"
                autoComplete="cc-exp-year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                onFocus={() => setFocusField("expire")}
                onBlur={() => setFocusField(null)}
                className={fieldClass(validity.year)}
              >
                <option value="">Année</option>
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="cc-cvv" className="mb-1.5 block text-sm font-medium">
              CVV
            </label>
            <input
              id="cc-cvv"
              inputMode="numeric"
              autoComplete="cc-csc"
              placeholder="123"
              value={cvv}
              onChange={(e) => setCVV(clampDigits(e.target.value, 4))}
              onFocus={() => setFocusField("cvv")}
              onBlur={() => setFocusField(null)}
              aria-invalid={touched && !validity.cvv}
              className={fieldClass(validity.cvv)}
            />
          </div>
        </div>

        {touched && !validity.allValid && (
          <p className="text-xs text-destructive">
            Merci de corriger les champs en rouge avant de valider.
          </p>
        )}

        <button
          type="submit"
          disabled={!validity.allValid || pending}
          className="mt-2 inline-flex h-12 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
        >
          {pending
            ? "Traitement en cours…"
            : validity.allValid
              ? submitLabel
              : "Complétez tous les champs"}
        </button>
      </form>
    </div>
  );
}
