import { QUESTIONS as ORIGINAL, q } from './data.js';
import { normalize, seedFrom, ROUND_COUNT } from './engine.js';

const EXTRA = [
  q('countries', 'Verdenskortet', 'Nævn et land i Afrika.', 'En selvstændig stat. Oversøiske territorier tæller ikke.', {
    10:'Egypten/Egypt|Sydafrika/South Africa|Marokko/Morocco|Kenya|Nigeria',
    15:'Tanzania|Tunesien/Tunisia|Madagaskar/Madagascar|Ghana',
    30:'Algeriet/Algeria|Etiopien/Ethiopia|Senegal|Uganda|Cameroun/Cameroon|Zimbabwe|Zambia|Angola|Sudan|Somalia',
    60:'Botswana|Namibia|Rwanda|Mozambique|Mali|Niger|Tchad/Chad|Libyen/Libya|Congo/Republikken Congo|Den Demokratiske Republik Congo/DR Congo/DRC|Elfenbenskysten/Ivory Coast|Burkina Faso|Benin|Togo',
    85:'Gabon|Eritrea|Lesotho|Eswatini/Swaziland|Malawi|Liberia|Sierra Leone|Guinea|Guinea Bissau|Mauretanien/Mauritania|Sydsudan/South Sudan|Den Centralafrikanske Republik/Central African Republic|Gambia|Mauritius|Seychellerne/Seychelles|Kap Verde/Cabo Verde',
    100:'São Tomé og Príncipe/Sao Tome and Principe|Comorerne/Comoros|Djibouti|Ækvatorialguinea/Equatorial Guinea|Burundi'
  }),
  q('dogs','Hvem er en god hund?','Nævn en hunderace.','En anerkendt race. Blandinger som labradoodle tæller ikke i denne kategori.',{
    10:'Labrador/labrador retriever|Golden retriever|Schæfer/german shepherd|Chihuahua|Puddel/poodle|Bulldog/engelsk bulldog|Mops/pug',
    15:'Husky/siberian husky|Dalmatiner/dalmatian|Corgi/welsh corgi|Gravhund/dachshund|Border collie|Beagle',
    30:'Rottweiler|Dobermann/doberman|Boxer|Cocker spaniel|Dværgschnauzer/miniature schnauzer|Sankt bernhard/saint bernard|Samojed/samoyed|Berner sennen/bernese mountain dog|Shiba inu|Akita|West highland white terrier/westie|Jack russell terrier|Bichon frisé/bichon frise',
    60:'Weimaraner|Rhodesian ridgeback|Afghansk mynde/afghan hound|Whippet|Saluki|Basenji|Newfoundland|Leonberger|Basset hound|Vizsla|Borzoi/russisk mynde|Engelsk setter/english setter|Tibetansk terrier/tibetan terrier|Alaskan malamute|Cairn terrier|Dansk svensk gårdhund',
    85:'Azawakh|Sloughi|Faraohund/pharaoh hound|Cirneco dell etna|Schipperke|Keeshond|Lagotto romagnolo|Briard|Beauceron|Komondor|Puli|Mudi|Pumi|Kromfohrländer/kromfohrlander|Hovawart|Otterhound',
    100:'Lundehund/norsk lundehund|Thai ridgeback|Xoloitzcuintle/mexicansk hårløs|Catalburun|Stabyhoun|Chinook|Tornjak|Kai ken|Kishu|Telomian'
  }),
  q('dinosaurs','Før vores tid','Nævn en dinosaur.','En dinosaur-slægt. Flyveøgler og havøgler som mosasaurus tæller ikke.',{
    10:'Tyrannosaurus/tyrannosaurus rex/t rex|Triceratops|Stegosaurus|Velociraptor|Brachiosaurus',
    15:'Diplodocus|Spinosaurus|Allosaurus|Ankylosaurus',
    30:'Iguanodon|Parasaurolophus|Pachycephalosaurus|Apatosaurus|Brontosaurus|Carnotaurus|Deinonychus|Giganotosaurus',
    60:'Therizinosaurus|Oviraptor|Gallimimus|Compsognathus|Dreadnoughtus|Argentinosaurus|Utahraptor|Maiasaura|Styracosaurus|Corythosaurus|Kentrosaurus|Coelophysis',
    85:'Microraptor|Nigersaurus|Amargasaurus|Baryonyx|Suchomimus|Dilophosaurus|Acrocanthosaurus|Mamenchisaurus|Sauropelta|Euoplocephalus|Psittacosaurus|Protoceratops',
    100:'Yi qi|Deinocheirus|Mononykus|Concavenator|Kosmoceratops|Bajadasaurus|Jakapil|Ubirajara|Zalmoxes|Scansoriopteryx'
  }),
  q('rivers','Strøm på kortet','Nævn en flod uden for Danmark.','En navngiven flod eller større biflod. Søer og have tæller ikke.',{
    10:'Nilen/Nile|Amazonas/Amazon|Donau/Danube|Themsen/Thames|Rhinen/Rhine|Seinen/Seine',
    15:'Ganges|Mississippi|Volga|Yangtze/Chang Jiang',
    30:'Eufrat/Euphrates|Tigris|Mekong|Congo|Indus|Elben/Elbe|Po|Tiberen/Tiber|Loire|Dnepr/Dnieper|Rio Grande|Colorado|Rhône/Rhone',
    60:'Orinoco|Limpopo|Zambezi|Niger|Senegal|Orange|Amur|Ob|Lena|Jenisej/Yenisei|Murray|Darling|Paraná/Parana|Uruguay|Brahmaputra|Irrawaddy|Salween|Vistula/Wisla|Oder|Douro|Tagus/Tejo',
    85:'Okavango|Mackenzie|Yukon|Saskatchewan|Madeira|Tapajós/Tapajos|Tocantins|Xingu|Juruá/Jurua|Lualaba|Kolyma|Aldan|Vilyuy|Tunguska|Ural|Syr Darja/Syr Darya|Amu Darja/Amu Darya',
    100:'Essequibo|Courantyne|Maroni|Ogooué/Ogooue|Ruvuma|Rufiji|Cunene|Sepik|Fly|Mamberamo|Kuskokwim|Pechora'
  }),
  q('painters','Farve på tilværelsen','Nævn en billedkunstner.','En navngiven maler eller billedkunstner. Efternavn accepteres, hvis det er entydigt i banken.',{
    10:'Pablo Picasso/Picasso|Vincent van Gogh/Van Gogh|Leonardo da Vinci/Da Vinci|Claude Monet/Monet|Salvador Dalí/Dali',
    15:'Frida Kahlo/Kahlo|Andy Warhol/Warhol|Banksy|Edvard Munch/Munch',
    30:'Henri Matisse/Matisse|Rembrandt|Michelangelo|Gustav Klimt/Klimt|Jackson Pollock/Pollock|Johannes Vermeer/Vermeer|Piet Mondrian/Mondrian|Paul Cézanne/Cezanne|Wassily Kandinsky/Kandinsky|Hokusai',
    60:'Vilhelm Hammershøi/Hammershøi|P.S. Krøyer/Krøyer|Anna Ancher|Michael Ancher|Asger Jorn/Jorn|Per Kirkeby/Kirkeby|Olafur Eliasson/Eliasson|Yayoi Kusama/Kusama|Jean Michel Basquiat/Basquiat|Georgia O’Keeffe/Okeeffe|Edward Hopper/Hopper|René Magritte/Magritte|Egon Schiele/Schiele|Hilma af Klint/Af Klint|Mark Rothko/Rothko',
    85:'Artemisia Gentileschi/Gentileschi|Leonora Carrington/Carrington|Remedios Varo/Varo|Sonia Delaunay|Giorgio Morandi/Morandi|Paula Modersohn Becker|Vilhelm Lundstrøm/Lundstrøm|Franciska Clausen|Oluf Høst/Høst|L.A. Ring/Ring|J.F. Willumsen/Willumsen|Berthe Morisot/Morisot',
    100:'Tarsila do Amaral|Amrita Sher Gil|Sophie Taeuber Arp|Ibrahim El Salahi|Toyin Ojih Odutola|Agnes Pelton|Else Alfelt|Sonja Ferlov Mancoba|Dora Carrington|El Anatsui'
  }),
  q('fish','Noget på krogen','Nævn en fisk.','En nulevende fisk eller almindelig fiskegruppe. Hvaler, skaldyr og blæksprutter tæller ikke.',{
    10:'Laks/salmon|Torsk/cod|Tun/tuna|Sild/herring|Guldfisk/goldfish|Haj/shark',
    15:'Klovnfisk/clownfish|Ål/eel|Ørred/trout|Makrel/mackerel|Rødspætte/plaice',
    30:'Skrubbe/flounder|Aborre/perch|Gedde/pike|Karpe/carp|Sej/pollock|Sardin/sardine|Ansjos/anchovy|Helleflynder/halibut|Sværdfisk/swordfish|Pighaj/dogfish|Havtaske/monkfish|Rødfisk/redfish',
    60:'Sandart/zander|Pighvar/turbot|Slethvar/brill|Knurhane/gurnard|Hornfisk/garfish|Fjæsing/weever|Havkat/wolffish|Rokke/ray|Multe/mullet|Rimte/ide|Brasen/bream|Suder/tench|Skalle/roach|Stør/sturgeon|Havaborre/sea bass|Havørred/sea trout',
    85:'Søhest/seahorse|Månefisk/ocean sunfish|Savfisk/sawfish|Flyvefisk/flying fish|Lungefisk/lungfish|Pansermalle/pleco|Skt Petersfisk/john dory|Lange/ling|Brosme/cusk|Havmus/chimaera|Smerling/loach|Kutling/goby|Løvefisk/lionfish|Dragefisk/dragonfish',
    100:'Blåfisk/coelacanth|Sødrage/leafy seadragon|Båndfisk/oarfish|Pelikanål/gulper eel|Tudsefisk/toadfish|Spøgelsesfisk/barreleye|Lygtefisk/lanternfish|Næbfisk/elephantnose fish|Håndfisk/handfish'
  }),
  q('cocktails','Noget i glasset','Nævn en cocktail.','En etableret alkoholholdig cocktail. En enkelt spiritus eller en øltype tæller ikke.',{
    10:'Mojito|Margarita|Gin og tonic/gin tonic/g&t|Piña colada/pina colada|Cosmopolitan',
    15:'Espresso martini|Aperol spritz|Long island iced tea|Daiquiri|Sex on the beach',
    30:'Negroni|Old fashioned|Manhattan|Whiskey sour/whisky sour|Bloody mary|White russian|Black russian|Tequila sunrise|Tom collins|Moscow mule|Mai tai|Dark n stormy/dark and stormy',
    60:'Paloma|Sazerac|French 75|Sidecar|Caipirinha|Boulevardier|Mint julep|Pisco sour|Bramble|Clover club|Vesper|Singapore sling|Bellini|Kir royal|Americano',
    85:'Last word|Aviation|Corpse reviver no 2/corpse reviver|Paper plane|Penicillin|Naked and famous|Hanky panky|Bee’s knees/bees knees|Southside|Ramos gin fizz|Vieux carré/vieux carre',
    100:'Trinidad sour|Chartreuse swizzle|Toronto|Bijou|Chrysanthemum|Tuxedo no 2|Remember the maine|Lion’s tail/lions tail|Widow’s kiss/widows kiss|Pegu club'
  }),
  q('danish-cities','Rundt om i Danmark','Nævn en dansk by.','En navngiven by i Danmark. Bydele og kommuner uden en by af samme navn tæller ikke.',{
    10:'København/Copenhagen|Aarhus/Århus|Odense|Aalborg/Ålborg|Esbjerg|Roskilde',
    15:'Randers|Kolding|Vejle|Horsens|Herning|Silkeborg',
    30:'Næstved|Fredericia|Viborg|Køge|Holstebro|Slagelse|Hillerød|Helsingør|Svendborg|Holbæk|Hjørring|Frederikshavn|Sønderborg|Haderslev|Skive|Ringsted|Nyborg|Kalundborg',
    60:'Middelfart|Aabenraa/Åbenrå|Thisted|Nakskov|Nykøbing Falster|Nykøbing Mors|Nykøbing Sjælland|Varde|Grenaa/Grenå|Brønderslev|Ikast|Skanderborg|Lemvig|Struer|Ribe|Tønder|Faaborg/Fåborg|Assens|Maribo|Stege|Hobro|Sæby|Bogense|Kerteminde|Skagen',
    85:'Sakskøbing|Nysted|Præstø|Faxe|Rødby|Stubbekøbing|Allinge|Gudhjem|Svaneke|Aakirkeby/Åkirkeby|Marstal|Ærøskøbing|Rudkøbing|Løgstør|Nibe|Hals|Hirtshals|Løkken|Fjerritslev|Ebeltoft|Vinderup|Ulfborg|Hvide Sande',
    100:'Snedsted|Ørnhøj|Kibæk|Borris|Spjald|Troldhede|Tarm|Tørring|Hørve|Dianalund|Ruds Vedby|Gørlev|Lundby|Væggerløse|Hesselager|Gudme|Vester Skerninge|Fjellerup|Bønnerup Strand'
  })
];
export const BASE_QUESTIONS = [...ORIGINAL, ...EXTRA].map(q => ({...q, baseId:q.id}));
// Natural category questions only: no spelling, letter or word-length constraints.
function subset(baseId, id, prompt, rule, words) {
  const base=BASE_QUESTIONS.find(question=>question.id===baseId);
  const accepted=new Set(words.split('|').map(normalize));
  return {...base,id:baseId+'-'+id,prompt,rule,answers:base.answers.filter(answer=>[answer.word,...answer.aliases].some(word=>accepted.has(normalize(word))))};
}
export const QUESTIONS = [...BASE_QUESTIONS,
  subset('fruit','tropical','Nævn en tropisk frugt.','En frugt fra tropiske eller subtropiske områder.', 'Banan|Ananas|Mango|Papaya|Litchi|Guava|Kokosnød|Dragefrugt|Rambutan|Durian|Jackfrugt|Mangostan|Salak|Cherimoya|Sapodille|Acerola|Langsat|Atemoya|Naranjilla|Jabuticaba'),
  subset('birds','water','Nævn en vandfugl.','En fugl, der lever ved vand, på havet eller i vådområder.', 'Måge|And|Svane|Gås|Stork|Pingvin|Flamingo|Isfugl|Søpapegøje|Albatros|Fiskehejre|Pelikan|Lunde|Havterne|Skestork|Rørdrum|Klyde|Træskonæb|Pragtfregat'),
  subset('instruments','wind','Nævn et blæseinstrument.','Et instrument, hvor luft sætter lyden i gang.', 'Fløjte|Trompet|Saxofon|Klarinet|Blokfløjte|Obo|Fagot|Valdhorn|Tuba|Trækbasun|Mundharmonika|Sækkepibe|Didgeridoo|Okarina|Serpent|Shakuhachi|Duduk|Sheng|Kontrabasfagot'),
  subset('capitals','north','Nævn en hovedstad i Norden eller Baltikum.','Hovedstaden i et selvstændigt nordisk eller baltisk land.', 'København|Stockholm|Oslo|Helsinki|Reykjavik|Tallinn|Riga|Vilnius'),
  subset('elements','metal','Nævn et metal.','Et metallisk grundstof. Både navn og kemisk symbol accepteres.', 'Guld|Jern|Sølv|Kobber|Aluminium|Calcium|Natrium|Magnesium|Zink|Kalium|Bly|Tin|Kviksølv|Lithium|Titan|Nikkel|Kobolt|Krom|Wolfram|Platin|Barium|Radium|Mangan|Palladium|Strontium|Cæsium|Rubidium|Gallium|Indium|Thallium|Bismuth|Thorium|Osmium|Iridium|Rhodium|Ruthenium|Zirkonium|Scandium|Yttrium|Niobium|Hafnium|Tantal|Rhenium|Lanthan|Cerium|Neodym|Europium|Gadolinium|Terbium|Dysprosium|Holmium|Erbium|Thulium|Ytterbium|Lutetium'),
  subset('sports','ball','Nævn en boldsport.','En sportsgren, hvor man spiller med en bold.', 'Fodbold|Håndbold|Tennis|Basketball|Golf|Bordtennis|Volleyball|Rugby|Cricket|Baseball|Hockey|Softball|Vandpolo|Squash|Lacrosse|Netball|Padel|Amerikansk fodbold|Futsal|Sepak takraw|Hurling|Pelota|Korfball|Tchoukball|Fistball|Teqball|Tamburello|Cestoball|Bossaball'),
  subset('spices','herbs','Nævn en krydderurt.','En urt, hvis blade bruges til at krydre mad.', 'Basilikum|Oregano|Timian|Rosmarin|Koriander|Persille|Dild|Purløg|Mynte|Salvie|Estragon|Citronmelisse|Kørvel|Løvstikke|Merian|Ramsløg|Isop|Sommersar|Epazote|Bibernelle'),
  subset('mammals','sea','Nævn et havpattedyr.','Et pattedyr, der lever i havet.', 'Delfin|Hval|Sæl|Spækhugger|Hvalros|Narhval|Dugong'),
  subset('flowers','spring','Nævn en forårsblomst.','En blomst, der typisk blomstrer i foråret i Danmark.', 'Tulipan|Påskelilje|Anemone|Vintergæk|Erantis|Krokus|Hyacint|Primula|Vibeæg|Julerose|Mælkebøtte|Stedmoderblomst'),
  subset('cheese','france','Nævn en fransk ost.','En ostetype med traditionel oprindelse i Frankrig.', 'Brie|Camembert|Roquefort|Comté|Reblochon|Morbier|Munster|Époisses|Ossau iraty|Mont dor|Saint nectaire|Brillat savarin|Chabichou|Pélardon|Valençay'),
  subset('islands','south-funen','Nævn en ø i Det Sydfynske Øhav.','En af øerne i og omkring Det Sydfynske Øhav.', 'Ærø|Langeland|Tåsinge|Thurø|Lyø|Avernakø|Strynø|Birkholm|Skarø|Drejø|Halmø|Hjortø|Bjørnø'),
  subset('trees','edible','Nævn et træ med spiselige frugter eller nødder.','Frugttræer og nøddetræer fra hele verden tæller.', 'Æbletræ|Pæretræ|Blommetræ|Kirsebærtræ|Valnød|Hassel|Oliven|Baobab'),
  subset('pasta','long','Nævn en lang type pasta.','Lange pastastrimler, bånd og tråde tæller.', 'Spaghetti|Tagliatelle|Fettuccine|Linguine|Pappardelle|Bucatini|Capellini|Mafaldine|Trenette|Vermicelli|Pici|Bigoli'),
  subset('languages','europe','Nævn et europæisk sprog.','Et talt sprog med oprindelse i Europa.', 'Dansk|Engelsk|Tysk|Fransk|Spansk|Svensk|Norsk|Italiensk|Russisk|Portugisisk|Finsk|Hollandsk|Græsk|Polsk|Ukrainsk|Ungarsk|Tjekkisk|Islandsk|Færøsk|Rumænsk|Bulgarsk|Serbisk|Kroatisk|Estisk|Lettisk|Litauisk|Irsk|Walisisk|Baskisk|Katalansk|Bretonsk|Kornisk|Sorbisk|Ladin|Retoromansk|Luxembourgsk|Manx'),
  subset('countries','west','Nævn et land i Vestafrika.','En selvstændig stat i Vestafrika.', 'Nigeria|Ghana|Senegal|Mali|Niger|Elfenbenskysten|Burkina Faso|Benin|Togo|Liberia|Sierra Leone|Guinea|Guinea Bissau|Gambia|Kap Verde'),
  subset('dogs','sighthounds','Nævn en mynderace.','En hunderace fra myndegruppen.', 'Afghansk mynde|Whippet|Saluki|Borzoi|Azawakh|Sloughi'),
  subset('dinosaurs','herbivores','Nævn en planteædende dinosaur.','En dinosaur-slægt, der hovedsageligt spiste planter.', 'Triceratops|Stegosaurus|Brachiosaurus|Diplodocus|Ankylosaurus|Iguanodon|Parasaurolophus|Apatosaurus|Brontosaurus|Dreadnoughtus|Argentinosaurus|Maiasaura|Styracosaurus|Kentrosaurus|Mamenchisaurus|Sauropelta|Euoplocephalus|Psittacosaurus|Protoceratops|Kosmoceratops|Bajadasaurus|Zalmoxes'),
  subset('rivers','europe','Nævn en europæisk flod.','En navngiven flod, der løber i Europa.', 'Donau|Themsen|Rhinen|Seinen|Volga|Elben|Po|Tiberen|Loire|Dnepr|Rhône|Vistula|Oder|Douro|Tagus|Ural|Pechora'),
  subset('painters','danish','Nævn en dansk billedkunstner.','En maler eller billedkunstner fra Danmark.', 'Vilhelm Hammershøi|P.S. Krøyer|Anna Ancher|Michael Ancher|Asger Jorn|Per Kirkeby|Olafur Eliasson|Vilhelm Lundstrøm|Franciska Clausen|Oluf Høst|L.A. Ring|J.F. Willumsen|Else Alfelt|Sonja Ferlov Mancoba'),
  subset('fish','freshwater','Nævn en ferskvandsfisk.','En fisk, som kan leve i ferskvand.', 'Ål|Ørred|Aborre|Gedde|Karpe|Guldfisk|Sandart|Rimte|Brasen|Suder|Skalle|Stør|Lungefisk|Pansermalle|Smerling|Næbfisk'),
  subset('cocktails','gin','Nævn en cocktail med gin.','En etableret cocktail, hvor gin indgår i den klassiske opskrift.', 'Gin og tonic|Negroni|Tom collins|French 75|Bramble|Clover club|Vesper|Last word|Aviation|Corpse reviver no 2|Hanky panky|Bee’s knees|Southside|Ramos gin fizz|Bijou|Tuxedo no 2|Pegu club'),
  subset('danish-cities','jutland','Nævn en by i Jylland.','En navngiven by på den jyske halvø.', 'Aarhus|Aalborg|Esbjerg|Randers|Kolding|Vejle|Horsens|Herning|Silkeborg|Fredericia|Viborg|Holstebro|Hjørring|Frederikshavn|Sønderborg|Haderslev|Skive|Thisted|Varde|Grenaa|Brønderslev|Ikast|Skanderborg|Lemvig|Struer|Ribe|Tønder|Hobro|Sæby|Skagen|Løgstør|Nibe|Hals|Hirtshals|Løkken|Fjerritslev|Ebeltoft|Vinderup|Ulfborg|Hvide Sande|Snedsted|Ørnhøj|Kibæk|Borris|Spjald|Troldhede|Tarm|Tørring|Fjellerup|Bønnerup Strand')
];

