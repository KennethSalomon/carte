"use client"

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const SQRT_5000 = Math.sqrt(5000);

const testimonials = [
  {
    tempId: 0,
    testimonial: "J'ai envoyé mon code Transcash un dimanche soir, le conseiller m'a répondu en 3 minutes. Mon code était activé avant même que je me couche.",
    by: "Aymeric, 34 ans — Lyon",
    imgSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=96&q=80"
  },
  {
    tempId: 1,
    testimonial: "J'avais un doute sur le plafond de ma carte 500 €. Tout m'a été expliqué clairement avant le paiement. Zéro mauvaise surprise.",
    by: "Nadia, 28 ans — Marseille",
    imgSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=96&q=80"
  },
  {
    tempId: 2,
    testimonial: "Mon premier code avait un souci d'activation. J'ai ouvert un dossier le matin, ils l'ont résolu dans l'après-midi. Sérieux et efficace.",
    by: "Youssef, 41 ans — Toulouse",
    imgSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=96&q=80"
  },
  {
    tempId: 3,
    testimonial: "J'ai commandé une carte 250 € pour mon fils. Code reçu sur WhatsApp en 6 minutes. Il a pu payer en ligne le soir même.",
    by: "Valérie, 52 ans — Bordeaux",
    imgSrc: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=96&q=80"
  },
  {
    tempId: 4,
    testimonial: "Service client hyper réactif. J'ai posé trois questions avant de payer, tout m'a été expliqué en détail. Confiance totale.",
    by: "Karim, 37 ans — Lille",
    imgSrc: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=96&q=80"
  },
  {
    tempId: 5,
    testimonial: "Deuxième commande en deux mois. Cette fois c'était pour un anniversaire, tout était prêt en 10 minutes. Mon fils était ravi.",
    by: "Sophie, 45 ans — Nantes",
    imgSrc: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=96&q=80"
  },
  {
    tempId: 6,
    testimonial: "J'avais peur de me faire arnaquer en ligne. Là c'est clair, les montants sont affichés, le conseiller est joignable. J'ai recommandé à toute ma famille.",
    by: "Thomas, 31 ans — Montpellier",
    imgSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=96&q=80"
  },
  {
    tempId: 7,
    testimonial: "Mon code PCS n'a pas marché au premier essai. J'ai ouvert un dossier, ils l'ont vérifié et renvoyé le bon en 15 minutes.",
    by: "Inès, 26 ans — Strasbourg",
    imgSrc: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=96&q=80"
  },
  {
    tempId: 8,
    testimonial: "La formule 1000 € pour mes achats pro, c'est pratique. Tout est détaillé, je garde une trace pour ma comptabilité.",
    by: "Laurent, 48 ans — Paris",
    imgSrc: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=96&q=80"
  },
  {
    tempId: 9,
    testimonial: "J'ai hésité avant de payer en ligne. Finalement c'est plus simple et rapide que la boutique. Le code arrive direct sur le téléphone.",
    by: "Camille, 29 ans — Rennes",
    imgSrc: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=96&q=80"
  },
  {
    tempId: 10,
    testimonial: "J'ai commandé pour deux personnes à la fois. Les deux codes sont arrivés en même temps, nickel. Le suivi est top.",
    by: "Mohamed, 35 ans — Marseille",
    imgSrc: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=96&q=80"
  },
  {
    tempId: 11,
    testimonial: "Mon conseiller a vérifié mon code Neosurf en direct devant moi sur WhatsApp. Transparence totale, j'étais rassuré.",
    by: "Julie, 39 ans — Dijon",
    imgSrc: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=96&q=80"
  },
  {
    tempId: 12,
    testimonial: "J'avais besoin d'une carte 300 € pour un achat urgent. Tout s'est fait en 8 minutes chrono. Impressionnant.",
    by: "Antoine, 42 ans — Nice",
    imgSrc: "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=96&q=80"
  },
  {
    tempId: 13,
    testimonial: "Ma carte Basique était exactement ce qu'il me fallait. Petit budget, grand service. Je recommande les yeux fermés.",
    by: "Léa, 23 ans — Grenoble",
    imgSrc: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=96&q=80"
  },
  {
    tempId: 14,
    testimonial: "Troisième commande, toujours impeccable. C'est devenu mon réflexe pour les anniversaires. Merci l'équipe !",
    by: "David, 38 ans — Clermont-Ferrand",
    imgSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=96&q=80"
  },
  {
    tempId: 15,
    testimonial: "Je cherchais un moyen rapide d'envoyer du crédit à ma sœur. En 5 minutes elle avait son code. Le WhatsApp c'est la clé.",
    by: "Sarah, 27 ans — Lyon",
    imgSrc: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=96&q=80"
  },
  {
    tempId: 16,
    testimonial: "J'ai testé la formule 150 €. Le plafond correspondait exactement à mon achat. Pas de frais cachés, c'est rafraîchissant.",
    by: "Nicolas, 33 ans — Tours",
    imgSrc: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=96&q=80"
  },
  {
    tempId: 17,
    testimonial: "Mon code avait expiré, j'ai paniqué. Un dossier ouvert, cinq minutes de patience, et tout a été résolu. Merci !",
    by: "Fatima, 44 ans — Perpignan",
    imgSrc: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=96&q=80"
  },
  {
    tempId: 18,
    testimonial: "Ce que j'apprécie le plus, c'est la réactivité. Pas de jours d'attente, pas de chatbot. Un vrai humain qui répond.",
    by: "Julien, 40 ans — Saint-Étienne",
    imgSrc: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=96&q=80"
  },
  {
    tempId: 19,
    testimonial: "J'ai commandé la carte Premium pour Noël. Livraison anticipée, tout était prêt à l'avance. Mes enfants étaient aux anges.",
    by: "Caroline, 50 ans — Amiens",
    imgSrc: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=96&q=80"
  }
];

