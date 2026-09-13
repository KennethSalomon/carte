import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n";

const IMG = {
  dark: "https://images.unsplash.com/photo-1770975765334-a19d9cb83dcc?auto=format&fit=crop&fm=jpg&q=88&w=1400",
  silver:
    "https://images.unsplash.com/photo-1707581471193-183252f0d85b?auto=format&fit=crop&fm=jpg&q=88&w=1400",
  coral:
    "https://images.unsplash.com/photo-1770975766702-3daf7664cd54?auto=format&fit=crop&fm=jpg&q=88&w=1400",
  folded:
    "https://images.unsplash.com/photo-1770975765382-38dda265ae89?auto=format&fit=crop&fm=jpg&q=88&w=1400",
  green:
    "https://images.unsplash.com/photo-1770975765649-8cab4ed675b3?auto=format&fit=crop&fm=jpg&q=88&w=1400",
  orange:
    "https://images.unsplash.com/photo-1707324148764-99647364afa3?auto=format&fit=crop&fm=jpg&q=88&w=1400",
  laptop:
    "https://images.unsplash.com/photo-1613243555988-441166d4d6fd?auto=format&fit=crop&fm=jpg&q=88&w=1400",
};

type Tile = {
  key: string;
  img: string;
  title: string;
  sub?: string;
  stat?: string;
  tx: string;
  ty: string;
  tr: string;
};

const TILES = {
  a: {
    key: "a",
    img: IMG.coral,
    title: "Cartes physiques & codes",
    sub: "6 formules de 100 € à 1 000 €",
    tx: "-30vw",
    ty: "12vh",
    tr: "-7deg",
  },
  b: {
    key: "b",
    img: IMG.silver,
    title: "Commerçants partenaires",
    stat: "+420",
    tx: "-22vw",
    ty: "-14vh",
    tr: "5deg",
  },
  c: {
    key: "c",
    img: IMG.dark,
    title: "Clients servis depuis 2021",
    stat: "18 400",
    sub: "97,8 % de commandes livrées en moins de 15 minutes",
    tx: "26vw",
    ty: "-16vh",
    tr: "6deg",
  },
  d: {
    key: "d",
    img: IMG.green,
    title: "Vérification anti-fraude",
    sub: "Chaque code est testé avant envoi",
    tx: "12vw",
    ty: "18vh",
    tr: "-5deg",
  },
  e: {
    key: "e",
    img: IMG.laptop,
    title: "Paiement simple",
    sub: "Coupon prépayé en 3 étapes",
    tx: "24vw",
    ty: "10vh",
    tr: "4deg",
  },
  f: {
    key: "f",
    img: IMG.folded,
    title: "Transcash • PCS • Neosurf",
    sub: "Trois moyens de recharge acceptés",
    tx: "-18vw",
    ty: "20vh",
    tr: "6deg",
  },
  g: {
    key: "g",
    img: IMG.orange,
    title: "Montant moyen sécurisé",
    stat: "2,3 M€",
    tx: "20vw",
    ty: "-10vh",
    tr: "-6deg",
  },
} satisfies Record<string, Tile>;

function TileCard({ tile, index }: { tile: Tile; index: number }) {
  const { t } = useI18n();
  return (
    <article
      className="relative min-h-[120px] overflow-hidden rounded-[10px]"
      style={{
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        ...({
          "--tx": tile.tx,
          "--ty": tile.ty,
          "--tr": tile.tr,
        } as React.CSSProperties),
        opacity: 0,
        animation: `k917-tile-in 0.96s cubic-bezier(0.16,1,0.3,1) ${index * 0.055}s forwards`,
      }}
    >
      <img
        src={tile.img}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
      <div className="relative flex h-full flex-col justify-end p-4 text-white sm:p-5">
        {tile.stat && (
          <p className="text-3xl font-medium tracking-[-0.04em] sm:text-4xl">
            {tile.stat}
          </p>
        )}
        <h3 className="text-sm font-semibold sm:text-[15px]">{t(tile.title)}</h3>
        {tile.sub && (
          <p className="mt-1 max-w-[36ch] text-xs leading-relaxed text-white/75">
            {t(tile.sub)}
          </p>
        )}
      </div>
    </article>
  );
}

export function Mosaic() {
  const { t } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);
  const [loop, setLoop] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setActive(true);
          io.disconnect();
        }
      },
      { threshold: 0.23 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!active) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wide = window.matchMedia("(min-width: 1024px)").matches;
    if (reduce || !wide) return;
    const t = window.setTimeout(() => setLoop(true), 1450);
    return () => window.clearTimeout(t);
  }, [active]);

  const anim = (name: string) =>
    loop
      ? { animation: `${name} 7.2s cubic-bezier(0.76,0,0.24,1) infinite` }
      : undefined;

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-ink py-16 text-ink-foreground lg:min-h-[100svh]"
    >
      <div className="container-x">
        <p className="eyebrow text-ink-foreground/55">
          {t("Pourquoi nos clients reviennent")}
        </p>
        <h2 className="display-lg mt-3 max-w-[22ch]">
          {t("Un service de cartes cadeaux pensé pour la confiance.")}
        </h2>
      </div>

      <div className="container-x mt-10">
        {active && (
          <div className="grid gap-[10px] lg:h-[62vh] lg:grid-cols-[28.5%_71.5%]">
            {/* left stack */}
            <div
              className="grid gap-[10px] sm:grid-cols-2 lg:grid-cols-1 lg:grid-rows-[1.14fr_0.86fr]"
              style={anim("k917-rows")}
            >
              <TileCard tile={TILES.a} index={0} />
              <TileCard tile={TILES.b} index={1} />
            </div>

            {/* right column */}
            <div className="grid gap-[10px] lg:grid-rows-[1.1fr_0.95fr_0.95fr]">
              <TileCard tile={TILES.c} index={2} />
              <div
                className="grid gap-[10px] sm:grid-cols-[1.08fr_0.92fr]"
                style={anim("k917-cols-mid")}
              >
                <TileCard tile={TILES.d} index={3} />
                <TileCard tile={TILES.e} index={4} />
              </div>
              <div
                className="grid gap-[10px] sm:grid-cols-[0.82fr_1.18fr]"
                style={anim("k917-cols-bottom")}
              >
                <TileCard tile={TILES.f} index={5} />
                <TileCard tile={TILES.g} index={6} />
              </div>
            </div>
          </div>
        )}
        {!active && <div className="h-[62vh]" />}
      </div>
    </section>
  );
}
