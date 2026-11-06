export function initSiteSound() {
// Sound is unlocked by a deliberate interaction; motion is always part of the site.
let soundEnabled=false,audioContext,master,lastHover=0;
let scrollTexture,scrollFilter,scrollGain,scrollQuietTimer,scrollIntentUntil=0;
let soundScrollY=scrollY,soundScrollTime=performance.now();
try{soundEnabled=localStorage.getItem('cravo-sound')==='on'}catch{}
const soundButton=document.getElementById('sound-toggle');
function updateSoundButton(){soundButton.setAttribute('aria-pressed',String(soundEnabled));soundButton.setAttribute('aria-label',soundEnabled?'Desativar sons do site':'Ativar sons do site');soundButton.querySelector('use').setAttribute('href',soundEnabled?'#i-sound':'#i-muted')}
updateSoundButton();
if(soundEnabled)soundButton.parentElement.classList.add('engaged');
function createScrollTexture(){
  const buffer=audioContext.createBuffer(1,audioContext.sampleRate*2,audioContext.sampleRate);
  const samples=buffer.getChannelData(0);
  for(let i=0;i<samples.length;i++)samples[i]=Math.random()*2-1;
  scrollTexture=audioContext.createBufferSource();scrollTexture.buffer=buffer;scrollTexture.loop=true;
  scrollFilter=audioContext.createBiquadFilter();scrollFilter.type='bandpass';scrollFilter.frequency.value=600;scrollFilter.Q.value=.45;
  scrollGain=audioContext.createGain();scrollGain.gain.value=0;
  scrollTexture.connect(scrollFilter);scrollFilter.connect(scrollGain);scrollGain.connect(master);scrollTexture.start();
}
async function unlockAudio(){if(!soundEnabled)return;const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)return;try{if(!audioContext){audioContext=new Audio();master=audioContext.createGain();master.gain.value=.075;master.connect(audioContext.destination);createScrollTexture()}if(audioContext.state==='suspended')await audioContext.resume()}catch{}}
function quietScroll(){if(scrollGain&&audioContext)scrollGain.gain.setTargetAtTime(0,audioContext.currentTime,.08)}
function soundOnScroll(){
  const now=performance.now(),distance=Math.abs(scrollY-soundScrollY),elapsed=Math.max(now-soundScrollTime,16);
  soundScrollY=scrollY;soundScrollTime=now;
  if(!soundEnabled||!scrollGain||audioContext.state!=='running'||now>scrollIntentUntil||document.hidden)return;
  const strength=Math.min(distance/elapsed/1.4,1);
  scrollFilter.frequency.setTargetAtTime(350+strength*850,audioContext.currentTime,.07);
  scrollGain.gain.setTargetAtTime(strength*.13,audioContext.currentTime,.035);
  clearTimeout(scrollQuietTimer);scrollQuietTimer=setTimeout(quietScroll,95);
}
function markScrollIntent(){scrollIntentUntil=performance.now()+1000}
window.addEventListener('wheel',markScrollIntent,{passive:true});
window.addEventListener('touchmove',markScrollIntent,{passive:true});
document.addEventListener('keydown',e=>{if(['ArrowDown','ArrowUp','PageDown','PageUp','Home','End',' '].includes(e.key)&&!e.target.closest('input,textarea,select'))markScrollIntent()});
document.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener('click',markScrollIntent));
function tone(frequency,delay=0,duration=.1,type='sine',volume=.3){if(!soundEnabled||!audioContext||audioContext.state!=='running')return;const at=audioContext.currentTime+delay,osc=audioContext.createOscillator(),gain=audioContext.createGain();osc.type=type;osc.frequency.setValueAtTime(frequency,at);gain.gain.setValueAtTime(0,at);gain.gain.linearRampToValueAtTime(volume,at+.006);gain.gain.exponentialRampToValueAtTime(.001,at+duration);osc.connect(gain);gain.connect(master);osc.start(at);osc.stop(at+duration+.03)}
function playSound(kind){if(kind==='open'){tone(220,0,.16,'sine',.45);tone(330,.045,.17,'sine',.3);tone(440,.09,.22,'sine',.25)}else if(kind==='switch'){tone(440,0,.12,'sine',.35);tone(660,.055,.18,'sine',.28)}else if(kind==='hover'){tone(820,0,.045,'sine',.12)}else{tone(180,0,.055,'triangle',.4);tone(310,.018,.06,'sine',.2)}}
soundButton.addEventListener('click',async()=>{soundEnabled=!soundEnabled;try{localStorage.setItem('cravo-sound',soundEnabled?'on':'off')}catch{}updateSoundButton();soundButton.parentElement.classList.add('engaged');if(!soundEnabled)quietScroll();await unlockAudio();if(soundEnabled)playSound('switch')});
document.addEventListener('pointerdown',unlockAudio,{passive:true});
document.addEventListener('keydown',unlockAudio);
document.addEventListener('visibilitychange',()=>{if(document.hidden)quietScroll()});
document.addEventListener('pointerover',e=>{if(e.pointerType!=='mouse'||!soundEnabled)return;const element=e.target.closest('button,a');if(!element||element.contains(e.relatedTarget)||performance.now()-lastHover<90)return;lastHover=performance.now();playSound('hover')});
document.addEventListener('click',e=>{const element=e.target.closest('button,a');if(element&&!element.matches('#sound-toggle,.archive-box,.idea-switch'))playSound('click')});
return {playSound,soundOnScroll};
}
