import * as React from "react";
import { cn } from "@/lib/utils";

export type CardTheme = "black" | "silver" | "gold";

const THEMES: Record<
  CardTheme,
  { face: string; text: string; sub: string; chip: string; strip: string }
> = {
  black: {
    face: "bg-[linear-gradient(135deg,#1c1c1e_0%,#0a0a0b_45%,#2b2b2f_100%)]",
    text: "text-white",
    sub: "text-white/55",
    chip: "bg-[linear-gradient(135deg,#d9c07a,#f4e6b8,#b99a4d)]",
    strip: "bg-black/80",
  },
  silver: {
    face: "bg-[linear-gradient(135deg,#d8dce2_0%,#a9b0b9_45%,#eef1f4_100%)]",
    text: "text-[#1b1e22]",
    sub: "text-[#1b1e22]/55",
    chip: "bg-[linear-gradient(135deg,#c8cdd4,#ffffff,#9aa1aa)]",
    strip: "bg-[#3a3f45]",
  },
  gold: {
    face: "bg-[linear-gradient(135deg,#b98f36_0%,#f2d98b_45%,#8c6a1f_100%)]",
    text: "text-[#241c05]",
    sub: "text-[#241c05]/60",
    chip: "bg-[linear-gradient(135deg,#fff3c9,#d8b256,#fff8dd)]",
    strip: "bg-[#3a2d08]",
  },
};

interface FlippableCreditCardProps extends React.HTMLAttributes<HTMLDivElement> {
  cardholderName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  theme?: CardTheme;
  label?: string;
}

const FlippableCreditCard = React.forwardRef<
  HTMLDivElement,
  FlippableCreditCardProps
>(
  (
    {
      className,
      cardholderName,
      cardNumber,
      expiryDate,
      cvv,
      theme = "black",
      label = "PREPAID",
      ...props
    },
    ref,
  ) => {
    const t = THEMES[theme];
    const face = cn(
      "absolute inset-0 flex flex-col justify-between rounded-2xl p-4 [backface-visibility:hidden] shadow-lift",
      t.face,
      t.text,
    );

    return (
      <div
        ref={ref}
        className={cn("group h-full w-full [perspective:1200px]", className)}
        {...props}
      >
        <div className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
          {/* FRONT */}
          <div className={face}>
            <div className="flex items-start justify-between">
              <div className={cn("h-7 w-9 rounded-md", t.chip)} />
              <span className="text-[9px] font-semibold uppercase tracking-[0.2em]">
                {label}
              </span>
            </div>

            <p className="font-mono text-[13px] tracking-[0.14em] sm:text-sm">
              {cardNumber}
            </p>

            <div className="flex items-end justify-between">
              <div className="min-w-0">
                <p className={cn("text-[8px] uppercase tracking-[0.18em]", t.sub)}>
                  Titulaire
                </p>
                <p className="truncate text-[11px] font-medium uppercase">
                  {cardholderName}
                </p>
              </div>
              <div className="text-right">
                <p className={cn("text-[8px] uppercase tracking-[0.18em]", t.sub)}>
                  Expire
                </p>
                <p className="text-[11px] font-medium">{expiryDate}</p>
              </div>
            </div>
          </div>

          {/* BACK */}
          <div className={cn(face, "[transform:rotateY(180deg)]")}>
            <div className={cn("-mx-4 h-8", t.strip)} />
            <div className="flex items-center justify-end gap-2">
              <span className={cn("text-[8px] uppercase tracking-[0.18em]", t.sub)}>
                CVV
              </span>
              <span className="rounded bg-white px-3 py-1 font-mono text-[11px] tracking-widest text-black">
                {cvv}
              </span>
            </div>
            <p className={cn("text-[9px] leading-relaxed", t.sub)}>
              Carte prépayée non nominative — code transmis après validation du
              paiement.
            </p>
          </div>
        </div>
      </div>
    );
  },
);
FlippableCreditCard.displayName = "FlippableCreditCard";

export { FlippableCreditCard };
