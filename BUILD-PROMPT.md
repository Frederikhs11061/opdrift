# OPDRIFT — detaljeret byggeprompt

## Opgave og selvstændighed

Byg et selvstændigt dansk browserspil med titlen **OPDRIFT** og sloganet **Tænk smalt. Flyv højt.** Spillet skal have egen kode, identitet, grafik og kurateret svarbank. Det må ikke integreres med, arve styling fra eller ændre Konvertio. Det skal kunne startes separat uden konto, eksterne tjenester, API-nøgler eller byggeproces. Publicering er en særskilt opgave.

## Research og mekanik

Undersøg først Krillion på https://krillion.io og den officielle FAQ på https://krillion.io/faq. Krillion giver åbne kategorispørgsmål og belønner et sjældent, korrekt svar. Den officielle FAQ beskriver kuraterede svarmængder samt sjældenhed baseret på ordfrekvens, LLM-assistance og manuel vurdering afhængigt af spørgsmålet. Påstå derfor ikke, at sjældenheden nødvendigvis er en direkte aflæsning af dagens spilleres svar.

Undersøg også stigende alternativer. Spaceillion (https://spaceillion.com; præsentation fra skaberen: https://www.indiexpo.net/en/games/spaceillion) og Cosmillion (https://cosmillion.com/) bruger allerede rumraketter. OPDRIFT vælger i stedet en luftballon, der løftes gennem niveauer. Tag kun mekanisk inspiration; kopier ikke deres spørgsmål, billedfiler, kode eller branding.

## Spillerens forløb

1. En dansksproget startskærm forklarer idéen med en kort tekst, et eksempel og en tydelig startknap. Eksempel: Æble giver 10 point; Jabuticaba giver 100.
2. Spilleren vælger **Dagens flyvetur** eller **Fri flyvning**. Den daglige tur er identisk for alle på samme danske dato. Fri flyvning blander 20 kategorier tilfældigt og er ubegrænset.
3. Hver tur har præcis **20 åbne spørgsmål** og **20 sekunder pr. spørgsmål**. Vis et tydeligt svarfelt, en nedtælling, tidsbjælke og en spring-over-knap. Understøt tyve progressionsmarkører, og vis slutresultatets tyve søjler i to rækker på ti. Enter indsender svaret.
4. Et afvist svar må prøves igen, mens tiden løber. Et tomt svar indsendes ikke. Spring over og udløbet tid giver 0 point.
5. Små entydige stavefejl accepteres automatisk. Normaliser store/små bogstaver, diakritiske tegn, tegnsætning og danske bogstaver. Understøt indsat/slettet/udskiftet bogstav og ombyttede nabobogstaver. Tolerér op til to fejl i lange ord. Symboler og ultrakorte svar kræver præcis match. Ved flertydighed skal spilleren bekræfte et forslag, mens tiden fortsætter. Vis automatisk rettede input efter flyvningen.
6. Et accepteret svar skal **fjerne hele spørgsmålsvisningen** og starte en særskilt animation, der fylder skærmen. Man ser kun ballonens opstigning og universet og det aktuelle sjældenhedsniveau. Ingen svarfelter, spørgsmål, menuer eller footer må forstyrre denne sekvens.
7. Ballonen fortsætter fra sidste højde, og kameraet følger den op gennem et rigtigt illustreret univers: Jorden, atmosfæren, satellitter, planeter og galakser. Land og skyer bevæger sig nedad, så det føles som opstigning. Ingen vandrette niveaustreger. Vis kort de opnåede sjældenhedsniveauer undervejs. Et legendarisk svar flyver længere end et begyndersvar. GSAP driver en sammenhængende bevægelse med langsom nedbremsning; cirka 4–6 sekunder afhængigt af point.
8. Niveauerne er **Begynder (+10), Øvet (+15), Mid (+30), Rare (+60), Ultra rare (+85), Legendarisk (+100)**. Niveauet gælder det aktuelle svar; den samlede flyvehøjde vises separat. Ved 0 point vises en kort forklaring uden et falsk løft.
9. Først efter ballonen er stoppet, afsløres svaret, dets niveau, point og eventuel automatisk rettelse. Spilleren kan herefter gå direkte videre til næste spørgsmål. Det næste spørgsmål må ikke starte sin nedtælling under flyvesekvensen.
10. Efter tyvende spørgsmål vises den samlede højde, point ud af 2.000, et diagram over de 20 svar, udfoldelig svaroversigt, en kopiér-resultat-knap og adgang til fri flyvning. **1 point = 10 meter**, maksimalt 20.000 meter.

## Indhold og retfærdighed

Skriv selv en dansk svarbank med mange gyldige svar og danske/engelske aliaser. Brug emner som frugt, fugle, instrumenter, europæiske hovedstæder, grundstoffer, sport, krydderier, pattedyr, blomster, danske øer, ost, træer, pasta og sprog. Præcisér kategoriens afgrænsninger i spørgsmålet. Kontroller alle 118 grundstoffer og deres symboler.

Giv svarene faste redaktionelle point. Ordets længde alene må aldrig afgøre sjældenhed. Et opdigtet ord må ikke belønnes for at være sjældent. Flere korrekte svar kan være legendariske. Vis åbent, at point er kuraterede vurderinger, og at et korrekt svar kan mangle i banken. Påstå ikke at kende en spillerpercentil, andre spilleres frekvenser eller en global rangliste uden et faktisk datagrundlag.

## Visuelt design — revideret efter brugerens valg

Spillet skal ligne et spil, ikke en landingsside. Universet fylder hele browseren fra første billede. På startskærmen står OPDRIFT som en stor, karakterfuld spiltitel med en tydelig startknap. Ballonfiguren lever i landskabet. Ingen marketing-sektioner, tre-trins featurekort eller split-hero.

Brug et originalt illustreret spilunivers, hvor et skovklædt bjerglandskab med et lille observatorium nederst fortsætter op gennem gyldne skyer, blå atmosfære, satellitter, planeter og fjerne galakser. Hold en farbar midte fri til den animerede spilfigur. Brug to separate billedlag: universet og en transparent luftballon med en lille opdagelsesrejsende. Billederne skabes med det indbyggede billedværktøj og gemmes i projektet. Bevar promps og proveniens.

Spilkontrollerne er varme, tydelige og konkrete: amberfarvede knapper, cremefarvet svarfelt og et mørkt blågrønt svarpanel. Brug lokalt hostet Lilita One til spiloverskrifter og Nunito Sans til kontroltekst. Alle betydningsbærende små tekster er mindst 11 px. Tegn enkle ikoner som sammenhængende SVG-ikoner.

Mens der svares, vises kun ét kompakt svarpanel nederst og de faktiske spiloplysninger ved kanterne. Under flyvningen forsvinder hele panelet og menuerne. Kameraet flytter universet nedad, så man fortsætter op fra samme position. En ankomstbesked viser først svaret efter nedbremsningen. Næste spørgsmål starter først ved tryk på knappen.

## Teknik og tilgængelighed

Brug HTML, CSS og JavaScript-moduler med GSAP som lokal projektafhængighed. En lille Node-server er nok til lokal start. Brug billedlag og transform-animation frem for WebGL. Animationen skal have én ejer pr. egenskab og afmeldes ved navigation. Reduceret bevægelse skal forkorte flyvesekvensen og fjerne løbende bevægelse. Vis fortsat tydeligt, hvilket niveau svaret nåede.

Gem aktuelle ture, completed status, lydvalg og lokal flyvebog i localStorage. Genskab et åbent spørgsmåls reelle sluttid efter reload og faneskift; en genindlæsning må ikke give nye sekunder. Gem højst de seneste 365 ture. Tilføj en svarbank med 22 emner og 44 almindelige kategorispørgsmål uden bogstavkrav. Gem en rotationsliste, prioritér uspurgte spørgsmål og udeluk alle spørgsmål fra den seneste tur. Brug højst ét spørgsmål fra samme emne i én tur. En tur skal have 20 spørgsmål. Hvis lagring er blokeret, skal spillet fortsætte med en ærlig besked om manglende persistens. Kopiér resultatet med Clipboard API og en manuel tekstfallback.

Brug semantiske knapper, navngivne felter, synlig tastaturfokus, modal med Escape-lukning og statusmeddelelser. Klip ikke indhold på smalle skærme. Lyd er frivillig og starter slukket. Send ikke spillerinput til en tredjepart.

## Acceptkriterier og levering

- En fuld 20-spørgsmåls-tur kan gennemføres med tastatur.
- Alle spørgsmål starter med 20 sekunder; timeren tåler reload og skjulte faner.
- Et almindeligt og et legendarisk svar giver tydeligt forskellig flyvelængde og stopper ved korrekt niveau.
- Spørgsmål og svarfelt er skjult under hele opstigningen.
- En mindre stavefejl accepteres og rettes automatisk uden ekstra bekræftelse, når match er entydigt.
- Alle svar og aliaser matcher samme pointniveau; ingen overlappende aliaser har modstridende point.
- Daglig udvælgelse er deterministisk og skifter ved midnat i Europe/Copenhagen.
- Deling viser score og symboler uden at afsløre svarene.
- Dokumentér lokal start, begrænsninger, researchkilder og test. Lever dette byggeprompt sammen med det færdige selvstændige projekt.

## Seneste bevægelseskrav

Vis alle seks svarniveauer i en tydelig lodret stige i siden under hele flyvningen. Legendarisk står øverst og Begynder nederst. Fremhæv passerede niveauer og lad markøren stige i takt med svarets point; det opnåede niveau skal forblive markeret ved ankomst. På mobil flyttes ballonen mod højre for at skabe plads til stigen.

Rejsen skal være meget længere og rigere på omgivelser: 48 skærmhøjder samlet, så et legendarisk svar på 100 point flytter kameraet 2,4 skærmhøjder. Otte områder indeholder Jorden, svævende øer, asteroidebælter, isplaneter, ildkløfter, stjernetåger og galakseportaler. Brug fem store baggrundsillustrationer med bløde overlap. Kun synlige og nærliggende billedlag skal indlæses og vises. Bevar separate skyer og den rolige slutopbremsning. De 20 spørgsmål og 20 sekunder pr. svar bevares.

## Spørgsmålsform

Brug kun almindelige emne- og kategorispørgsmål. Ingen krav om, hvilke bogstaver svaret skal begynde med, indeholde eller undgå, og ingen krav til ordlængde. Eksempler: »Nævn en frugt«, »Nævn en vandfugl« og »Nævn en dansk by«. Gemte ture med gamle bogstavkrav skal få de almindelige kategorispørgsmål uden at miste point eller fremdrift.
