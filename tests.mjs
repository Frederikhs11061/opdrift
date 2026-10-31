import test from 'node:test';
import assert from 'node:assert/strict';
import { QUESTIONS, BASE_QUESTIONS, drawFreshQuestions, dailyQuestions, migrateQuestionRun } from './bank.js';
import { TIERS, ROUND_MS, normalize, distance, checkAnswer, selectQuestions, seedFrom, dateKey, remainingSeconds, scoreRun, altitude, ROUND_COUNT, MAX_SCORE } from './engine.js';
const category = id => QUESTIONS.find(q => q.id === id);

test('20 seconds per question, including expiry while the tab is hidden', () => {
  assert.equal(ROUND_MS, 20000);
  assert.equal(remainingSeconds(25000, 5000), 20);
  assert.equal(remainingSeconds(25000, 24999), 1);
  assert.equal(remainingSeconds(25000, 25000), 0);
  assert.equal(remainingSeconds(25000, 99999), 0);
});
test('daily selection is reproducible, contains twenty unique categories, and varies by day', () => {
  const first = selectQuestions(QUESTIONS, seedFrom('2026-10-30')).map(q => q.id);
  assert.equal(first.length, ROUND_COUNT); assert.equal(new Set(first).size, ROUND_COUNT);
  assert.deepEqual(first, selectQuestions(QUESTIONS, seedFrom('2026-10-30')).map(q => q.id));
  assert.notDeepEqual(first, selectQuestions(QUESTIONS, seedFrom('2026-10-31')).map(q => q.id));
});
test('Danish midnight determines the daily board, including winter time', () => {
  assert.equal(dateKey(new Date('2026-10-30T22:59:59Z')), '2026-10-30');
  assert.equal(dateKey(new Date('2026-10-30T23:00:00Z')), '2026-10-31');
});
test('all curated answers and aliases are accepted with their assigned score', () => {
  for (const q of QUESTIONS) {
    for (const a of q.answers) {
      assert.ok(TIERS.some(t => t.points === a.points), q.id + ': invalid tier');
      for (const alias of [a.word, ...a.aliases]) {
        const checked = checkAnswer(q, alias);
        assert.equal(checked.status, 'correct', `${q.id}: ${alias}`);
        assert.equal(checked.answer.points, a.points, `${q.id}: conflicting score for ${alias}`);
      }
    }
  }
});
test('Danish letters, accents, punctuation, and capitalization are normalized', () => {
  assert.equal(normalize(' ÆBLE! '), normalize('aeble'));
  assert.equal(checkAnswer(category('capitals'), 'køBENhavn').answer.points, 10);
  assert.equal(checkAnswer(category('cheese'), 'Comte').answer.word, 'Comté');
  assert.equal(checkAnswer(category('elements'), 'Og').answer.word, 'Oganesson');
});
test('small spelling mistakes and transposed letters are accepted automatically', () => {
  for (const [id, input, word] of [['birds', 'Træskonbæ', 'Træskonæb'], ['fruit', 'bananna', 'Banan'], ['fruit', 'jabuticbaa', 'Jabuticaba'], ['instruments', 'thermin', 'Theremin']]) {
    const checked = checkAnswer(category(id), input);
    assert.equal(checked.status, 'correct', input); assert.equal(checked.autocorrect, true, input); assert.equal(checked.answer.word, word, input);
  }
  assert.equal(distance('abcde', 'acbde'), 1);
});
test('ambiguous corrections ask rather than silently choosing a different answer', () => {
  const fake = { answers: [{ word: 'Bane', aliases: [], points: 10 }, { word: 'Bade', aliases: [], points: 85 }] };
  assert.equal(checkAnswer(fake, 'bare').status, 'suggestion');
});
test('invalid and empty answers earn nothing and are not automatically accepted', () => {
  assert.equal(checkAnswer(category('fruit'), '').status, 'empty');
  assert.equal(checkAnswer(category('fruit'), 'boremaskine').status, 'invalid');
  assert.equal(checkAnswer(category('capitals'), 'Aarhus').status, 'invalid');
  assert.equal(checkAnswer(category('elements'), 'Xx').status, 'invalid');
});
test('twenty perfect answers equal 2,000 points / 20,000 metres; passes add zero', () => {
  const results = Array.from({length: ROUND_COUNT}, () => ({points: 100}));
  assert.equal(scoreRun(results), MAX_SCORE); assert.equal(altitude(scoreRun(results)), 20000);
  assert.equal(scoreRun([{points: 10}, {points: 0}, {points: 85}]), 95);
});
test('answer bank includes every chemical element exactly once', () => {
  assert.equal(category('elements').answers.length, 118);
  assert.equal(new Set(category('elements').answers.map(a => a.word)).size, 118);
});
test('practice deals a fresh deck without repeats across runs or at reshuffle',()=>{
  let seen=[],previous=[];
  for(let i=0;i<60;i++){
    const draw=drawFreshQuestions(QUESTIONS,seen,i);
    assert.equal(draw.questions.length,ROUND_COUNT);
    assert.equal(new Set(draw.questions.map(q=>q.baseId)).size,ROUND_COUNT);
    assert.ok(draw.questions.every(q=>!previous.includes(q.id)),`repeat at round ${i}`);
    previous=draw.questions.map(q=>q.id);seen=draw.seen;
  }
});
test('daily deck is shared and changes all twenty prompts the next day',()=>{
  const a=dailyQuestions(QUESTIONS,'2026-10-30').map(q=>q.id);
  const b=dailyQuestions(QUESTIONS,'2026-10-31').map(q=>q.id);
  assert.deepEqual(a,dailyQuestions(QUESTIONS,'2026-10-30').map(q=>q.id));
  assert.ok(b.every(id=>!a.includes(id)));
});

