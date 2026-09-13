# Service K917 Official

J ai un nouveau projet différent des précédents : je dois redésigner ou plutot recréé un site web pour un client qui de la vente de cartes cadeaux en ligne : les clients paient par carte bancaire ; ou en alternative peuvent discuter via le numéro WhatsApp de la société (toujours en alternative sur la page de paiement) N oublie d intégré un bon système d ajout au panier avec incrémentation + redirection vers le paiement après finalisation du panier. On part du principe que les clients /vsiteurs savent déjà a peu près aussi ce qu il font ici .Voici l ancien site https://take.app/fr/servicecartesienna/c/cmqge1fm800000dkkb2cs3zs4                                il faut que tu analyses et le srcrapt correctement et avec insistance le site et chaque onglet qu il comporte , pour tout au moins comprendre le projet ; les différentes fonctionnalités et sections à prévoir ; nous devons  remanier le site entier . L objectif est de battire un site qui inspire confiance , une bonne typographies les grands titres placer aux bon endroit , les bons appels à l action ; un bon respect des normes visuel de design des sites pro de paiement virtuel ui/ux . Voici une petite description pour toi et ta prise de connaissance   Le nom du site =Servicek917officiel ; numéro de contact =0780948917 ;  mode de paiement = Paiement : virement bancaire / recharge prépayée  transcash ou PCS . Tout doit etre réalise et casi fonctionnel pour rassurer le client .  Utilise ceci pour gérer le hero de la première page [Create a premium, fullscreen two-section landing page with an animated diagonal card stack in the hero and a continuously resizing mosaic grid in the second section.

Use the project’s existing framework and styling system. It can be implemented with React, Next.js, Vue, HTML/CSS/JavaScript, Tailwind CSS, Framer Motion, GSAP, or an equivalent solution. Keep it responsive, smooth, production-ready, and easy to integrate.

BRAND AND CONTENT

* First inspect the existing project for its brand name, logo, navigation, CTA labels, industry, and written content.
* Automatically adapt the component to the existing project.
* Never force the demonstration brand or banking content into a project 

that already has its own identity.
* If no suitable content exists, use the default brand “Aster.bank” and the default premium banking content described below.
* Keep text, image URLs, navigation items, customer information, and statistics in a simple configuration object or component props.

GENERAL PAGE LAYOUT

* Build two fullscreen sections stacked vertically.
* Both sections must span the complete browser width and at least `100svh`.
* Do not place the website inside an inset canvas.
* Do not add an outer border, gray surround, browser mockup, device frame, large page margin, or preview container.
* Prevent horizontal overflow.
* Use warm off-white `#fbfbf9` for the hero and near-black `#0e0e0e` for the mosaic section.
* Use large, premium, Gen-Z editorial typography.
* Load Instrument Sans with this URL:

`https://fonts.googleapis.com/css2?family=Instrument+Sans:wdth,wght@75..100,400..700&display=swap`

SECTION 1 — FULLSCREEN ANIMATED HERO

Navigation:

* Place a compact geometric symbol logo and brand name in the upper-left.
* Construct the symbol from four thin lines rotated into an asterisk-like mark.
* Place a simple navigation link and black pill-shaped CTA in the upper-right.
* Position the navigation approximately `4.2vw` from both horizontal edges and `24–54px` from the top.
* Use readable medium-weight typography rather than tiny navigation text.

Hero typography:

* Position the main copy around `5.2vw` from the left and approximately `30.5vh` from the top.

* Keep the content width near `52vw`, with a suitable maximum width on large screens.

* Add a small stacked up-and-down arrow symbol above the eyebrow.

* Add a small uppercase eyebrow with wide letter spacing.

* Use an oversized two-line headline.

* Default headline:

  * “Aster.bank”
  * “Professional bank card”

* Scale the heading responsively between approximately `54px` and `106px`.

* Use a regular-to-medium weight around `430`.

* Use a tight `0.86` line height and strong negative letter spacing around `-0.07em`.

* The words must look large, close, fashionable, and editorial—not small or zoomed out.

* Add a clearly readable description below the heading at approximately `14–18px` with a `1.5` line height.

* Add a black rounded primary button and a “Discover ↗” text link underneath.

* Keep all subtitles, descriptions, labels, buttons, and supporting text large enough to read easily.

Headline scramble animation:

* Initially replace the headline characters with animated letters, numbers, or symbols.
* Resolve both headline lines progressively from left to right.
* Begin the scramble approximately `210ms` after mount.
* Complete it in approximately `880–900ms`.
* Reveal the complete copy group with opacity, blur reduction, and a subtle movement from `-34px` horizontally and `22px` vertically.
* Use premium easing similar to `cubic-bezier(0.16, 1, 0.3, 1)`.
* Do not create a harsh bounce.

DIAGONAL CARD ENTRANCE

Place four large landscape cards in the upper-right portion of the hero.

* The card stage should occupy roughly `70vw × 56vh`.
* Allow the card stage to begin slightly above the viewport.
* Arrange the four cards diagonally from the upper-middle toward the lower-right.
* Each card should overlap the card beneath it.
* Give the cards small rounded corners and a soft realistic shadow.
* Add a small brand signature near the lower-right corner of every card.
* Keep the cards large and visually close to the viewer.

