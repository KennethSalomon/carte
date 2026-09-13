import * as React from "react";
import { cn } from "@/lib/utils";

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("px-6 py-5", className)} {...props} />;
}

function LiquidCard({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/40 bg-white/45 shadow-soft backdrop-blur-xl",
        "before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(120deg,rgba(255,255,255,0.55),transparent_45%)]",
        className,
      )}
      {...props}
    />
  );
}

export { LiquidCard, CardContent };
