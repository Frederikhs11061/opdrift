import { MAX_SCORE, TIERS } from './engine.js';
export const TRAVEL_VIEWPORTS = 48;
export const WORLDS = [
 {name:'Jorden og himmelhavet',asset:'universe'},
 {name:'De svævende øer',asset:'islands'},
 {name:'Asteroidebæltet',asset:'orbit'},
 {name:'Iskrystallernes verden',asset:'ice'},
 {name:'Ildplanetens kløfter',asset:'rift'},
 {name:'Den ydre stjernetåge',asset:'orbit'},
 {name:'Aurora-universet',asset:'ice'},
 {name:'Galakseporten',asset:'rift'}
];
export function levelProgress(points){
 const tiers=TIERS.slice(1);let index=-1;
 tiers.forEach((t,i)=>{if(points>=t.points-.01)index=i;});
 if(index<0)return {index:-1,fraction:0};
 if(index===tiers.length-1)return {index,fraction:1};
 const between=(points-tiers[index].points)/(tiers[index+1].points-tiers[index].points);
 return {index,fraction:Math.max(0,Math.min(1,(index+between)/(tiers.length-1)))};
}
export function cameraLayout(score,width,height){
 const progress=Math.max(0,Math.min(1,score/MAX_SCORE));
 const span=height*TRAVEL_VIEWPORTS,worldHeight=span+height,y=span*(progress-1);
 const section=worldHeight/WORLDS.length,blend=height*.65;
 const panelHeight=section+blend,worldWidth=Math.max(width,panelHeight/3);
 const panels=WORLDS.map((world,i)=>{
  const top=worldHeight-(i+1)*section-blend+y;
  const pan=Math.sin(progress*Math.PI*3+i*.8)*(worldWidth-width)*.18;
  return {...world,index:i,top,width:worldWidth,height:panelHeight,x:-(worldWidth-width)/2+pan,visible:top<height+180&&top+panelHeight> -180,preload:top<height*3&&top+panelHeight> -height*2};
 });
 const center=height*.36;let zone=0;
 for(let i=0;i<panels.length;i++)if(panels[i].top+blend*.5<=center&&panels[i].top+panelHeight>=center)zone=i;
 return {progress,worldHeight,worldWidth,span,y,panels,blend,zone,x:panels[zone].x,clouds:[0,700,1150].map((anchor,i)=>height*.35+(score-anchor)/MAX_SCORE*span*[1.6,1.8,1.5][i])};
}
