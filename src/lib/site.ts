export const SITE = {
  name: "Servicek917officiel",
  shortName: "K917",
  legal: "SERVICE CARTE OFFICIEL",
  phone: "0780948917",
  phoneDisplay: "07 80 94 89 17",
  whatsapp: "33780948917",
  email: "Deyinmelina@gmail.com",
  baseline: "Cartes cadeaux prépayées, livrées en quelques minutes.",
} as const;

export function whatsappLink(message: string) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function mailtoLink(subject: string, body: string) {
  return `mailto:${SITE.email}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
}

export function formatEUR(value: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  }).format(value);
}

/** Référence de commande lisible et stable côté client. */
export function orderReference(total: number, seed = Date.now()) {
  const stamp = Math.abs(seed % 100000)
    .toString()
    .padStart(5, "0");
  return `K917-${String(Math.round(total)).padStart(5, "0")}-${stamp}`;
}