Entrance sequence:

* Each card begins outside the right side of the viewport.
* Start with increased scale, diagonal displacement, rotation, opacity `0`, and `15–20px` blur.
* Animate to opacity `1`, blur `0`, scale `1`, and the final rotation.
* Use `cubic-bezier(0.16, 1, 0.3, 1)`.
* Stagger the cards so they enter at approximately `0.02s`, `0.25s`, `0.48s`, and `0.72s`.
* Use durations between approximately `1.06s` and `1.22s`.
* Final card rotations should be approximately `5.5deg`, `8deg`, `9deg`, and `9.5deg`.
* The cards should flow into place smoothly rather than simply fading in.

Hero card images:

* Coral card:
  `https://images.unsplash.com/photo-1770975766702-3daf7664cd54?auto=format&fit=crop&fm=jpg&q=88&w=1800`

* Green card:
  `https://images.unsplash.com/photo-1770975765649-8cab4ed675b3?auto=format&fit=crop&fm=jpg&q=88&w=1800`

* Dark mixed card:
  `https://images.unsplash.com/photo-1770975765334-a19d9cb83dcc?auto=format&fit=crop&fm=jpg&q=88&w=1800`

* Orange card:
  `https://images.unsplash.com/photo-1707324148764-99647364afa3?auto=format&fit=crop&fm=jpg&q=88&w=1800`

Use `object-fit: cover` and preload the important hero images.

DECORATIVE VERTICAL WORD

* Add a very pale oversized vertical word near the right edge.
* Use “Business” as the fallback word.
* Apply vertical writing mode.
* Use approximately `58–132px` typography.
* Keep the color extremely subtle, such as `#ededeb`.
* Animate it in with a soft horizontal movement and opacity transition.
* Hide it on small mobile screens.

MOVING PARTNER WORDS

Add a continuously moving partner-name ticker near the bottom-left.

* The visible ticker must begin just after the “Discover ↗” link.
* Do not anchor it at the far-left edge.
* It must never move underneath or behind the primary button.
* Use a starting position close to `left: clamp(300px, 19.6vw, 390px)`.
* Keep the ticker approximately `7.5vh` from the bottom.
* Example labels: “ramp ↗,” “HER,” “▲ Vercel,” “⌁ descript,” and “▣ Cash App.”
* Replace these labels with project-relevant partners when available.
* Duplicate the sequence so the loop has no visible restart.
* Move the track continuously from `translateX(-50%)` to `translateX(0)`.
* Use a linear duration of approximately `6.2s`.
* Keep the words muted gray, medium-bold, evenly spaced, and approximately `12–16px`.
* Add a soft mask fade on the ticker’s left and right edges.
* Hide the ticker on narrow mobile screens if it cannot fit cleanly.

CUSTOMER ACTIVITY PILLS

Place a group of four compact rounded customer pills in the lower-right.

* Use a two-column arrangement.
* Each pill contains a circular avatar, customer name, and amount or short secondary label.
* Use a very light gray background for the first three pills.
* Use a soft green background for the final pill.
* Do not include an orange award badge or separate orange container.
* Animate the pills into view one after another.
* Start with blur, opacity `0`, a slight right/down movement, and scale around `0.78`.
* Briefly overshoot to approximately `1.025`, then settle to scale `1`.
* Stagger them around `0.98s`, `1.08s`, `1.18s`, and `1.28s`.

Avatar images:

* `https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=96&q=80`
* `https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=96&q=80`
* `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=96&q=80`
* `https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=96&q=80`

SCROLL TRANSITION

* Allow the user to scroll naturally into section two.
* For presentation-style playback, begin a smooth automatic scroll approximately `3.5s` after the hero loads.
* Use a duration of about `1.02s` with smooth cubic easing.
* Immediately cancel automatic scrolling if the user uses the mouse wheel, keyboard, touchscreen, or scrollbar.
* Disable automatic scrolling when reduced motion is enabled.
* Never trap the user or force the page back to a section.

SECTION 2 — DARK ANIMATED MOSAIC

Create a fullscreen section with a `#0e0e0e` background.

* Add a light version of the same navigation at the top.
* Position the mosaic below the navigation, approximately `15.5vh` from the top.
* Keep approximately `4.2vw` horizontal page spacing.
* Use narrow gaps around `7–14px`.
* Give every tile matching rounded corners around `7–14px`.
* The grid should feel dense, asymmetric, cinematic, and precisely aligned.

Desktop grid structure:

* Divide the grid into a narrow left column and wide right column using approximately `28.5% / 71.5%`.
* The left column contains two vertically stacked cards.
* The right column contains three horizontal bands.
* The top band contains one large statistics card.
* The middle band contains two cards.
* The bottom band contains two cards.
* Create seven tiles in total.

Suggested tile content:

1. Credit-card feature
2. Companies-trusted statistic
3. Large customer-statistics card
4. AI banking feature
5. Easy-payment feature
6. Payment-method feature
7. Investment statistic

