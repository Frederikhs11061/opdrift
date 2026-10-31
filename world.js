import { gsap } from './node_modules/gsap/index.js';
import { TIERS } from './engine.js';
import { cameraLayout, WORLDS, levelProgress } from './world-math.js';
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
export class Universe {
 constructor(){
  this.state={score:0,tilt:0};this.tween=null;this.lastTier=-1;
  this.image=document.getElementById('world-image');this.viewport=document.querySelector('.world-viewport');this.ship=document.getElementById('balloon-position');this.passing=document.getElementById('flight-passing');this.clouds=[...document.querySelectorAll('.cloud-plane')];
  this.image.replaceChildren();
  this.panels=WORLDS.map((world,i)=>{const panel=document.createElement('div');panel.className='world-panel'+(i?' blended':'');panel.dataset.world=String(i);const img=document.createElement('img');img.alt='';img.width=724;img.height=2172;img.decoding='async';img.dataset.src=`assets/${world.asset}.png`;panel.append(img);this.image.append(panel);return panel;});
  this.createLevels();this.resize=()=>this.paint();window.addEventListener('resize',this.resize);this.makeDust();this.paint();
 }
 createLevels(){
  const aside=document.createElement('aside');aside.className='level-ladder';aside.setAttribute('aria-label','Niveauer for dit svar');
  aside.innerHTML=`<div class="level-ladder-title">DIT SVARS NIVEAU</div><div class="level-track"><div id="level-track-fill"></div></div><ol>${TIERS.slice(1).reverse().map((t,i)=>`<li data-points="${t.points}" style="--rank:${t.color}"><span class="rank-medal">${6-i}</span><div><b>${t.name}</b><small>${t.points} point</small></div></li>`).join('')}</ol><div class="level-verdict" id="level-verdict">Vi letter …</div>`;
  document.getElementById('flight-scene').append(aside);this.ladder=aside;this.levelItems=[...aside.querySelectorAll('li')];this.updateLevels(0);
 }
 updateLevels(earned){
  const progress=levelProgress(earned),tiers=TIERS.slice(1),active=tiers[progress.index];
  this.levelItems.forEach(item=>{const p=Number(item.dataset.points);item.classList.toggle('passed',earned>=p-.01);item.classList.toggle('active',p===active?.points);if(p===active?.points)item.setAttribute('aria-current','step');else item.removeAttribute('aria-current');});
  document.getElementById('level-track-fill').style.transform=`scaleY(${progress.fraction})`;
  document.getElementById('level-verdict').textContent=active?active.name:'Vi letter …';
 }
 makeDust(){const box=document.getElementById('star-dust');for(let i=0;i<35;i++){const star=document.createElement('i');star.style.cssText=`left:${(i*31.7)%100}%;top:${(i*17.9)%100}%;--delay:${-(i%8)*.5}s;--speed:${.65+(i%4)*.25}s`;box.append(star);}}
 paint(){
  const w=innerWidth,h=innerHeight,layout=cameraLayout(this.state.score,w,h);
  this.image.style.width='100%';this.image.style.height='100%';this.image.style.transform='none';
  this.panels.forEach((panel,i)=>{const p=layout.panels[i];panel.style.visibility=p.visible?'visible':'hidden';panel.style.willChange=p.visible&&document.body.classList.contains('traveling')?'transform':'auto';panel.style.width=p.width+'px';panel.style.height=p.height+'px';panel.style.setProperty('--blend',layout.blend+'px');panel.style.transform=`translate3d(${p.x}px,${p.top}px,0)`;const img=panel.firstElementChild;if(p.preload&&!img.getAttribute('src'))img.src=img.dataset.src;});
  this.clouds.forEach((cloud,i)=>{const y=layout.clouds[i];cloud.style.transform=`translate3d(-50%,${y}px,0)`;cloud.style.visibility=y>h||y<-(w+160)*.67?'hidden':'visible';});
  this.ship.style.transform=`translate(-50%,calc(-50% - ${layout.progress*40}px)) rotate(${this.state.tilt||0}deg)`;
  document.getElementById('height-value').textContent=new Intl.NumberFormat('da-DK').format(Math.round(this.state.score*10));
  const zone=WORLDS[layout.zone].name;document.getElementById('world-zone').textContent=zone;document.getElementById('world-zone').dataset.zone=String(layout.zone);
  document.getElementById('flight-scene').setAttribute('aria-label',`Din ballon er ${Math.round(this.state.score*10)} meter oppe. ${zone}.`);
 }
 set(score){this.tween?.kill();document.body.classList.remove('traveling');gsap.set(this.viewport,{opacity:1});this.state.score=score;this.state.tilt=0;this.passing.textContent='';this.paint();}
 fly(from,to,tiers,onTier,complete){
  this.tween?.kill();this.state.score=from;this.state.tilt=-5;this.lastTier=-1;this.updateLevels(0);this.paint();
  const finish=()=>{document.body.classList.remove('traveling');this.passing.textContent='';this.state.score=to;this.state.tilt=0;this.paint();this.updateLevels(to-from);this.ladder.classList.add('landed');complete();};
  this.ladder.classList.remove('landed');
  if(reduced){this.state.score=to;this.state.tilt=0;this.paint();this.updateLevels(to-from);this.tween=gsap.fromTo(this.viewport,{opacity:.35},{opacity:1,duration:.25,ease:'power1.out',onComplete:finish});return;}
  document.body.classList.add('traveling');
  const update=()=>{this.paint();const earned=this.state.score-from;this.updateLevels(earned);const {index}=levelProgress(earned);if(index>this.lastTier){this.lastTier=index;if(index>=0){this.passing.textContent=tiers[index].name;this.passing.classList.remove('passing');void this.passing.offsetWidth;this.passing.classList.add('passing');onTier(tiers[index]);}}};
  this.tween=gsap.to(this.state,{score:to,tilt:0,duration:4.8+(to-from)*.034,ease:'power2.inOut',onUpdate:update,onComplete:finish});
 }
 destroy(){this.tween?.kill();this.ladder.remove();window.removeEventListener('resize',this.resize);}
}
