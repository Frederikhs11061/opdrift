// Original, Danish-first answer bank. Fixed editorial scores, not live player frequencies.
export const q = (id, category, prompt, rule, groups) => ({ id, category, prompt, rule,
  answers: Object.entries(groups).flatMap(([points, words]) => words.split('|').map(entry => {
    const [word, ...aliases] = entry.split('/'); return { word, aliases, points: Number(points) };
  }))
});
export const QUESTIONS = [
  q('fruit', 'Den spiselige verden', 'Nævn en frugt.', 'Frugter og bær, som normalt spises som frugt. Ikke grøntsager.', {
    10: 'Æble/apple|Banan/banana|Appelsin/orange|Pære/pear|Jordbær/strawberry|Vindrue/grape|Citron/lemon',
    15: 'Ananas/pineapple|Mango|Kiwi|Vandmelon/watermelon|Hindbær/raspberry|Blåbær/blueberry|Kirsebær/cherry',
    30: 'Blomme/plum|Fersken/peach|Nektarin/nectarine|Abrikos/apricot|Lime|Grapefrugt/grapefruit|Solbær/blackcurrant|Brombær/blackberry|Klementin/clementine|Mandarin|Melon|Tranebær/cranberry',
    60: 'Granatæble/pomegranate|Figen/fig|Daddel/date|Passionsfrugt/passionfruit|Papaya|Litchi/lychee|Guava|Stikkelsbær/gooseberry|Ribs/redcurrant|Kvæde/quince|Kokosnød/coconut|Dragefrugt/pitaya/dragonfruit|Avocado',
    85: 'Rambutan|Durian|Jackfrugt/jackfruit|Kaki/persimmon|Stjernefrugt/carambola|Kumquat|Mangostan/mangosteen|Pomelo|Physalis/ananasjordbær|Multebær/cloudberry|Mispel/medlar|Tyttebær/lingonberry|Havtorn/sea buckthorn|Feijoa',
    100: 'Jabuticaba|Salak/slangefrugt|Cherimoya|Sapodille/sapodilla|Acerola|Langsat|Buddhas hånd/buddhas hand|Atemoya|Surkirsebær/sour cherry|Yuzu|Naranjilla|Mirakelbær/miracle fruit'
  }),
  q('birds', 'Fjer & flyvehøjde', 'Nævn en fugl.', 'En fugleart eller almindeligt fuglenavn. Også fugle, der ikke kan flyve.', {
    10: 'Due/pigeon|Måge/gull/seagull|And/duck|Ørn/eagle|Høne/chicken|Papegøje/parrot|Ugle/owl',
    15: 'Flamingo|Pingvin/penguin|Struds/ostrich|Påfugl/peacock|Tukan/toucan',
    30: 'Solsort/blackbird|Gråspurv/sparrow|Rødhals/robin|Svane/swan|Gås/goose|Krage/crow|Ravn/raven|Stork/stork|Falk/falcon|Spætte/woodpecker|Svale/swallow|Musvit/great tit|Skade/magpie|Kanariefugl/canary|Undulat/budgerigar/budgie',
    60: 'Isfugl/kingfisher|Søpapegøje/puffin|Kolibri/hummingbird|Albatros/albatross|Havørn/white tailed eagle|Blåmejse/blue tit|Vibe/lapwing|Fiskehejre/grey heron|Rørhøg/marsh harrier|Nattergal/nightingale|Sanglærke/skylark|Pelikan/pelican|Kondor/condor|Emu|Kivi/kiwi',
    85: 'Hærfugl/hoopoe|Biæder/bee eater|Vendehals/wryneck|Silkehale/waxwing|Klyde/avocet|Skestork/spoonbill|Rørdrum/bittern|Lunde/atlantic puffin|Sortspætte/black woodpecker|Havterne/arctic tern|Pragtfregat/magnificent frigatebird|Kasuar/cassowary|Kakapo',
    100: 'Træskonæb/shoebill|Hoatzin|Quetzal|Oliehulefugl/oilbird|Kagu|Næsehornsfugl/hornbill|Stortrappe/great bustard|Ellekrage/european roller|Steppeørn/steppe eagle|Hvidrygget spætte/white backed woodpecker'
  }),
  q('instruments', 'Noget med lyd', 'Nævn et musikinstrument.', 'Et instrument, man kan spille på. Instrumentfamilier som strygere tæller ikke.', {
    10: 'Guitar|Klaver/piano|Trommer/drums|Violin|Fløjte/flute|Trompet/trumpet',
    15: 'Ukulele|Saxofon/saxophone|Harpe/harp|Harmonika/accordion',
    30: 'Cello|Bas/bass/elbas|Klarinet/clarinet|Orgel/organ|Mundharmonika/harmonica|Banjo|Bongotromme/bongo|Tamburin/tambourine|Keyboard|Triangel/triangle|Blokfløjte/recorder|Kontrabas/double bass',
    60: 'Obo/oboe|Fagot/bassoon|Valdhorn/french horn|Tuba|Trækbasun/trombone/basun|Bratsch/viola|Mandolin|Marimba|Xylofon/xylophone|Sækkepibe/bagpipes|Cembalo/harpsichord|Vibrafon/vibraphone|Sitar|Lut/lute|Djembe',
    85: 'Theremin|Didgeridoo|Kalimba|Balalajka/balalaika|Dulcimer|Bouzouki|Okarina/ocarina|Nyckelharpa|Hakkebræt|Bandoneon|Erhu|Koto|Hang/handpan|Glockenspiel/klokkespil|Lira/drejelire/hurdy gurdy',
    100: 'Ondes Martenot|Glasharmonika/glass harmonica|Serpent|Shakuhachi|Duduk|Hardangerfele|Crwth|Otamatone|Hydraulofon/hydraulophone|Kontrabasfagot/contrabassoon|Sheng|Tromba marina'
  }),
  q('capitals', 'Et sted på kloden', 'Nævn en europæisk hovedstad.', 'Hovedstæder i Europa, inklusive Cypern, transkontinentale lande og Kaukasus. Ikke delstater.', {
    10: 'Paris|London|Rom/Rome|Berlin|København/Copenhagen|Madrid',
    15: 'Stockholm|Oslo|Amsterdam|Athen/Athens',
    30: 'Helsinki|Lissabon/Lisbon|Wien/Vienna|Prag/Prague|Warszawa/Warsaw|Dublin|Bruxelles/Brussels|Budapest|Reykjavik/Reykjavík|Bern',
    60: 'Tallinn|Riga|Vilnius|Zagreb|Ljubljana|Bratislava|Bukarest/Bucharest|Sofia|Beograd/Belgrade|Kiev/Kyiv|Moskva/Moscow|Luxembourg/Luxembourg by|Nicosia',
    85: 'Sarajevo|Tirana|Skopje|Chișinău/Chisinau|Minsk|Podgorica|Valletta|Ankara|Tbilisi',
    100: 'Vaduz|Andorra la Vella|San Marino|Vatikanstaten/Vatican City|Monaco|Astana|Baku|Jerevan/Yerevan'
  }),
  q('elements', 'Små byggesten', 'Nævn et grundstof.', 'Et officielt grundstof i det periodiske system. Både navn og kemisk symbol accepteres.', {
    10: 'Ilt/oxygen/O|Brint/hydrogen/H|Guld/gold/Au|Jern/iron/Fe|Sølv/silver/Ag|Kulstof/carbon/C',
    15: 'Helium/He|Uran/uranium/U|Plutonium/Pu|Kviksølv/mercury/Hg|Kobber/copper/Cu',
    30: 'Kvælstof/nitrogen/N|Aluminium/Al|Calcium/Ca|Natrium/sodium/Na|Klor/chlorine/Cl|Magnesium/Mg|Zink/zinc/Zn|Neon/Ne|Kalium/potassium/K|Svovl/sulfur/S|Silicium/silicon/Si|Fosfor/phosphorus/P|Bly/lead/Pb|Tin/Sn',
    60: 'Argon/Ar|Lithium/Li|Brom/Br|Jod/iodine/I|Titan/titanium/Ti|Nikkel/nickel/Ni|Kobolt/cobalt/Co|Krom/chromium/Cr|Wolfram/tungsten/W|Platin/platinum/Pt|Barium/Ba|Radon/Rn|Radium/Ra|Fluor/fluorine/F|Mangan/manganese/Mn|Bor/boron/B',
    85: 'Cadmium/Cd|Xenon/Xe|Krypton/Kr|Selen/selenium/Se|Arsen/arsenic/As|Antimon/antimony/Sb|Beryllium/Be|Vanadium/V|Molybdæn/molybdenum/Mo|Palladium/Pd|Strontium/Sr|Cæsium/caesium/cesium/Cs|Rubidium/Rb|Gallium/Ga|Germanium/Ge|Indium/In|Thallium/Tl|Bismuth/Bi|Polonium/Po|Thorium/Th|Osmium/Os|Iridium/Ir|Rhodium/Rh|Ruthenium/Ru|Zirkonium/zirconium/Zr|Scandium/Sc|Yttrium/Y|Niobium/Nb|Technetium/Tc|Tellur/tellurium/Te',
    100: 'Hafnium/Hf|Tantal/tantalum/Ta|Rhenium/Re|Astat/astatine/At|Francium/Fr|Actinium/Ac|Protactinium/Pa|Neptunium/Np|Americium/Am|Curium/Cm|Berkelium/Bk|Californium/Cf|Einsteinium/Es|Fermium/Fm|Mendelevium/Md|Nobelium/No|Lawrencium/Lr|Rutherfordium/Rf|Dubnium/Db|Seaborgium/Sg|Bohrium/Bh|Hassium/Hs|Meitnerium/Mt|Darmstadtium/Ds|Røntgenium/roentgenium/Rg|Copernicium/Cn|Nihonium/Nh|Flerovium/Fl|Moscovium/Mc|Livermorium/Lv|Tennessin/tennessine/Ts|Oganesson/Og|Lanthan/lanthanum/La|Cerium/Ce|Praseodym/praseodymium/Pr|Neodym/neodymium/Nd|Promethium/Pm|Samarium/Sm|Europium/Eu|Gadolinium/Gd|Terbium/Tb|Dysprosium/Dy|Holmium/Ho|Erbium/Er|Thulium/Tm|Ytterbium/Yb|Lutetium/Lu'
  }),
  q('sports', 'Puls & præcision', 'Nævn en sportsgren.', 'En etableret fysisk sportsgren. Både hold- og individuelle sportsgrene tæller.', {
    10: 'Fodbold/football/soccer|Håndbold/handball|Tennis|Basketball|Svømning/swimming|Golf|Løb/running',
    15: 'Badminton|Bordtennis/table tennis|Volleyball|Cykling/cycling|Boksning/boxing',
    30: 'Ishockey/ice hockey|Hockey|Rugby|Cricket|Baseball|Atletik/athletics|Gymnastik/gymnastics|Ridning/equestrian|Sejlads/sailing|Skiløb/skiing|Snowboard/snowboarding|Surfing|Bowling|Padel|Skateboarding|Triatlon/triathlon|Fægtning/fencing|Judo|Karate',
    60: 'Curling|Lacrosse|Squash|Vandpolo/water polo|Bueskydning/archery|Roning/rowing|Kajak/kayaking|Taekwondo|Brydning/wrestling|Klatring/climbing|Kunstskøjteløb/figure skating|Skiskydning/biathlon|Softball|Netball|Ultimate/ultimate frisbee|Diskgolf/disc golf|Kitesurfing|Windsurfing|Amerikansk fodbold/american football',
    85: 'Bandy|Pelota|Petanque/pétanque|Futsal|Sepak takraw|Kabaddi|Hurling|Roller derby|Krocket/croquet|Snooker|Skeleton|Bobslæde/bobsleigh|Stangspring/pole vault|Moderne femkamp/modern pentathlon|Shorttrack/short track|Orienteringsløb/orienteering',
    100: 'Bossaball|Underwater rugby/undervandsrugby|Fistball/faustball|Hornussen|Pesäpallo/pesapallo|Fierljeppen|Korfball|Tchoukball|Buzkashi|Teqball|Tamburello|Cestoball'
  }),
  q('spices', 'Smag på verden', 'Nævn et krydderi eller en krydderurt.', 'En plantebaseret ingrediens, der bruges som krydderi. Salt tæller ikke.', {
    10: 'Peber/black pepper/sort peber|Kanel/cinnamon|Paprika|Basilikum/basil|Oregano|Chili',
    15: 'Karry/curry|Timian/thyme|Rosmarin/rosemary|Koriander/coriander|Ingefær/ginger',
    30: 'Persille/parsley|Dild/dill|Purløg/chives|Mynte/mint|Muskatnød/nutmeg|Nellike/clove|Kardemomme/cardamom|Spidskommen/cumin|Gurkemeje/turmeric|Laurbær/bay leaf|Vanilje/vanilla|Hvidløg/garlic|Salvie/sage|Estragon/tarragon',
    60: 'Safran/saffron|Stjerneanis/star anise|Anis/anise|Fennikel/fennel|Allehånde/allspice|Kommen/caraway|Enebær/juniper|Citronmelisse/lemon balm|Kørvel/chervil|Løvstikke/lovage|Merian/marjoram|Sennepsfrø/mustard seed|Bukkehorn/fenugreek|Citrongræs/lemongrass',
    85: 'Sumak/sumac|Nigellafrø/nigella/jomfru i det grønne|Galanga/galangal|Sichuanpeber/szechuan pepper|Asafoetida/dyvelsdræk|Tonka/tonkabønne|Ramsløg/wild garlic|Isop/hyssop|Sommersar/summer savory|Kaffirlime/makrut lime|Za’atar/zaatar|Lang peber/long pepper',
    100: 'Grains of paradise/paradiskorn|Mahleb/mahlab|Timutpeber/timut pepper|Voatsiperifery|Ajwain|Epazote|Mastiks/mastic|Annatto|Bibernelle/burnet|Myrte/myrtle'
  }),
  q('mammals', 'På fire ben. Måske.', 'Nævn et pattedyr.', 'En nulevende art eller almindelig betegnelse for et pattedyr. Mennesker tæller også.', {
    10: 'Hund/dog|Kat/cat|Hest/horse|Ko/cow|Løve/lion|Elefant/elephant|Tiger|Abe/monkey|Mus/mouse',
    15: 'Delfin/dolphin|Flagermus/bat|Hval/whale|Panda|Giraf/giraffe|Kænguru/kangaroo',
    30: 'Bjørn/bear|Ulv/wolf|Ræv/fox|Hare|Kanin/rabbit|Hjort/deer|Elg/moose|Zebra|Næsehorn/rhinoceros|Flodhest/hippopotamus|Gorilla|Chimpanse/chimpanzee|Egern/squirrel|Pindsvin/hedgehog|Gris/pig|Får/sheep|Ged/goat|Sæl/seal|Odder/otter|Menneske/human',
    60: 'Næbdyr/platypus|Bæver/beaver|Grævling/badger|Dovendyr/sloth|Surikat/meerkat|Okapi|Tapir|Gepard/cheetah|Leopard|Bison|Lemur|Orangutang/orangutan|Kamel/camel|Alpaka/alpaca|Lama/llama|Vaskebjørn/raccoon|Puma/cougar|Spækhugger/orca|Hvalros/walrus|Muldvarp/mole|Koala',
    85: 'Skældyr/pangolin|Jordsvin/aardvark|Kapivar/capybara|Vombat/wombat|Narhval/narwhal|Dugong|Binturong|Saiga|Moskushjort/musk deer|Desmerdyr/civet|Fossa|Mankeulv/maned wolf|Myresluger/anteater|Spidsmus/shrew|Nøgenrotte/naked mole rat|Potto|Gibbon',
    100: 'Solenodon|Fingerdyr/aye aye|Tenrek/tenrec|Zebraducker/zebra duiker|Stribet ilder/zorilla|Saola|Springhare/springhaas|Sunda flyvelemur/colugo|Stjernemuldvarp/star nosed mole|Pungmuldvarp/marsupial mole|Chiru|Hirola'
  }),
  q('flowers', 'Noget der blomstrer', 'Nævn en blomst.', 'En blomstrende plante, man almindeligvis omtaler som en blomst.', {
    10: 'Rose|Tulipan/tulip|Solsikke/sunflower|Marguerit/daisy|Orkidé/orchid',
    15: 'Lilje/lily|Lavendel/lavender|Mælkebøtte/dandelion|Valmue/poppy|Påskelilje/daffodil',
    30: 'Anemone|Vintergæk/snowdrop|Erantis/winter aconite|Krokus/crocus|Hyacint/hyacinth|Hortensia/hydrangea|Pæon/peony|Nellike/carnation|Viol/violet|Stedmoderblomst/pansy|Geranium|Pelargonie/pelargonium|Dahlia/georgine|Iris|Krysantemum/chrysanthemum',
    60: 'Fuchsia|Fresia/freesia|Lupin/lupine|Ridderspore/delphinium|Fingerbøl/foxglove|Kornblomst/cornflower|Klokkeblomst/bellflower|Primula|Stokrose/hollyhock|Akeleje/columbine|Zinnia|Petunia|Cosmos/stolt kavaler|Løvemund/snapdragon',
    85: 'Vibeæg/snakes head fritillary|Julerose/hellebore|Løjtnantshjerte/bleeding heart|Scabiosa/skabiose|Eustoma/lisianthus|Ranunkel/ranunculus|Astilbe|Agapanthus/skærmlilje|Strelitzia/paradisfugl|Protea|Edelweiss|Kæmpejernurt/verbena',
    100: 'Chokoladeblomst/chocolate cosmos|Passionsblomst/passiflora|Trompetblomst/campsis|Tudselilje/tricyrtis|Nigella/jomfru i det grønne|Rafflesia|Gloriosa|Nerine|Meconopsis/blå valmue|Tacca/flagermusblomst'
  }),
  q('cheese', 'Sig appelsin', 'Nævn en ost.', 'En navngiven ostetype. Mærker og retter med ost tæller ikke.', {
    10: 'Cheddar|Brie|Gouda|Mozzarella|Feta|Parmesan/parmigiano reggiano',
    15: 'Camembert|Gorgonzola|Danbo|Havarti|Emmentaler/emmental',
    30: 'Roquefort|Gruyère/gruyere|Edam|Manchego|Ricotta|Mascarpone|Halloumi|Hytteost/cottage cheese|Burrata|Danablu|Esrom|Port salut|Rødkitost|Flødeost/cream cheese',
    60: 'Pecorino|Taleggio|Stilton|Comté/comte|Reblochon|Morbier|Vesterhavsost|Samsø/samsøost|Maribo|Fontina|Provolone|Scamorza|Paneer|Asiago|Limburger|Appenzeller|Tilsiter|Gedeost/chevre/chèvre',
    85: 'Munster|Époisses/epoisses|Cabrales|Ossau iraty|Tête de moine/tete de moine|Mont dor/vacherin mont dor|Cotija|Queso fresco|Jarlsberg|Gamle ole|Saint nectaire|Brillat savarin|Wensleydale|Caciocavallo',
    100: 'Casu marzu|Pule|Milbenkäse/milbenkase|Brunost/gjetost|Serra da estrela|Chabichou|Pélardon/pelardon|Valençay/valencay|Sbrinz|Nabulsi|Oscypek|Mahon'
  }),
  q('islands', 'Land omgivet af vand', 'Nævn en dansk ø.', 'En ø i Danmark, inklusive Grønland og Færøerne. Ikke halvøer.', {
    10: 'Sjælland/zealand|Fyn/funen|Bornholm|Amager|Lolland',
    15: 'Falster|Møn|Samsø|Læsø|Ærø',
    30: 'Langeland|Fanø|Rømø|Anholt|Sejerø|Fur|Mors|Als|Saltholm|Grønland/greenland|Tåsinge|Thurø',
    60: 'Fejø|Femø|Omø|Agersø|Lyø|Avernakø|Strynø|Orø|Endelave|Nekselø|Mandø|Bogø|Venø|Jegindø|Streymoy|Eysturoy|Vágar/vagar|Suðuroy/suduroy|Sandoy|Kalsoy|Nólsoy/nolsoy|Bordoy/borðoy',
    85: 'Birkholm|Skarø|Drejø|Hjarnø|Tunø|Egholm|Alrø|Bågø|Livø|Hesselø|Sprogø|Christiansø|Frederiksø|Peberholm|Enø|Glænø|Vresen|Mykines|Fugloy|Svínoy/svinoy|Kunoy|Hestur|Koltur',
    100: 'Halmø|Vejrø|Rågø|Lindholm|Barsø|Aarø/årø|Masnedø|Askø|Lilleø|Hjortø|Græsholm|Skarvø|Bjørnø|Skúvoy/sku voy/skuvoy|Stóra Dímun/stora dimun|Lítla Dímun/litla dimun'
  }),
  q('trees', 'Rødder & kroner', 'Nævn en træart.', 'Et træ eller en slægt af træer. Også frugttræer tæller.', {
    10: 'Eg/oak|Bøg/beech|Birk/birch|Gran/spruce|Fyr/pine|Æbletræ/apple tree',
    15: 'Palme/palm|Pil/willow|Ahorn/maple|Kastanje/chestnut',
    30: 'Ask/ash|Lind/linden|Elm|Lærk/larch|Poppel/poplar|Røn/rowan|Valnød/walnut|Kirsebærtræ/cherry tree|Pæretræ/pear tree|Blommetræ/plum tree|Oliven/olive|Cypres/cypress|Taks/yew|Ceder/cedar',
    60: 'Ginkgo/tempeltræ|Sequoia/mammuttræ|Baobab/abebrødstræ|Magnolie/magnolia|Tulipantræ/tulip tree|Avnbøg/hornbeam|Robinie/robinia|Platan/plane tree|Hickory|Eukalyptus/eucalyptus|Teak|Mahogni/mahogany|El/alder|Hassel/hazel',
    85: 'Metasequoia/vandgran|Duenes træ/duetræ/davidia|Ambertræ/liquidambar|Hjertetræ/katsura|Pagodetræ/styphnolobium|Abe-træ/abetræ/araucaria|Sumpcypres/bald cypress|Judas-træ/judastræ/cercis|Gummitræ/rubber tree|Korkeg/cork oak|Ibenholt/ebony',
    100: 'Wollemia/wollemi pine|Drageblodstræ/dragon blood tree|Kauri|Jakaranda/jacaranda|Paulownia/kejsertræ|Zelkova|Parrotia/papegøjebusk|Sassafras|Guttaperkatræ/gutta percha|Argan/argania'
  }),
  q('pasta', 'Al dente', 'Nævn en type pasta.', 'En pastaform. Pastaretter som carbonara tæller ikke.', {
    10: 'Spaghetti|Penne|Lasagne/lasagna|Makaroni/maccheroni/macaroni|Fusilli/skruer',
    15: 'Farfalle/sommerfugle|Tagliatelle|Fettuccine|Ravioli|Tortellini',
    30: 'Linguine|Rigatoni|Cannelloni|Pappardelle|Conchiglie|Orzo/risoni|Bucatini|Gnocchi',
    60: 'Orecchiette|Cavatappi|Paccheri|Capellini|Ditalini|Rotelle|Fregola|Strozzapreti|Gemelli|Mafaldine|Trenette|Vermicelli|Lumaconi',
    85: 'Trofie|Casarecce|Cavatelli|Garganelli|Pici|Bigoli|Agnolotti|Anellini|Campanelle|Radiatori|Ziti|Spätzle/spaetzle',
    100: 'Culurgiones|Lorighittas|Malloreddus|Corzetti|Busiate|Fileja|Sagne|Testaroli|Sorpresine|Foglie d’ulivo/foglie dulivo|Cencioni'
  }),
  q('languages', 'Verden med ord', 'Nævn et sprog.', 'Et nulevende, talt sprog. Ikke programmeringssprog, dialekter eller konstruerede sprog.', {
    10: 'Dansk/danish|Engelsk/english|Tysk/german|Fransk/french|Spansk/spanish|Kinesisk/chinese/mandarin',
    15: 'Svensk/swedish|Norsk/norwegian|Italiensk/italian|Japansk/japanese|Russisk/russian',
    30: 'Portugisisk/portuguese|Arabisk/arabic|Hindi|Koreansk/korean|Finsk/finnish|Hollandsk/dutch/nederlandsk|Græsk/greek|Tyrkisk/turkish|Polsk/polish|Thai|Vietnamesisk/vietnamese|Hebraisk/hebrew|Ukrainsk/ukrainian|Ungarsk/hungarian|Tjekkisk/czech',
    60: 'Islandsk/icelandic|Færøsk/faroese|Grønlandsk/greenlandic/kalaallisut|Swahili|Persisk/farsi/persian|Bengali|Tamil|Urdu|Indonesisk/indonesian|Malajisk/malay|Rumænsk/romanian|Bulgarsk/bulgarian|Serbisk/serbian|Kroatisk/croatian|Estisk/estonian|Lettisk/latvian|Litauisk/lithuanian|Irsk/irish|Walisisk/welsh|Georgisk/georgian',
    85: 'Baskisk/basque|Katalansk/catalan|Armensk/armenian|Amharisk/amharic|Mongolsk/mongolian|Nepalesisk/nepali|Khmer|Lao|Zulu|Xhosa|Afrikaans|Hausa|Yoruba|Igbo|Tagalog|Cebuano|Maori/māori|Samoansk/samoan|Tibetansk/tibetan|Burmesisk/burmese|Kurdisk/kurdish|Pashto|Quechua|Guarani/guaraní',
    100: 'Aymara|Nahuatl|Navajo|Inuktitut|Fijiansk/fijian|Dzongkha|Tetum|Tigrinya|Wolof|Bretonsk/breton|Kornisk/cornish|Sorbisk/sorbian|Ladin|Retoromansk/romansh|Maltesisk/maltese|Malagassisk/malagasy|Luxembourgsk/luxembourgish|Manx|Udmurt|Sakha/jakutisk'
  })
];