const {cameraLayout}=await import('./world-math.js');
test('world camera stays within its continuous map and near clouds travel faster',()=>{
 for(const [w,h] of [[390,844],[1440,900]]){
  const start=cameraLayout(0,w,h),mid=cameraLayout(100,w,h),end=cameraLayout(MAX_SCORE,w,h);
  assert.equal(end.y,0);assert.ok(start.y<mid.y&&mid.y<end.y);
  assert.ok(start.worldWidth>=w);assert.ok(start.worldHeight>=h);
  assert.ok(mid.clouds[0]-start.clouds[0]>mid.y-start.y);
 }
});

const {levelProgress,WORLDS,TRAVEL_VIEWPORTS}=await import('./world-math.js');
test('a legendary answer travels 2.4 screen heights, twelve times the old map rate',()=>{
 assert.equal(TRAVEL_VIEWPORTS,48);
 for(const [w,h] of [[390,844],[1440,900]]){
  assert.ok(Math.abs((cameraLayout(100,w,h).y-cameraLayout(0,w,h).y)/h-2.4)<.000001);
 }
});
test('the side ladder stops at the earned rarity and progresses monotonically',()=>{
 assert.equal(levelProgress(0).index,-1);
 [10,15,30,60,85,100].forEach((points,i)=>assert.equal(levelProgress(points).index,i));
 assert.equal(levelProgress(100).fraction,1);
 let previous=0;
 for(let points=0;points<=100;points+=.25){const p=levelProgress(points).fraction;assert.ok(p>=previous);previous=p;}
});
test('all eight regions are reachable and the world always covers the viewport',()=>{
 const visited=new Set();
 for(let score=0;score<=MAX_SCORE;score++){
  const layout=cameraLayout(score,390,844);visited.add(layout.zone);
  assert.ok(layout.panels.some(p=>p.visible));
  for(const y of [0,422,843])assert.ok(layout.panels.some(p=>p.top<=y&&p.top+p.height>=y));
 }
 assert.equal(visited.size,WORLDS.length);
});


test('all questions are natural topics without letter or spelling requirements',()=>{
 assert.equal(QUESTIONS.length,44);
 assert.equal(new Set(QUESTIONS.map(q=>q.prompt)).size,QUESTIONS.length);
 for(const question of QUESTIONS){
  assert.doesNotMatch(question.prompt+' '+question.rule,/bogstav|skal begynde|må ikke indeholde|mindst \d|højst \d/i);
  assert.ok(question.answers.length>=5,question.id);
 }
 for(const base of BASE_QUESTIONS)assert.equal(QUESTIONS.filter(q=>q.baseId===base.id).length,2);
});
test('saved letter questions become unrestricted without losing progress or points',()=>{
 const old={ids:BASE_QUESTIONS.slice(0,20).map(q=>q.id+'--no-e'),results:[{questionId:'fruit--no-e',word:'Mango',points:15,reason:'answer'}],index:1,phase:'question',endAt:123456};
 const migrated=migrateQuestionRun(old);
 assert.equal(migrated.ids.length,20);
 assert.ok(migrated.ids.every(id=>QUESTIONS.some(q=>q.id===id)));
 assert.equal(migrated.results[0].questionId,'fruit');
 assert.equal(scoreRun(migrated.results),15);
 assert.equal(migrated.endAt,old.endAt);
 assert.equal(migrated.index,old.index);
 assert.equal(migrated.phase,old.phase);
 assert.equal(old.ids[0],'fruit--no-e');
 assert.deepEqual(migrateQuestionRun(migrated),migrated);
 assert.equal(migrateQuestionRun({ids:['fruit-tropical'],results:[]}).ids[0],'fruit-tropical');
});
