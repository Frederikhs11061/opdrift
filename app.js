import { Universe } from './world.js';
import { QUESTIONS, BASE_QUESTIONS, drawFreshQuestions, dailyQuestions, migrateQuestionRun } from './bank.js';
import { TIERS, tierFor, checkAnswer, selectQuestions, seedFrom, dateKey, remainingSeconds, scoreRun, altitude, flightName, ROUND_MS, ROUND_COUNT, MAX_SCORE } from './engine.js';

const $ = id => document.getElementById(id);
const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const number = value => new Intl.NumberFormat('da-DK').format(value);
const STORE = 'opdrift.v1';
let storageAvailable = true;
function readStore() { try { return JSON.parse(localStorage.getItem(STORE)) || {}; } catch { storageAvailable = false; return {}; } }
let saved = readStore();
for(const slot of ['daily','practice']) if(saved[slot]) saved[slot]=migrateQuestionRun(saved[slot]);
if(Array.isArray(saved.seenQuestions)){
  const ids=saved.seenQuestions.map(id=>id.split('--')[0]).filter(id=>QUESTIONS.some(q=>q.id===id));
  saved.seenQuestions=ids.filter((id,index)=>ids.lastIndexOf(id)===index);
}
if (!Array.isArray(saved.history)) saved.history = [];
function persist() { try { localStorage.setItem(STORE, JSON.stringify(saved)); } catch { storageAvailable = false; } }
let mode = 'daily', run = null, page = 'home', question = null, suggestion = null, timer = null;
let sound = saved.sound === true, audio, toastTimeout, countAnimation, flightAnimation;
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const issue = () => Math.max(1, Math.floor((Date.parse(dateKey() + 'T12:00:00Z') - Date.parse('2026-01-01T12:00:00Z')) / 86400000) + 1);
const dateLabel = () => new Intl.DateTimeFormat('da-DK', { day: 'numeric', month: 'long', timeZone: 'Europe/Copenhagen' }).format(new Date());
const total = () => scoreRun(run?.results || []);

const universe = new Universe();

