# OPDRIFT

Et selvstændigt dansk trivia-eventyr fra Jorden til galakserne. Ingen forbindelse til Konvertio.

## Start lokalt

Kræver Node.js 20 eller nyere.

```sh
npm ci
npm start
```

Åbn http://127.0.0.1:4173. Hvis afhængighederne allerede er installeret, er `npm start` nok. Skift port med `PORT=4174 npm start`. Serveren lytter kun på denne computer. Til lokal udvikling bruges kun `dev-server.mjs`.

## Udgiv på Vercel

```sh
npm ci
npm run build
```

Bygningen opretter `dist/` med den komplette statiske side, billeder, skrifter og de nødvendige GSAP-browsermoduler i `vendor/gsap/`. Ingen serverfunktion er nødvendig.

`vercel.json` sætter Framework Preset til **Other**, Build Command til `npm run build`, Install Command til `npm ci` og Output Directory til `dist`. Konfigurationen følger repoet, så Vercel ikke forsøger at eksekvere browserkode som en Node-server. Browserens indgang hedder `game.js`; den lokale udviklingsserver hedder `dev-server.mjs`.

## Spillet

- **20 spørgsmål pr. tur, 20 sekunder pr. svar.**
- Begynder 10, Øvet 15, Mid 30, Rare 60, Ultra rare 85, Legendarisk 100 point.
- Korrekte svar starter en flyvning gennem det illustrerede univers. Kameraet følger opstigningen og bremser gradvist. Spørgsmål og menuer er skjult under flyvningen.
- Alle seks svarniveauer er synlige i siden under opstigningen og fremhæves, når de passeres.
- Rejsen er cirka 12 gange længere visuelt: et 100-point-svar flyver 2,4 skærmhøjder gennem en rute med otte områder og fem store landskabsillustrationer.
- Ballonen fortsætter fra sin sidste position. Universet strækker sig fra bjerglandskab og skyer til satellitter, planeter og galakser.
- Små entydige stavefejl rettes og accepteres automatisk. Flertydige match kræver en bekræftelse.
- 1 point er 10 spilmeter. Maksimum er 2.000 point / 20.000 meter.
- 44 almindelige emnespørgsmål fordelt på 22 kategorier og 1.521 kuraterede svar med aliaser. Spørgsmålene har ingen bogstavkrav.
- Daglig tur deles af alle på samme danske dato. Fri flyvning holder styr på tidligere spørgsmål og undgår alle spørgsmål fra den seneste tur.
- Timer, aktive ture, afsluttede ture og lydvalg gemmes lokalt. Et åbent spørgsmåls tid fortsætter i baggrunden og efter reload.

## Filer

`BUILD-PROMPT.md` indeholder den detaljerede byggeprompt og research. `data.js` og `bank.js` indeholder svar og rotationslogik. `engine.js` har validering og score. `game.js` har spilforløbet. `world.js` har GSAP-kameraet. `assets/` indeholder original genereret spilgrafik og lokale skrifter.

## Motion og design

| Område | Værktøj | Effekt og formål |
| --- | --- | --- |
| Univers og ballon | Originale billedlag | En sammenhængende verden, der fylder skærmen |
| Flyvning | GSAP | Ét kamera, længere rejse ved sjældne svar og rolig nedbremsning |
| Kontroller | CSS | Kort respons på tryk, fokus og status |
| Reduceret bevægelse | Medieforespørgsel | Kort overgang med samme svar, point og ankomst |

Impeccable kan installeres projektlokalt med `npx impeccable install`. Installerede designværktøjer og lokale gennemgange er ikke versioneret; designkontekst og billedprompts følger med. Spillet har ingen scrollstyrede sektioner; Lenis og ScrollTrigger er derfor ikke en del af spillet. React Bits og Magic UI er React-komponenter; spillet bruger sin eksisterende selvstændige modulstruktur.

## Kontrol

```sh
npm test
```

Testene kontrollerer også produktionsbygningens modulstier, medfølgende grafik og fravær af serverkode i udgivelsen. Derudover dækkes alle svar og aliaser, automatisk stavekorrektion, tvetydige match, den præcise timer, dansk midnat, daglig udvælgelse, point, alle grundstoffer og spørgsmålsrotation over mange ture. Visuelle kontrolbilleder og lokale gennemgange gemmes i `.impeccable/review/` og er ikke versioneret.

Der indsamles ingen telemetri. Core Web Vitals er ikke målt som feltdata. Grafik genbruges som syv billedaktiver; aktive animationer bruger transform. Ingen WebGL, eksterne fontopslag eller serverkald ved indsendelse.

## Begrænsninger

Sjældenhed er redaktionelle vurderinger, ikke svarfrekvenser fra andre spillere. Et korrekt svar kan mangle i banken. Kategorier og spørgsmål kan vende tilbage over længere tids brug; to ture i træk gentager ikke spørgsmål. Der er ingen konto, global rangliste, multiplayer eller AI-dommer. Højde og rummets afstande er spilmetaforer. Lokal lagring er ikke sikring mod snyd.

## Research og billedproveniens

- [Krillions officielle FAQ](https://krillion.io/faq): kuratering, sjældenhed og aliaser.
- [Spaceillion](https://www.indiexpo.net/en/games/spaceillion) og [Cosmillion](https://cosmillion.com/): stigende varianter af sjældne-svar-mekanikken.
- [Impeccable](https://impeccable.style/): designværktøjer.

Undersøgt 30. oktober 2026. OPDRIFT har egen kode, svarbank, grafik og identitet og er ikke tilknyttet de nævnte spil. `assets/universe.png`, `assets/balloon.png`, `assets/clouds-v2.png`, `assets/islands.png`, `assets/orbit.png`, `assets/ice.png` og `assets/rift.png` er skabt med det indbyggede billedværktøj; deres fulde prompts er indlejret i PNG-metadata og gemt i `.impeccable/asset-prompts/`. Skrifterne er Lilita One og Nunito Sans fra Google Fonts.