interface TestimonialCardProps {
  position: number;
  testimonial: typeof testimonials[0];
  handleMove: (steps: number) => void;
  cardSize: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  position, 
  testimonial, 
  handleMove, 
  cardSize 
}) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleMove(position); } }}
      role="button"
      tabIndex={0}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-6 transition-all duration-500 ease-in-out sm:p-8",
        isCenter 
          ? "z-10 bg-primary text-primary-foreground border-primary" 
          : "z-0 bg-card text-card-foreground border-border hover:border-primary/50"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%) 
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter ? "0px 8px 0px 4px hsl(var(--border))" : "0px 0px 0px 0px transparent"
      }}
    >
      <span
        className="absolute block origin-top-right rotate-45 bg-border"
        style={{
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 2
        }}
      />
      <img
        src={testimonial.imgSrc}
        alt={`${testimonial.by.split(',')[0]}`}
        className="mb-4 h-14 w-12 bg-muted object-cover object-top"
        style={{
          boxShadow: "3px 3px 0px hsl(var(--background))"
        }}
      />
      <h3 className={cn(
        "text-sm sm:text-xl font-medium",
        isCenter ? "text-primary-foreground" : "text-foreground"
      )}>
        &laquo;&nbsp;{testimonial.testimonial}&nbsp;&raquo;
      </h3>
      <p className={cn(
        "absolute bottom-6 left-6 right-6 mt-2 text-xs italic sm:bottom-8 sm:left-8 sm:right-8 sm:text-sm",
        isCenter ? "text-primary-foreground/80" : "text-muted-foreground"
      )}>
        &mdash; {testimonial.by}
      </p>
    </div>
  );
};

export const StaggerTestimonials: React.FC = () => {
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] = useState(testimonials);

  const handleMove = (steps: number) => {
    const newList = [...testimonialsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setTestimonialsList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 365 : 290);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden bg-muted/30 min-h-[420px] sm:min-h-[600px]"
    >
      {testimonialsList.map((testimonial, index) => {
        const position = testimonialsList.length % 2
          ? index - (testimonialsList.length + 1) / 2
          : index - testimonialsList.length / 2;
        return (
          <TestimonialCard
            key={testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        <button
          onClick={() => handleMove(-1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-colors",
            "bg-background border-2 border-border hover:bg-primary hover:text-primary-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          )}
          aria-label="Témoignage précédent"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => handleMove(1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-colors",
            "bg-background border-2 border-border hover:bg-primary hover:text-primary-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          )}
          aria-label="Témoignage suivant"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};
