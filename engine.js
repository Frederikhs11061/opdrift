export const ROUND_COUNT = 20;
export const MAX_SCORE = ROUND_COUNT * 100;
export const TIERS = [
  { points: 0, name: 'Ingen opdrift', color: '#9c9dab', icon: '○', description: 'Et nyt forsøg venter i næste spørgsmål.' },
  { points: 10, name: 'Begynder', color: '#a5bbc7', icon: '·', description: 'Et klassisk svar. Ballonen letter.' },
  { points: 15, name: 'Øvet', color: '#9dc6b4', icon: '⌁', description: 'Det oplagte bud på noget uoplagt.' },
  { points: 30, name: 'Mid', color: '#badbb1', icon: '↗', description: 'Et godt bud. Du får vind i sejlene.' },
  { points: 60, name: 'Rare', color: '#dce9a3', icon: '✧', description: 'Her begynder det at blive sjældent.' },
  { points: 85, name: 'Ultra rare', color: '#f5c49c', icon: '✳', description: 'Langt fra det første, man tænker på.' },
  { points: 100, name: 'Legendarisk', color: '#f5a3af', icon: '✦', description: 'Et af kategoriens mest nicheprægede svar.' }
];
export const tierFor = points => TIERS.find(t => t.points === points) || TIERS[0];
export function normalize(value) {
  return String(value).toLowerCase().trim().replace(/æ/g, 'ae').replace(/ø/g, 'o').replace(/å/g, 'a').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '');
}
export function distance(a, b) {
  const grid = Array.from({length: a.length + 1}, () => Array(b.length + 1).fill(0));
  for (let i = 0; i <= a.length; i++) grid[i][0] = i;
  for (let j = 0; j <= b.length; j++) grid[0][j] = j;
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) {
    grid[i][j] = Math.min(grid[i - 1][j] + 1, grid[i][j - 1] + 1, grid[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) grid[i][j] = Math.min(grid[i][j], grid[i - 2][j - 2] + 1);
  }
  return grid[a.length][b.length];
}
export function checkAnswer(question, value) {
  const input = normalize(value);
  if (!input) return { status: 'empty' };
  let nearest = null, minimum = Infinity, tied = false;
  for (const answer of question.answers) {
    for (const alias of [answer.word, ...answer.aliases]) {
      const target = normalize(alias);
      if (input === target) return { status: 'correct', answer };
      const d = distance(input, target);
      if (d < minimum) { minimum = d; nearest = answer; tied = false; }
      else if (d === minimum && nearest !== answer) tied = true;
    }
  }
  const tolerance = input.length >= 8 ? 2 : input.length >= 3 ? 1 : 0;
  if (minimum <= tolerance && nearest && normalize(nearest.word).length >= 4) {
    return { status: tied ? 'suggestion' : 'correct', answer: nearest, autocorrect: !tied };
  }
  return { status: 'invalid' };
}
export function seedFrom(text) { return [...text].reduce((s, c) => Math.imul(s ^ c.charCodeAt(0), 16777619) >>> 0, 2166136261); }
export function selectQuestions(bank, seed, count = ROUND_COUNT) {
  const copy = [...bank]; let n = seed >>> 0;
  for (let i = copy.length - 1; i > 0; i--) { n = (Math.imul(n, 1664525) + 1013904223) >>> 0; const j = n % (i + 1); [copy[i], copy[j]] = [copy[j], copy[i]]; }
  return copy.slice(0, count);
}
export const dateKey = (date = new Date()) => new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Copenhagen' }).format(date);
export const ROUND_MS = 20000;
export const remainingSeconds = (endAt, now = Date.now()) => Math.max(0, Math.min(20, Math.ceil((endAt - now) / 1000)));
export function scoreRun(results) { return results.reduce((sum, result) => sum + result.points, 0); }
export const altitude = score => score * 10;
export function flightName(score) { return score >= MAX_SCORE * .85 ? 'Helt i det blå' : score >= MAX_SCORE * .64 ? 'Over skyerne' : score >= MAX_SCORE * .42 ? 'Højtflyver' : score >= MAX_SCORE * .21 ? 'God medvind' : score > 0 ? 'Vi er lettet' : 'Klar til en ny tur'; }