// Keep saved flights and points when removing old letter-constrained variants.
export function migrateQuestionRun(flight){
  if(!flight || !Array.isArray(flight.ids))return flight;
  const canonical=id=>typeof id==='string'?id.split('--')[0]:id;
  return {...flight,ids:flight.ids.map(canonical),results:(flight.results||[]).map(result=>({...result,questionId:canonical(result.questionId)}))};
}

// A saved practice deck is consumed once before reshuffling. Immediate repetition
// is avoided across the boundary, and one category family appears at most once per run.
export function drawFreshQuestions(bank, seen = [], seed = Date.now(), count = ROUND_COUNT) {
  let n = seedFrom(String(seed));
  const shuffled = [...bank];
  for (let i=shuffled.length-1;i>0;i--) { n=(Math.imul(n,1664525)+1013904223)>>>0;const j=n%(i+1);[shuffled[i],shuffled[j]]=[shuffled[j],shuffled[i]]; }
  const seenSet = new Set(seen), picked=[], families=new Set();
  const lastRun = new Set(seen.slice(-count));
  for (const pool of [shuffled.filter(q=>!seenSet.has(q.id)),shuffled.filter(q=>!lastRun.has(q.id))]) for (const question of pool) {
    if (picked.length === count) break;
    if (families.has(question.baseId) || picked.some(q=>q.id===question.id)) continue;
    picked.push(question);families.add(question.baseId);
  }
  const usedOld = picked.some(q=>seenSet.has(q.id));
  return {questions:picked, seen:usedOld ? picked.map(q=>q.id) : [...seen,...picked.map(q=>q.id)]};
}
export function dailyQuestions(bank,date){
  const year=date.slice(0,4);
  const day=Math.floor((Date.parse(date+'T12:00:00Z')-Date.parse(year+'-01-01T12:00:00Z'))/86400000);
  let seen=[],questions=[];
  for(let d=0;d<=day;d++){
    const draw=drawFreshQuestions(bank,seen,'daily-'+year+'-'+d);
    questions=draw.questions;seen=draw.seen;
  }
  return questions;
}