Keep all tiles aligned edge-to-edge. Do not place an awkward gray inset card inside the credit-card tile. The tile should use one clean, full-bleed image or background consistent with the surrounding mosaic.

MOSAIC ASSEMBLY ANIMATION

Trigger the entrance when approximately `23%` of section two is visible.

* Each tile starts at approximately `scale(0.12)`.
* Give every tile a different horizontal offset, vertical offset, and slight rotation.
* Start with opacity `0` and blur around `12px`.
* Animate each tile into its grid position over approximately `0.96s`.
* Stagger the tiles by roughly `0.05–0.06s`.
* At around 72% progress, let each tile overshoot to approximately `scale(1.055)`.
* Settle every tile back to `scale(1)`.
* Reduce blur to zero during the entrance.
* Play the assembly sequence once.

CONTINUOUS RESIZING GRID LOOP

After the initial assembly, continuously animate the real grid dimensions.

This must not be a simple scale animation. Animate `grid-template-rows` and `grid-template-columns` so neighboring cards physically give space to each other without leaving empty gaps.

Use a repeating cycle of approximately `7.2s` with smooth easing similar to `cubic-bezier(0.76, 0, 0.24, 1)`.

Begin the loop approximately `1.45s` after the mosaic activates.

Left stack:

* Default rows: `1.14fr 0.86fr`.
* Transition to `0.48fr 1.52fr`.
* The upper card shrinks while the lower card becomes larger.
* Later return smoothly to the original proportions.

Middle stack:

* Default columns: `1.08fr 0.92fr`.
* Transition to `0.78fr 1.22fr`.
* The left card shrinks while the right card enlarges.
* Return smoothly.

Bottom stack:

* Default columns: `0.82fr 1.18fr`.
* Transition to `1.28fr 0.72fr`.
* The left card enlarges while the right card shrinks.
* Return smoothly.

Timing pattern:

* Hold the default state from approximately `0–18%`.
* Transition into the alternate state by approximately `43%`.
* Hold it until approximately `68%`.
* Return to the default proportions by approximately `92%`.
* Repeat seamlessly.
* The animation should feel like focus is being handed from one card to another.
* Avoid snapping, clipping, misalignment, empty grid areas, or detached-looking cards.

Mosaic images:

* Full-bleed dark card:
  `https://images.unsplash.com/photo-1770975765334-a19d9cb83dcc?auto=format&fit=crop&fm=jpg&q=88&w=1800`

* Silver card:
  `https://images.unsplash.com/photo-1707581471193-183252f0d85b?auto=format&fit=crop&fm=jpg&q=88&w=1800`

* Coral material:
  `https://images.unsplash.com/photo-1770975766702-3daf7664cd54?auto=format&fit=crop&fm=jpg&q=88&w=1800`

* Folded material:
  `https://images.unsplash.com/photo-1770975765382-38dda265ae89?auto=format&fit=crop&fm=jpg&q=88&w=1800`

* Green material:
  `https://images.unsplash.com/photo-1770975765649-8cab4ed675b3?auto=format&fit=crop&fm=jpg&q=88&w=1800`

* Orange material:
  `https://images.unsplash.com/photo-1707324148764-99647364afa3?auto=format&fit=crop&fm=jpg&q=88&w=1800`

* Optional payment/laptop image:
  `https://images.unsplash.com/photo-1613243555988-441166d4d6fd?auto=format&fit=crop&fm=jpg&q=88&w=1800`

RESPONSIVE BEHAVIOR

* On mobile, increase the hero height enough to avoid overlaps.
* Move the card composition above the hero copy.
* Place the copy below the cards with approximately `25px` side padding.
* Keep the mobile headline around `46–64px`.
* Preserve readable subtitle and description sizing.
* Stack the mosaic into a balanced single-column composition.
* Allow the first two mosaic tiles to sit side-by-side where space permits.
* Disable the continuous grid resizing loop on mobile when it would harm alignment.
* Hide the partner ticker and vertical decorative word on narrow screens.
* Never allow accidental horizontal scrolling.

ACCESSIBILITY AND PERFORMANCE