function toast(message) { $('toast').textContent = message; $('toast').classList.add('visible'); clearTimeout(toastTimeout); toastTimeout = setTimeout(() => $('toast').classList.remove('visible'), 3600); }
function beep(points = 30) {
  if (!sound) return;
  try {
    audio ||= new (window.AudioContext || window.webkitAudioContext)(); audio.resume();
    const start = audio.currentTime;
    [0, 4, 7].forEach((step, i) => { const oscillator = audio.createOscillator(), gain = audio.createGain(); oscillator.type = 'sine'; oscillator.frequency.value = (points >= 85 ? 440 : 330) * 2 ** (step / 12); gain.gain.setValueAtTime(0, start + i * .09); gain.gain.linearRampToValueAtTime(.045, start + i * .09 + .015); gain.gain.exponentialRampToValueAtTime(.001, start + i * .09 + .35); oscillator.connect(gain); gain.connect(audio.destination); oscillator.start(start + i * .09); oscillator.stop(start + i * .09 + .36); });
  } catch { /* Muted or unsupported audio must never interrupt a round. */ }
}
function updateSound() {
  $('sound').setAttribute('aria-label', sound ? 'Slå lyd fra' : 'Slå lyd til'); $('sound').title = sound ? 'Slå lyd fra' : 'Slå lyd til';
  $('sound').innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4V5Z"/><path d="${sound ? 'M15 8c3 2 3 6 0 8m3-11c5 4 5 10 0 14' : 'm16 9 5 6m0-6-5 6'}"/></svg>`;
}
function setMode(next) {
  clearInterval(timer); cancelAnimationFrame(flightAnimation); universe.tween?.kill(); $('flight-caption')?.remove(); mode = next; run = null; page = 'home';
  $('daily-tab').classList.toggle('selected', mode === 'daily'); $('practice-tab').classList.toggle('selected', mode === 'practice');
  $('daily-tab').setAttribute('aria-pressed', String(mode === 'daily')); $('practice-tab').setAttribute('aria-pressed', String(mode === 'practice'));
  renderHome();
}
function currentSaved() { return mode === 'daily' ? saved.daily?.date === dateKey() ? saved.daily : null : saved.practice || null; }
function saveRun() { if (mode === 'daily') saved.daily = run; else saved.practice = run; persist(); }
function storageNote() { return !storageAvailable ? '<p class="storage-note">Browseren tillader ikke lagring. Spillet virker, men turen og din historik forsvinder, når siden lukkes.</p>' : ''; }
function renderHome() {
  page = 'home'; document.body.className = 'is-home'; const previous = currentSaved();
  $('game-content').innerHTML = `<div class="home-title enter"><h1>OPDRIFT</h1><p>Tænk smalt. Flyv højt.</p></div><div class="home-play enter"><p class="home-challenge">Find svaret, de færreste tænker på.<br>Se, hvor langt din viden kan flyve.</p><button class="primary" id="start"><span>${previous?.phase === 'complete' ? mode === 'daily' ? 'Se dagens flyvetur' : 'Flyv en ny tur' : previous ? 'Fortsæt din flyvetur' : mode === 'daily' ? 'Start dagens flyvetur' : 'Start fri flyvning'}</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg></button><div class="home-facts"><span>20 spørgsmål</span><span>20 sekunder</span><span>${mode==='daily' ? escape(dateLabel()) : 'Nye spørgsmål hver tur'}</span></div>${previous && previous.phase !== 'complete' ? '<p class="resume-note">Din tur er gemt. Et åbent spørgsmåls tid løber videre.</p>' : ''}${storageNote()}</div>`;
  $('start').addEventListener('click', start); updateScene(0);
}
function start() {
  const existing = currentSaved();
  if (existing && (existing.phase !== 'complete' || mode === 'daily')) {
    run = existing;
    if (!Array.isArray(run.ids) || run.ids.length !== ROUND_COUNT || run.ids.some(id => !QUESTIONS.some(q => q.id === id))) { toast('Svarbanken er opdateret. Vi starter en ny tur.'); run = null; }
  } else run = null;
  if (!run) {
    const seed = mode === 'daily' ? seedFrom('opdrift-' + dateKey()) : crypto.getRandomValues(new Uint32Array(1))[0];
    const draw = mode === 'daily' ? {questions:dailyQuestions(QUESTIONS,dateKey())} : drawFreshQuestions(QUESTIONS,saved.seenQuestions||[],seed);
    if(mode==='practice') saved.seenQuestions=draw.seen;
    run = { id: `${mode}-${Date.now()}-${seed}`, mode, date: dateKey(), ids: draw.questions.map(q => q.id), results: [], index: 0, phase: 'question', endAt: Date.now() + ROUND_MS };
    saveRun();
  }
  renderRun();
}
function progress() { return `<div class="flight-progress" aria-label="Spørgsmål ${Math.min(run.index + 1, ROUND_COUNT)} af ${ROUND_COUNT}">${run.ids.map((_, i) => `<span class="progress-segment ${i < run.results.length ? 'done' : i === run.index ? 'current' : ''}"></span>`).join('')}</div>`; }
function renderRun() {
  clearInterval(timer); document.body.className = run.phase === 'complete' ? 'is-results' : 'is-playing';
  if (run.phase !== 'flying') { $('flight-levels')?.remove(); $('flight-caption')?.remove(); $('flight-scene').classList.remove('flight-arrived'); }
  if (run.phase === 'complete') { renderResults(); return; }
  question = QUESTIONS.find(q => q.id === run.ids[run.index]);
  if (run.phase === 'flying') { renderFlight(); return; }
  if (run.phase === 'reveal') { renderReveal(); return; }
  renderQuestion();
}
function renderQuestion() {
  page = 'question'; suggestion = null;
  $('game-content').innerHTML = `<section class="question-dock enter" aria-label="Aktuelt spørgsmål">${progress()}<div class="round-top"><span class="round-kicker">SPØRGSMÅL ${run.index + 1} AF ${ROUND_COUNT}</span><span class="round-score">${total()} POINT</span></div><h2 class="question-title">${escape(question.prompt)}</h2><p class="question-rule">${escape(question.rule)}</p><div class="timer-row" id="timer-row"><div class="timer-track"><div class="timer-fill" id="timer-fill"></div></div><span class="timer-number" id="timer-number" role="timer" aria-label="Sekunder tilbage">20 s</span></div><form id="answer-form" novalidate><label class="answer-label" for="answer">DIT MEST UALMINDELIGE SVAR</label><div class="input-wrap"><input id="answer" name="answer" placeholder="Dit niche-svar…" autocomplete="off" autocapitalize="none" spellcheck="false" maxlength="80" enterkeyhint="send" aria-describedby="feedback"><button class="submit-answer" type="submit" aria-label="Giv mig opdrift"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20V4m-6 6 6-6 6 6"/></svg></button></div><div id="feedback" class="answer-feedback" role="status"></div><div id="suggestion-box"></div><div class="answer-actions"><span class="spelling-note">Små stavefejl? Dem retter vi.</span><button class="text-button" id="pass" type="button">Spring over</button></div></form>${storageNote()}</section>`;
  $('answer-form').addEventListener('submit', submit); $('pass').addEventListener('click', () => finish(null, 'pass'));
  $('answer').addEventListener('input', () => { suggestion = null; $('suggestion-box').replaceChildren(); $('feedback').textContent = ''; });
  updateScene(total()); tick(); if (page === 'question') { timer = setInterval(tick, 100); requestAnimationFrame(() => $('answer')?.focus({ preventScroll: true })); }
}
function tick() {
  if (page !== 'question') return;
  const left = remainingSeconds(run.endAt);
  if (left === 0) { finish(null, 'timeout'); return; }
  $('timer-number').textContent = `${left} s`;
  $('timer-fill').style.transform = `scaleX(${Math.max(0, (run.endAt - Date.now()) / ROUND_MS)})`;
  $('timer-row').classList.toggle('urgent', left <= 7);
}
function submit(event) {
  event.preventDefault(); if (page !== 'question') return;
  if (Date.now() >= run.endAt) { finish(null, 'timeout'); return; }
  const value = $('answer').value;
  const checked = checkAnswer(question, value);
  $('suggestion-box').replaceChildren(); suggestion = null;
  if (checked.status === 'correct') finish(checked.answer, 'answer', checked.autocorrect ? value : '');
  else if (checked.status === 'suggestion') {
    suggestion = checked.answer; $('feedback').textContent = '';
    $('suggestion-box').innerHTML = `<div class="suggestion"><span>Mente du <strong>${escape(suggestion.word)}</strong>?</span><button type="button" id="confirm-suggestion">Ja, brug det ↑</button></div>`;
    $('confirm-suggestion').addEventListener('click', () => { if (Date.now() >= run.endAt) finish(null, 'timeout'); else if (suggestion) finish(suggestion); });
  } else {
    $('feedback').textContent = checked.status === 'empty' ? 'Skriv et svar først — eller spring over.' : 'Det svar er ikke i denne kategoris svarbank. Prøv et andet.';
    $('answer').focus(); $('answer').select();
  }
}
function finish(answer, reason = 'answer', correctedFrom = '') {
  if (run.phase !== 'question') return;
  clearInterval(timer); suggestion = null;
  run.results.push({ questionId: question.id, word: answer?.word || '', points: answer?.points || 0, reason, correctedFrom });
  run.phase = answer ? 'flying' : 'reveal'; saveRun();
  if (answer) renderFlight(); else renderReveal();
}
function renderFlight() {
  clearInterval(timer); cancelAnimationFrame(countAnimation); cancelAnimationFrame(flightAnimation);
  page = 'flying'; document.body.className = 'is-flying'; $('game-content').replaceChildren();
  const result = run.results.at(-1), tier = tierFor(result.points);
  $('flight-caption')?.remove();
  const caption=document.createElement('div');caption.id='flight-caption';caption.className='flight-caption';caption.setAttribute('aria-live','polite');$('flight-scene').append(caption);
  universe.fly(total()-result.points,total(),TIERS.slice(1),(passed)=>beep(passed.points),()=>{
    if(page!=='flying')return;
    caption.innerHTML=`<div class="arrival-result enter" style="--arrival-color:${tier.color}"><h2>${tier.name}</h2><strong>${escape(result.word)}</strong><p>+${result.points} point <span>+${number(result.points*10)} meter</span></p>${result.correctedFrom ? `<small class="autocorrect-note">Rettet automatisk: »${escape(result.correctedFrom)}«</small>`:''}<button class="primary" id="flight-continue"><span>${run.index===ROUND_COUNT - 1?'Se din flyvetur':'Næste spørgsmål'}</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg></button></div>`;
    $('flight-continue').addEventListener('click',next);$('flight-continue').focus({preventScroll:true});
  });
}
function renderReveal() {
  page = 'reveal'; document.body.className = 'is-playing is-reveal'; $('flight-levels')?.remove(); $('flight-caption')?.remove(); const result = run.results.at(-1), tier = tierFor(result.points);
  const examples = question.answers.filter(a => a.points >= 85 && a.word !== result.word).slice(-3);
  $('game-content').innerHTML = `<div class="enter" style="--tier:${tier.color}">${progress()}<p class="reveal-eyebrow">SPØRGSMÅL ${run.index + 1} / ${escape(question.prompt)}</p><div class="reveal-symbol">${tier.icon}</div><h2 class="reveal-word">${escape(result.word || (result.reason === 'timeout' ? 'Tiden fløj.' : 'Vi flyver videre.'))}</h2><div class="reveal-tier"><span>+${result.points} POINT</span><span>${tier.name}</span></div>${result.correctedFrom ? `<p class="autocorrect-note">✓ Automatisk rettet: »${escape(result.correctedFrom)}« → ${escape(result.word)}</p>` : ''}<p class="reveal-description">${result.points ? tier.description : result.reason === 'timeout' ? 'De 20 sekunder er gået. Gem din næste geniale idé til næste spørgsmål.' : 'Nogle gange skal man lade et spørgsmål flyve forbi. Det giver 0 point.'}</p><div class="reveal-height"><strong>+${number(result.points * 10)} m</strong><span>${number(altitude(total()))} M I ALT</span></div><button class="primary" id="next"><span>${run.index === ROUND_COUNT - 1 ? 'Se din flyvetur' : 'Næste spørgsmål'}</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg></button><p class="alternative">Nichehjørnet: ${examples.map(a => `<strong>${escape(a.word)}</strong> +${a.points}`).join(' · ')}<br>Point er redaktionelle vurderinger, ikke spillerstatistik.</p></div>`;
  $('next').addEventListener('click', next); updateScene(total()); requestAnimationFrame(() => $('next')?.focus({ preventScroll: true }));
}
function next() {
  if (run.index >= ROUND_COUNT - 1) {
    run.phase = 'complete'; run.completedAt = Date.now();
    if (!saved.history.some(h => h.id === run.id)) saved.history.push({ id: run.id, date: run.date, mode: run.mode, score: total(), results: run.results });
    // Keep the latest 365 flights; no remote account or telemetry.
    saved.history = saved.history.slice(-365); saveRun(); renderRun();
  } else { run.index++; run.phase = 'question'; run.endAt = Date.now() + ROUND_MS; saveRun(); renderRun(); }
}
function renderResults() {
  page = 'complete'; const score = total(); const height = altitude(score);
  $('game-content').innerHTML = `<div class="enter"><div class="flight-date"><span class="today-badge">TUREN ER FLØJET</span><span class="date-sep"></span><span>${mode === 'daily' ? `DAGENS TUR ${issue()}` : 'FRI FLYVNING'}</span></div><h2 class="result-title">${flightName(score)}.</h2><p class="result-subtitle">20 spørgsmål. Dine egne skæve svar. Din flyvehøjde:</p><div class="result-score"><strong>${number(height)}</strong><span>METER / ${score} AF ${MAX_SCORE} POINT</span></div><div class="result-chart" aria-label="Point for hvert af de ${ROUND_COUNT} spørgsmål">${run.results.map((r, i) => `<div class="result-column"><b>${r.points}</b><i style="background:${tierFor(r.points).color};height:${Math.max(3,r.points*.38)}px"></i><small>${String(i+1).padStart(2,'0')}</small></div>`).join('')}</div><div class="result-actions"><button class="primary" id="copy"><span>Kopiér din flyvetur</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg></button><button class="secondary" id="again">Flyv igen ∞</button></div><details class="result-details"><summary>Se dine svar og nichepoint</summary><table class="answer-table"><thead><tr><th>Spørgsmål</th><th>Dit svar</th><th>Point</th></tr></thead><tbody>${run.results.map((r, i) => `<tr><td>${i + 1}. ${escape(QUESTIONS.find(q => q.id === r.questionId).category)}</td><td>${escape(r.word || 'Sprunget over')}<small>${tierFor(r.points).name}</small></td><td style="color:${tierFor(r.points).color}">+${r.points}</td></tr>`).join('')}</tbody></table></details><p class="game-footnote">${mode === 'daily' ? 'Næste daglige tur åbner ved midnat, dansk tid.' : 'Fortsæt så længe du vil. Hver tur blander nye kategorier.'}<br>Din historik er gemt i denne browser.</p>${storageNote()}</div>`;
  $('copy').addEventListener('click', copyResult); $('again').addEventListener('click', () => { setMode('practice'); saved.practice = null; persist(); start(); }); updateScene(score);
}
function updateScene(score) { universe.set(score); }

