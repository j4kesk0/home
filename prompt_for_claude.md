Tvojou úlohou je upgradnúť tento existujúci React/Next.js 15 portfóliový web na úroveň absolútnej svetovej špičky (S-tier / Awwwards level). Vizuálna identita, farby (light/dark mode) a existujúci obsah sa NESMÚ meniť. Úpravy sa týkajú výhradne výkonu, UX mikro-interakcií a štruktúry.

Implementuj týchto 5 jasných vylepšení:

1. Smooth Scrolling (Hladký Scroll):
Integruj knižnicu Lenis Smooth Scroll (napr. @studio-freight/lenis), aby bol prechod stránkou absolútne plynulý a prémiový. Nastav ju správne pre Next.js 15 App Router.

2. Optimalizácia Výkonu (next/image):
Úplne zruš všetky štandardné <img> tagy v celom projekte (obzvlášť v galérii Vlajkového projektu a profilovke v Hero sekcii). Nahraď ich za Next.js komponent <Image> s nastavenou automatickou kompresiou, WebP formátom, placeholder rozmazaním a prioritou načítavania pre obrázky v prvej obrazovke. Cieľ: Lighthouse 100/100.

3. Social Proof (Referencie):
Vytvor úplne novú sekciu pre recenzie od klientov vo forme dynamického, nekonečného bežiaceho pásu (Infinite Marquee). Musí obsahovať skutočne pôsobiace citáty, mená konzultantov/klientov, ich fotky a prekliky na ich weby.

4. Custom Kurzor & Mikro-interakcie:
Odstráň natívny kurzor a vytvor vlastný globálny kurzor (napr. cez Framer Motion). Tento kurzor musí kontextuálne reagovať na obsah, nad ktorým sa nachádza (napríklad pri prejdení na fotku v galérii sa kurzor zväčší a objaví sa v ňom text „Pozrieť“, nad linkami sa magneticky prisaje).

5. Dedikované Case Studies (Podstránky pre projekty):
Priprav kompletnú routovaciu logiku pre detailné prípadové štúdie. Tlačidlo "Pozrieť živý web" zmeň tak, aby smerovalo na /projekty/radovan-tariska. Vytvor túto novú Next.js dynamic route podstránku, ktorá bude obsahovať kostru pre detailný breakdown projektu: ukážky procesu z Figmy (wireframy), definíciu problému, riešenie, Before/After slider (porovnačku) a ukážky zložitého kódu, ktorý si riešil.

Výstup požadujem vo forme kompletných inštrukcií: od inštalácie npm balíkov až po kompletne prepísané komponenty a novovytvorené súbory, plne rešpektujúce doterajšiu architektúru (Tailwind v4, Framer Motion, Radix/Shadcn UI base).