* Use semantic sections, navigation, headings, articles, and links.
* Ensure buttons and links remain keyboard accessible.
* Respect `prefers-reduced-motion`.
* With reduced motion enabled, immediately show the final hero and mosaic layouts and disable continuous resizing.
* Use GPU-friendly transforms, opacity, and filters for entrance animations.
* Use real grid dimension animation only for the mosaic’s focus-handoff effect.
* Avoid unnecessary rerenders and layout shifts.
* Ensure all text remains readable over images with controlled dark overlays.
* The final result must look premium, bold, fluid, fullscreen, and intentionally zoomed-in.]                                                                                                                                                                                                                                                                                                                                                                  ; utilise ceci pour la page de traitement de dossier (pour les mise en attente , lorsqu un client veut opérer une demande/requête à la société      [Build a React + Vite + Tailwind CSS landing page for "Axion Studio" - a design agency site. Use the `shaders` package (npm: `shaders`) for the hero background, `lucide-react` for icons. The page has 3 sections. Match every detail exactly:

---

SECTION 1: HERO (Full viewport height)

Background: Light gray `#EFEFEF` with a full-screen animated shader overlay (positioned absolute, inset-0, z-10, pointer-events-none). The shader stack uses components from `shaders/react`:

- `Swirl` - colorA: `#ffffff`, colorB: `#f0f0f0`, detail: 1.7

- `ChromaFlow` - baseColor: `#ffffff`, downColor/leftColor/rightColor/upColor: `#ff5f03`, momentum: 13, radius: 3.5

- `FlutedGlass` - aberration: 0.61, angle: 31, frequency: 8, highlight: 0.12, highlightSoftness: 0, lightAngle: -90, refraction: 4, shape: "rounded", softness: 1, speed: 0.15

- `FilmGrain` - strength: 0.05

Navigation (z-20, relative): A pill-shaped white navbar (`bg-white rounded-full`) with 5px padding, inside a max-w-[1440px] container with p-2 sm:p-3.

- LEFT: Dark circle logo (w-9 h-9 sm:w-10 sm:h-10, bg-gray-900, rounded-full) with white text "AX" (10px/11px, font-bold, tracking-tight). Next to it (hidden on mobile, shown md+): nav links "Projects", "Studio", "Journal", "Connect" - 14px, text-gray-900, hover:text-gray-500, transition-colors duration-300, gap-6.

- RIGHT (hidden on mobile, shown md+): 

  - Text "Taking on projects for Q1 2026" (13px, text-gray-600, hidden below lg)

  - Clock icon (lucide, size 14) + live London time "{HH:MM} in London" (13px, text-gray-600)

  - CTA button: bg-gray-900, text-white, 13px font-medium, rounded-full, pl-5 pr-2 py-2. Text "Book a strategy call" with a HOVER TEXT ROLL animation: the text is duplicated inside a flex-col container with overflow-hidden h-[20px], on group-hover it translates -50% vertically (duration-500, ease cubic-bezier(0.25,0.1,0.25,1)). Arrow icon in a white circle (w-6 h-6) that rotates -45deg on hover (same easing).

- MOBILE: A "Menu"/"Close" toggle button (md:hidden), bg-gray-900, rounded-full, with Menu/X icons from lucide-react.

Mobile Menu Overlay: Fixed inset-0, z-50. Black/60 backdrop. A white bottom sheet (rounded-2xl, mx-3 mb-3) that slides up (translate-y-full to translate-y-0, duration-500, ease cubic-bezier(0.32,0.72,0,1)). Contains: time badge, nav links (28px/32px font-medium), and a "Start a project" button with arrow.

Hero Content (z-20): Positioned at the bottom of the viewport using flexbox (flex-1 spacer above). Max-w-[1440px], px-5 sm:px-8 lg:px-12, pb-14 sm:pb-16 lg:pb-20.

- Small label: "Axion Studio" (13px/14px, text-gray-900, tracking-wide, mb-5 sm:mb-8)

- Headline h1: "We craft digital experiences / for brands ready to dominate / their category online." - clamp(1.75rem,7vw,4.2rem) on mobile, clamp(2.5rem,5vw,4.2rem) on sm+. font-medium, leading-[1.08], tracking-[-0.03em], text-gray-900. Line breaks hidden on mobile (uses `
` with ` ` fallback spaces).

- CTA row (mt-8 sm:mt-12, flex-col sm:flex-row, gap-4 sm:gap-5):

  - Orange button: bg-[#F26522], hover:bg-[#e05a1a], text-white, 13px/14px, rounded-full, pl-5 sm:pl-6 pr-2 py-2. Same text-roll hover animation for "Start a project". White circle (w-7 h-7 sm:w-8 sm:h-8) with orange ArrowRight that rotates -45deg on hover.

  - Partner badge: White pill with subtle shadow (0_2px_8px_rgba(0,0,0,0.08)), hover shadow (0_4px_16px_rgba(0,0,0,0.12)), rounded-[4px]. Contains an inline SVG icon (the starburst/compass shape below, w-5 h-5 sm:w-6 sm:h-6, fill-current text-[#E8704E]), text "Certified Partner" (13px/14px font-medium), and a dark badge "Featured" (10px/11px, bg-gray-900, text-white, px-1.5 sm:px-2 py-0.5, rounded).

SVG Icon for partner badge:

```svg



```

---

SECTION 2: ABOUT (White background)

`bg-white`, pt-16 sm:pt-20 lg:pt-32, pb-12 sm:pb-16 lg:pb-24, overflow-hidden. Max-w-[1440px] container.

Badge row: px-5 sm:px-8 lg:px-12, flex items-center gap-3, mb-6 sm:mb-8.

- Numbered circle: w-6 h-6 sm:w-7 sm:h-7, rounded-full, bg-gray-900, text-white, 11px/12px font-semibold. Shows "1".

- Pill label: "Introducing Axion" - 12px/13px, font-medium, border border-gray-200, rounded-full, px-3 sm:px-4 py-1 sm:py-1.5.

Heading h2: "Strategy-led creatives, delivering / results in digital and beyond." - clamp(1.5rem,4vw,3.2rem), font-medium, leading-[1.12], tracking-[-0.02em], text-gray-900, mb-12 sm:mb-16 lg:mb-28.

Content area (responsive):

- MOBILE/TABLET (lg:hidden): Stacked - paragraph + button, then images.

  - Paragraph: "Through research, creative thinking and iteration we help growing brands realize their digital full potential." - 15px/17px, leading-[1.6], font-medium, text-gray-900.

  - Button: "About our studio" - orange (#F26522), same text-roll animation, white arrow circle rotates -45deg.

  - Two images: flex-col sm:flex-row, gap-4 sm:gap-5. First: sm:w-[45%] aspect-[438/346]. Second: sm:w-[55%] aspect-[900/600]. Both rounded-xl sm:rounded-2xl, object-cover.

- DESKTOP (hidden lg:grid): `grid-cols-[26%_1fr_48%] items-end gap-6 xl:gap-8`.

  - Left column (self-end): Small image, aspect-[438/346], rounded-2xl.

  - Center column (self-start, flex justify-end): Paragraph (16px/18px, leading-[1.65], whitespace-nowrap, with `
` between lines) + orange button.

  - Right column (self-end): Large image, aspect-[3/2], rounded-2xl.

Image URLs:

- Small image: `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260516_090123_74be96d4-9c1b-40cf-932a-96f4f4babed3.png&w=1280&q=85`

- Large image: `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260516_090133_c157d30b-a99a-4477-bec1-a446149ec3f2.png&w=1280&q=85`

---

SECTION 3: CASE STUDIES (Light gray background)

`bg-[#F5F5F5]`, pt-16 sm:pt-20 lg:pt-28, pb-16 sm:pb-20 lg:pb-28. Max-w-[1440px] container.

Badge row: Same pattern as Section 2, but number is "2", label is "Featured client work", border-gray-300.

Heading h2: "Our projects" - same clamp sizing as hero headline (clamp(1.75rem,7vw,4.2rem) / clamp(2.5rem,5vw,4.2rem)), font-medium, leading-[1.08], tracking-[-0.03em], mb-10 sm:mb-14 lg:mb-16.

Cards Grid: `grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-7`, px-5 sm:px-8 lg:px-12.

Card 1 (Narrativ):

- Video container: aspect-[329/246], rounded-2xl, overflow-hidden, bg-[#1a1d2e], group, cursor-pointer.

- Video: `src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260516_122702_390f5305-8719-41d5-ae80-d23ab3796c28.mp4"`, autoPlay, muted, loop, playsInline, w-full h-full object-cover.

- Hover button (absolute bottom-4 left-4): A white circle (h-9 w-9) that expands to w-[148px] on group-hover (transition-all duration-300 ease-in-out). Contains "Learn more" text (13px, font-medium, opacity-0 to opacity-100 on hover with delay-100) and a link/chain SVG icon (14x14, -rotate-45 to rotate-0 on hover). The SVG is the lucide "link" icon drawn manually with two arc paths.

- Description: "Winner of Site of the Month 2025 - an interactive 3D showcase driving record engagement" - 13px/14px, text-gray-600, mt-4, leading-relaxed.

- Title: "Narrativ" - 14px/15px, font-semibold, text-gray-900, mt-1.

Card 2 (Luminar):

- Video container: aspect-square, rounded-2xl, overflow-hidden, bg-[#6b6b6b], group, cursor-pointer.

- Video: `src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260516_123323_f909c2b8-ff6c-4edf-882b-8ebcdbe389b5.mp4"`, autoPlay, muted, loop, playsInline, w-full h-full object-cover.

- Hover button (absolute bottom-4 left-4): A DARK circle (bg-gray-900, h-9 w-9) that expands to w-[168px] on group-hover. Contains "View case study" text (13px, font-medium, text-white) and a white ArrowRight icon (size 14) that transitions from -rotate-45 to rotate-0 on hover.

- Description: "Transforming a dated platform into a conversion-focused brand experience" - 13px/14px, text-gray-600, mt-4, leading-relaxed.

- Title: "Luminar" - 14px/15px, font-semibold, text-gray-900, mt-1.

---

GLOBAL STYLES (index.css):

Standard Tailwind directives plus two utility classes (not actively used in current layout but defined):

- `.liquid-glass`: rgba(255,255,255,0.01) bg, backdrop-filter blur(4px), inset box-shadow, pseudo-element gradient border using mask-composite.

- `.liquid-glass-strong`: Same but blur(50px), no pseudo-element.

---

TECHNICAL DETAILS:

- Framework: React 18 + TypeScript + Vite

- Styling: Tailwind CSS 3.4 (default config, no custom theme extensions)

- Packages: `shaders` (for Shader, ChromaFlow, FilmGrain, FlutedGlass, Swirl from `shaders/react`), `lucide-react` (ArrowRight, Clock, Menu, X)

- Font: System default (no custom font loaded)

- All animations use: `duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]` unless noted otherwise

- Max content width: 1440px, centered with mx-auto

- Responsive breakpoints: Default Tailwind (sm: 640px, md: 768px, lg: 1024px, xl: 1280px)

- Live clock: Updates every second, shows London timezone in HH:MM format] afin de mieux traiter les retours des clients donc il y aura un formulaire à remplir pour envoyer son petit mot sur le whatsapp direct de l entreprise  + un petit message de confirmation après envoie du message .                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              ;  utilise cette animation dans la partie paiement par carte bancaire ; une fois le panier teriminé ou lorsqu on clique sur un article pour l acheter [You are given a task to integrate an existing React component in the codebase

The codebase should support:
- shadcn project structure  
- Tailwind CSS
- Typescript

If it doesn't, provide instructions on how to setup project via shadcn CLI, install Tailwind or Typescript.

Determine the default path for components and styles. 
If default path for components is not /components/ui, provide instructions on why it's important to create this folder
Copy-paste this component to /components/ui folder:
```tsx
credit-card-form.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";

type CardState = {
  number: string;     // raw digits (no spaces)
  holder: string;     // uppercase
  month: string;      // "01".."12" or ""
  year: string;       // "2025".."2034" or ""
  cvv: string;        // up to 4
};

type CardValidity = {
  number: boolean; // passes Luhn & length >= 13
  holder: boolean; // >= 2 chars
  month: boolean;  // 01..12
  year: boolean;   // >= current year
  cvv: boolean;    // 3-4 digits
  allValid: boolean;
};

type Props = {
  /** Prefill values (optional) */
  defaultNumber?: string;
  defaultHolder?: string;
  defaultMonth?: string; // "01".."12"
  defaultYear?: string;  // "2025"
  defaultCVV?: string;

  /** Mask digits 5..12 with * on the card front */
  maskMiddle?: boolean;

  /** Override gradient accent rings (front/back :before/:after) */
  ring1?: string; // e.g. "#ff6be7"
  ring2?: string; // e.g. "#7288ff"

  /** Show a submit button */
  showSubmit?: boolean;
  /** Live change callback */
  onChange?: (state: CardState, validity: CardValidity) => void;
  /** Submit callback */
  onSubmit?: (state: CardState, validity: CardValidity) => void;

  /** Class for wrapping container */
  className?: string;
};


function formatNumberSpaces(num: string): string {
  return num.replace(/\s+/g, "").replace(/(\d{4})(?=\d)/g, "$1 ");
}

function clampDigits(value: string, maxLen: number) {
  return value.replace(/\D/g, "").slice(0, maxLen);
}

const CreditCardForm = ({
  defaultNumber = "",
  defaultHolder = "",
  defaultMonth = "",
  defaultYear = "",
  defaultCVV = "",
  maskMiddle = true,
  ring1 = "#ff6be7",
  ring2 = "#7288ff",
  showSubmit = true,
  onChange,
  onSubmit,
  className = "",
}: Props) => {
  const [number, setNumber] = useState(clampDigits(defaultNumber, 19));
  const [holder, setHolder] = useState(defaultHolder.toUpperCase());
  const [month, setMonth] = useState(defaultMonth);
  const [year, setYear] = useState(defaultYear);
  const [cvv, setCVV] = useState(clampDigits(defaultCVV, 4));
  const [focusField, setFocusField] = useState(null);

  const flip = focusField === "cvv";
  const years = useMemo(() => {
    const start = new Date().getFullYear();
    return Array.from({ length: 10 }, (_, i) => String(start + i));
  }, []);

  // Validation
  const validity: CardValidity = useMemo(() => {
    const nValidLength = number.length >= 13; // allow 13..19
    const numberValid = nValidLength;
    const holderValid = holder.trim().length >= 2;
    const monthValid = !!month && +month >= 1 && +month <= 12;
    const yearValid = !!year && +year >= new Date().getFullYear();
    const cvvValid = /^\d{3,4}$/.test(cvv);
    return {
      number: numberValid,
      holder: holderValid,
      month: monthValid,
      year: yearValid,
      cvv: cvvValid,
      allValid: numberValid && holderValid && monthValid && yearValid && cvvValid,
    };
  }, [number, holder, month, year, cvv]);

  // Notify parent on change
  useEffect(() => {
    onChange?.({ number, holder, month, year, cvv }, validity);
  }, [number, holder, month, year, cvv, validity, onChange]);

  // Build 16+ slots for display (we’ll show up to 16; visual)
  const displayDigits = useMemo(() => number.slice(0, 16).split(""), [number]);

  const displayedSlots = useMemo(() => {
    const arr: { textTop: string; filed: boolean }[] = [];
    for (let i = 0; i < 16; i++) {
      let content = "#";
      if (i < displayDigits.length) {
        const d = displayDigits[i];
        const shouldMask = maskMiddle && i >= 4 && i <= 11;
        content = shouldMask ? "*" : d;
      }
      arr.push({ textTop: content, filed: i < displayDigits.length });
    }
    return arr;
  }, [displayDigits, maskMiddle]);

  const highlightClass = (() => {
    switch (focusField) {
      case "number":
        return "highlight__number";
      case "holder":
        return "highlight__holder";
      case "expire":
        return "highlight__expire";
      case "cvv":
        return "highlight__cvv";
      default:
        return "hidden";
    }
  })();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({ number, holder, month, year, cvv }, validity);
  };

  return (
    


      


        {/* CARD */}
        


          



          {/* FRONT */}
          


            


              

CreditCard


              
                
                
                
                
              
            



            {/* Number slots with slide animation */}
          


            {displayedSlots.map((slot, idx) => (
              
                
                  #
                  {slot.textTop}
                
              
            ))}
           



            


              


                

Card Holder


                

{holder || "NAME ON CARD"}


              


              


                

Expires


                {month || "MM"}/
                {year ? year.slice(-2) : "YY"}
              


            


          



          {/* BACK */}
          


            


            


              CVV
              


                {"*".repeat(cvv.length)}
              


            


          


        



        {/* FORM */}
        


          


            Card Number
             setNumber(clampDigits(e.target.value, 19))}
              onFocus={() => setFocusField("number")}
              onBlur={() => setFocusField(null)}
              aria-invalid={!validity.number}
            />
            {!validity.number && number.length >= 13 && (
              Card number looks invalid
            )}
          



          


            Card Holder
             setHolder(e.target.value.toUpperCase())}
              onFocus={() => setFocusField("holder")}
              onBlur={() => setFocusField(null)}
              aria-invalid={!validity.holder}
            />
          



          


            


              Expiration Date
              


                 setMonth(e.target.value)}
                  onFocus={() => setFocusField("expire")}
                  onBlur={() => setFocusField(null)}
                  aria-invalid={!validity.month}
                >
                  
                    Month
                  
                  {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0")).map((m) => (
                    
                      {m}
                    
                  ))}
                
                 setYear(e.target.value)}
                  onFocus={() => setFocusField("expire")}
                  onBlur={() => setFocusField(null)}
                  aria-invalid={!validity.year}
                >
                  
                    Year
                  
                  {years.map((y) => (
                    
                      {y}
                    
                  ))}
                
              


            



            


              CVV
               setCVV(clampDigits(e.target.value, 4))}
                onFocus={() => setFocusField("cvv")}
                onBlur={() => setFocusField(null)}
                aria-invalid={!validity.cvv}
              />
            


          



          {showSubmit && (
            
              {validity.allValid ? "Submit" : "Complete all fields"}
            
          )}
        


      



      

@media (max-width: 920px) {
          .wrap {
            grid-template-columns: 1fr;
          }
        }

        * {
          box-sizing: border-box;
        }

        #highlight {
          position: absolute;
          border: 1px solid #fff;
          border-radius: 12px;
          z-index: 1;
          width: 0;
          height: 0;
          top: 0;
          left: 0;
          box-shadow: 0 0 5px #fff;
          transition: 0.3s;
        }
        #highlight.highlight__number {
          width: 346px;
          height: 40px;
          top: 92px;
          left: 18px;
        }
        #highlight.highlight__holder {
          width: 264px;
          height: 56px;
          top: 156px;
          left: 18px;
        }
        #highlight.highlight__expire {
          width: 86px;
          height: 56px;
          top: 156px;
          left: 323px;
        }
        #highlight.highlight__cvv {
          width: 381px;
          height: 91px;
          top: 83px;
          left: 18px;
        }
        #highlight.hidden {
          display: none;
        }

        .card {
          position: relative;
          width: 100%;
          max-width: 420px;
          margin: 0 auto;
          transform-style: preserve-3d;
          transition: 0.8s;
          perspective: 1000px;
        }
        .card.flip {
          transform: rotateY(180deg);
        }

        .card__front,
        .card__back {
          width: 100%;
          max-width: 420px;
          height: 233px;
          border-radius: 20px;
          padding: 24px 30px 30px;
          background: linear-gradient(to right bottom, #323941, #061018);
          box-shadow: 0 33px 50px -15px rgba(50, 55, 63, 0.66);
          color: #fff;
          overflow: hidden;
          margin: 0 auto;
          backface-visibility: hidden;
          position: relative;
        }

        @media (max-width: 450px) {
          .card__front,
          .card__back {
            padding: 12px 14px 16px;
            height: 206px;
          }
          /* shrink highlight boxes for small screens */
          #highlight.highlight__number {
            width: 300px;
            left: 14px;
          }
          #highlight.highlight__holder {
            width: 220px;
            left: 14px;
          }
          #highlight.highlight__expire {
            left: 280px;
          }
          #highlight.highlight__cvv {
            width: 330px;
            left: 14px;
          }
        }

        .card__back {
          position: absolute;
          top: 0;
          left: 0;
          transform: rotateY(180deg);
          padding: 24px 0 0;
        }

        .card__front::before,
        .card__back::before {
          content: "";
          position: absolute;
          border: 16px solid var(--ring1, ${ring1});
          border-radius: 100%;
          left: -17%;
          top: -45px;
          height: 300px;
          width: 300px;
          filter: blur(13px);
        }

        .card__front::after,
        .card__back::after {
          content: "";
          position: absolute;
          border: 16px solid var(--ring2, ${ring2});
          border-radius: 100%;
          width: 300px;
          top: 55%;
          left: -200px;
          height: 300px;
          filter: blur(13px);
        }

        .card__hide_line {
          height: 40px;
          width: 100%;
          background-color: #6b7280;
          position: relative;
          z-index: 1;
        }

        .card_cvv {
          position: relative;
          z-index: 1;
          margin-top: 24px;
          padding: 0 32px;
          display: flex;
          flex-direction: column;
          align-items: end;
          font-size: 14px;
          font-weight: 600;
          text-transform: uppercase;
        }
        .card_cvv_field {
          margin-top: 6px;
          background-color: #fff;
          border-radius: 12px;
          height: 44px;
          width: 100%;
          color: #000;
          display: flex;
          align-items: center;
          justify-content: end;
          padding: 0 12px;
          font-size: 25px;
          line-height: 21px;
        }

        .card__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-weight: 600;
          margin-bottom: 32px;
          position: relative;
          z-index: 1;
        }

        .card__number {
          font-size: 22px;
          margin-bottom: 32px;
          position: relative;
          z-index: 1;
          display: flex;
          height: 33px;         
          overflow: hidden;
          color: #fff;
        }

        .card__number .slot {
          display: inline-flex;
          margin-right: 0;
        }

        .card__number .slot:nth-child(4n) {
          margin-right: 10px;    /* group spacing */
        }

        .card__number .digit {
          display: flex;
          flex-direction: column;
          height: 33px;          /* one row height */
          line-height: 33px;
          transition: transform 0.2s;
        }

        .card__number .digit.filed {
          transform: translateY(-33px); /* slide to reveal the value row */
        }

        .card__number .row {
          height: 33px;
          display: block;
        }

        .card__footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          z-index: 1;
        }
        .card__holder {
          text-transform: uppercase;
        }
        .card__section__title {
          font-size: 14px;
          font-weight: 600;
          text-transform: uppercase;
        }

        .form {
          border-radius: 12px;
          background: #fff;
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
          padding: 24px;
          border: 1px solid #f1f1f1;
          box-shadow: 0 0 40px rgba(50, 55, 63, 0.16);
          display: grid;
          gap: 12px;
          color: #0d0c22;
        }

        label {
          display: block;
          margin: 6px 0 4px;
          color: #0d0c22;
          font-weight: 500;
        }

        input,
        select {
          height: 52px;
          display: block;
          width: 100%;
          border: 1px solid #6b7280;
          padding: 18px 20px;
          transition: outline 200ms ease, box-shadow 200ms ease;
          border-radius: 12px;
          outline: none;
          background-color: #fff;
          color: #0d0c22;
          font-size: 16px;
        }

        input:focus,
        select:focus {
          border: 1px solid #000;
          outline: 4px solid rgba(0, 0, 0, 0.1);
        }

        select {
          padding: 0 20px;
        }

        .filed__group {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 24px;
        }

        @media (max-width: 560px) {
          .filed__group {
            grid-template-columns: 1fr;
          }
        }

        .filed__date {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .err {
          color: #b42318;
          font-size: 12px;
          margin-top: 4px;
        }

        .submit {
          margin-top: 8px;
          height: 48px;
          border: none;
          border-radius: 10px;
          background: #0d0c22;
          color: #fff;
          font-weight: 600;
          cursor: pointer;
          opacity: ${validity.allValid ? 1 : 0.6};
        }
      `}</style>
    </section>
  );
};

export { CreditCardForm };
export type { CardState, CardValidity };


demo.tsx
import { CreditCardForm, type CardState, type CardValidity }  from "@/components/ui/credit-card-form";

export default function DemoOne() {
  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
      <CreditCardForm
        defaultHolder="Rahil Vahora"
        maskMiddle
        onChange={(state: CardState, validity: CardValidity) => {
          // live form output here (analytics, preview, etc.)
          // console.log("live", state, validity);
        }}
        onSubmit={(state, validity) => {
          // send to your API
          alert(JSON.stringify({ state, validity }, null, 2));
        }}
      />
    </main>
  )
}

```

Implementation Guidelines
 1. Analyze the component structure and identify all required dependencies
 2. Review the component's argumens and state
 3. Identify any required context providers or hooks and install them
 4. Questions to Ask
 - What data/props will be passed to this component?
 - Are there any specific state management requirements?
 - Are there any required assets (images, icons, etc.)?
 - What is the expected responsive behavior?
 - What is the best place to use this component in the app?

Steps to integrate
 0. Copy paste all the code above in the correct directories
 1. Install external dependencies
 2. Fill image assets with Unsplash stock images you know exist
 3. Use lucide-react icons for svgs or logos if component requires them
] et après validation de  l achat, une mini fenettre s ouvre doucement + temps de l attence d affichage avant de dire que le paiement a été validé . Ne permet pas la validations  des caractères qui n ont rien avoir avec les informations de comptes/cartes bancaires ...Que le site entier logique et responsive offrant une belle expérience utilisateur .

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