function openDialog(title, content) { $('dialog-content').innerHTML = `<h2 id="dialog-title">${title}</h2>${content}`; if (!$('dialog').open) $('dialog').showModal(); }
function openHelp() {
  openDialog('Lidt mindre oplagt.<br>Lidt mere opdrift.', `<p>OPDRIFT er et dansk trivia-spil med mange rigtige svar. Opgaven er at finde et af de sjældne.</p><ol><li>Du får <strong>20 spørgsmål</strong>, ét ad gangen.</li><li>Du har <strong>20 sekunder</strong> til at skrive et svar. Tryk Enter eller »Giv mig opdrift«.</li><li>Et almindeligt svar giver lidt løft. Et niche-svar giver meget. <strong>1 point = 10 meter.</strong></li><li>Små, entydige stavefejl rettes automatisk og godkendes. En rettelse vises efter flyvningen.</li><li>Efter et korrekt svar forsvinder spørgsmålet. Ballonen flyver gennem niveauerne og bremser ved dit svars niveau.</li><li>Et afvist svar koster kun tid. Prøv igen, eller spring over for 0 point.</li></ol><div class="tier-list">${TIERS.slice(1).map(t => `<div style="color:${t.color}"><span><i class="tier-dot" style="background:${t.color}"></i>${t.name}</span><b>${t.points} point · ${number(t.points * 10)} m</b></div>`).join('')}</div><p class="dialog-note">Dagens flyvetur er ens for alle og kan gennemføres én gang pr. dag i denne browser. Fri flyvning kan spilles så ofte, du vil. Et åbent spørgsmåls tid fortsætter, hvis du skifter fane, åbner hjælp eller genindlæser siden.</p>`);
}
function openAbout() {
  openDialog('En lille idé.<br>Med højt til loftet.', `<p>OPDRIFT gør nicheviden til opdrift i en luftballon. Et selvstændigt dansk spil inspireret af idéen om at finde det sjældneste korrekte svar.</p><p>Her er ${QUESTIONS.length} forskellige spørgsmål i ${BASE_QUESTIONS.length} kategorier med ${number(BASE_QUESTIONS.reduce((n, q) => n + q.answers.length, 0))} kuraterede svar og mange navnevarianter. Fri flyvning bruger en roterende pulje: Uspurgte spørgsmål prioriteres. To ture i træk får aldrig de samme spørgsmål. Spørgsmålene handler kun om kategorier og emner — uden krav til bogstaver eller stavemåde.</p><p><strong>Sådan bestemmes pointene:</strong> Hvert svar er placeret i et fast niveau efter en redaktionel vurdering af, hvor almindeligt det er. Det er et skøn, og ikke målinger af, hvad andre spillere har skrevet. Flere svar kan få 100 point.</p><p>Svarbanken er afgrænset. Et korrekt svar kan mangle — det betyder ikke, at din viden er forkert. Spillet viser, når et svar ikke findes i banken.</p><p>Rejsen fra jorden til galakserne og højden er spilmetaforer. Dine ture gemmes lokalt i browseren. Ingen konto, reklamer eller serverlagret rangliste.</p><p class="dialog-note">Idéundersøgelse: <a href="https://krillion.io/faq" target="_blank" rel="noopener noreferrer">Krillions officielle FAQ</a> og <a href="https://cosmillion.com/" target="_blank" rel="noopener noreferrer">Cosmillion</a>. OPDRIFT har egen kode, grafik, svarbank og identitet og er ikke tilknyttet disse spil.</p>`);
}
function openStats() {
  const runs = saved.history, best = Math.max(0, ...runs.map(h => h.score)), mean = runs.length ? Math.round(runs.reduce((s, h) => s + h.score, 0) / runs.length) : 0;
  openDialog('Din lille flyvebog.', `<p>${runs.length ? 'Hver tur tæller. Her er dine ture i denne browser.' : 'Her er stille endnu. Flyv din første tur, så begynder flyvebogen at fylde sig selv.'}</p><div class="stat-grid"><div><strong>${runs.length}</strong><span>FLYVETURE</span></div><div><strong>${number(best * 10)}</strong><span>HØJDE­REKORD / M</span></div><div><strong>${mean}</strong><span>GNS. POINT</span></div></div>${runs.slice(-8).reverse().map(h => `<div class="history-row"><span>${escape(h.date.split('-').reverse().join('.'))} · ${h.mode === 'daily' ? 'Dagens tur' : 'Fri flyvning'}</span><strong>${number(h.score * 10)} m</strong></div>`).join('')}<p class="dialog-note">Kun lokal historik. Daglige ture og fri flyvning indgår. De seneste 365 ture gemmes, så længe browserens data bevares.</p>`);
}
async function copyResult() {
  const icons = { 0: '⬛', 10: '⬜', 15: '🟦', 30: '🟩', 60: '🟨', 85: '🟧', 100: '🟪' };
  const text = `OPDRIFT · ${run.mode === 'daily' ? `Dagens tur ${run.date}` : 'Fri flyvning'}\n${run.results.map(r => icons[r.points]).join('')}\n${number(altitude(total()))} meter · ${total()}/${MAX_SCORE} point\n${flightName(total())} 🎈\nTænk smalt. Flyv højt.`;
  try { await navigator.clipboard.writeText(text); toast('Din flyvetur er kopieret. Send den ud i det blå.'); }
  catch { openDialog('Din flyvetur, klar til deling.', `<p>Kopiér teksten nedenfor og del den, hvor du vil.</p><textarea class="share-text" id="share-text" readonly aria-label="Dit delbare resultat">${escape(text)}</textarea>`); $('share-text').select(); }
}

$('daily-tab').addEventListener('click', () => setMode('daily'));
$('practice-tab').addEventListener('click', () => setMode('practice'));
$('help').addEventListener('click', openHelp); $('stats').addEventListener('click', openStats); $('about').addEventListener('click', openAbout);
$('sound').addEventListener('click', () => { sound = !sound; saved.sound = sound; persist(); updateSound(); if (sound) beep(60); toast(sound ? 'Lyd er slået til.' : 'Lyd er slået fra.'); });
$('close-dialog').addEventListener('click', () => $('dialog').close());
$('dialog').addEventListener('click', event => { if (event.target === $('dialog')) { const bounds = $('dialog').getBoundingClientRect(); if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) $('dialog').close(); } });
window.addEventListener('pagehide', () => universe.tween?.kill());
document.addEventListener('visibilitychange', () => { document.body.classList.toggle('is-hidden',document.hidden); if (!document.hidden && page === 'question') tick(); });
window.addEventListener('pageshow', event => { if (page === 'question') tick(); if(event.persisted && page==='flying') renderFlight(); });
updateSound(); renderHome();
