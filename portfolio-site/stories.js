(() => {
  const root=document.getElementById('video-carousel');if(!root)return;
  const items=window.PORTFOLIO.categories.find(c=>c.id==='video').items;
  root.className='work-carousel story-carousel';root.setAttribute('aria-label','Vídeos em formato stories');root.setAttribute('aria-roledescription','carrossel');
  const stage=document.createElement('div');stage.className='story-stage';stage.tabIndex=0;stage.setAttribute('aria-label','Use as setas para mudar de vídeo');
  const players=[],ready=[],cards=[];let active=0,visible=false,paused=false,muted=true,timer,initialized=false;
  function iconButton(label,path,className){const b=document.createElement('button');b.className=className;b.setAttribute('aria-label',label);b.title=label;b.innerHTML=`<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${path}"/></svg>`;return b;}
  items.forEach((item,i)=>{
    const card=document.createElement('article');card.className='story-card';
    const img=document.createElement('img');
    const videoId=new URL(item.youtube).searchParams.get('v');
    img.src=`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
    img.alt='';img.loading=i<3?'eager':'lazy';img.decoding='async';
    img.onerror=()=>{img.onerror=null;img.src=item.image;};
    img.onload=()=>{if(img.naturalWidth<500&&img.src.includes('maxresdefault'))img.src=item.image;};
    card.append(img);
    const host=document.createElement('div');host.id='story-player-'+i;card.append(host);
    const select=iconButton('Selecionar vídeo '+(i+1),'','story-select');select.onclick=()=>move(i-active);card.append(select);
    const fallback=iconButton('Reproduzir vídeo','m8 5 11 7-11 7Z','story-retry');fallback.hidden=true;fallback.onclick=()=>{paused=false;ready[i]&&players[i].playVideo();fallback.hidden=true;};card.append(fallback);
    stage.append(card);cards.push(card);
  });
  const prev=iconButton('Vídeo anterior','M20 12H4M11 5l-7 7 7 7','rail-arrow story-prev');
  const next=iconButton('Próximo vídeo','M4 12h16M13 5l7 7-7 7','rail-arrow story-next');
  const pause=iconButton('Pausar vídeos','M8 5v14M16 5v14','story-control');pause.setAttribute('aria-pressed','false');
  const sound=iconButton('Ativar som','M11 5 6 9H3v6h3l5 4ZM16 9l5 6M21 9l-5 6','story-control');sound.setAttribute('aria-pressed','false');
  const options=document.createElement('div');options.className='story-options';options.append(pause,sound);root.append(stage,prev,next,options);
  function schedule(){clearTimeout(timer);if(visible&&!document.hidden&&!paused)timer=setTimeout(()=>move(1),2000);}
  function sync(){
    clearTimeout(timer);
    if(initialized) [active,(active+1)%items.length,(active+2)%items.length].forEach(ensurePlayer);
    cards.forEach((card,i)=>{
      const offset=(i-active+items.length)%items.length;
      card.className='story-card '+(offset===0?'story-current':offset===1?'story-next-card':offset===items.length-1?'story-prev-card':'story-hidden');
      card.inert=offset!==0&&offset!==1&&offset!==items.length-1;
      const frame=card.querySelector('iframe');if(frame)frame.tabIndex=offset===0?0:-1;
      if(!ready[i])return;
      if(i===active&&visible&&!document.hidden&&!paused){muted?players[i].mute():players[i].unMute();players[i].playVideo();}
      else {players[i].mute();players[i].pauseVideo();}
    });
    if(ready[active]&&players[active].getPlayerState()===1)schedule();
  }
  function move(delta){active=(active+delta+items.length)%items.length;sync();}
  prev.onclick=()=>move(-1);next.onclick=()=>move(1);
  pause.onclick=()=>{paused=!paused;pause.setAttribute('aria-pressed',String(paused));pause.setAttribute('aria-label',paused?'Continuar vídeos':'Pausar vídeos');pause.title=paused?'Continuar vídeos':'Pausar vídeos';pause.querySelector('path').setAttribute('d',paused?'m8 5 11 7-11 7Z':'M8 5v14M16 5v14');sync();};
  sound.onclick=()=>{muted=!muted;sound.setAttribute('aria-pressed',String(!muted));sound.setAttribute('aria-label',muted?'Ativar som':'Silenciar');sound.title=muted?'Ativar som':'Silenciar';sound.querySelector('path').setAttribute('d',muted?'M11 5 6 9H3v6h3l5 4ZM16 9l5 6M21 9l-5 6':'M11 5 6 9H3v6h3l5 4ZM16 8c3 2 3 6 0 8M19 5c5 4 5 10 0 14');sync();};
  stage.onkeydown=e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();move(e.key==='ArrowRight'?1:-1);}};
  let touchX=0,touchY=0;stage.addEventListener('touchstart',e=>{touchX=e.changedTouches[0].clientX;touchY=e.changedTouches[0].clientY;},{passive:true});stage.addEventListener('touchend',e=>{const x=e.changedTouches[0].clientX-touchX,y=e.changedTouches[0].clientY-touchY;if(Math.abs(x)>40&&Math.abs(x)>Math.abs(y))move(x<0?1:-1);},{passive:true});
  function ensurePlayer(i){
    if(players[i]||!window.YT?.Player)return;
    const item=items[i];
      const id=new URL(item.youtube).searchParams.get('v');
      players[i]=new YT.Player('story-player-'+i,{host:'https://www.youtube-nocookie.com',videoId:id,playerVars:{autoplay:0,mute:1,controls:0,playsinline:1,rel:0,loop:1,playlist:id,origin:location.origin},events:{
        onReady:event=>{ready[i]=true;event.target.mute();event.target.getIframe().setAttribute('title','Vídeo '+(i+1));sync();},
        onStateChange:event=>{if(i===active&&event.data===1){cards[i].classList.add('has-playback');cards[i].querySelector('.story-retry').hidden=true;schedule();}else if(i===active&&event.data===0)move(1);},
        onAutoplayBlocked:()=>{if(i===active)cards[i].querySelector('.story-retry').hidden=false;},
        onError:()=>{cards[i].classList.add('story-error');const link=document.createElement('a');link.href=item.youtube;link.target='_blank';link.rel='noopener noreferrer';link.textContent='Assistir ao vídeo';link.className='story-error-link';if(!cards[i].querySelector('.story-error-link'))cards[i].append(link);if(i===active)schedule();}
      }});
  }
  function initialize(){
    if(initialized||!window.YT?.Player)return;initialized=true;
    [0,1,2].forEach(ensurePlayer);
  }
  if(window.YT?.Player)initialize();
  else {
    window.onYouTubeIframeAPIReady=initialize;
    const script=document.createElement('script');script.id='youtube-player-api';script.src='https://www.youtube.com/iframe_api';document.head.append(script);
  }
  const observer=new IntersectionObserver(entries=>{visible=entries[0].intersectionRatio>=.2;sync();},{threshold:[0,.2]});observer.observe(stage);
  document.addEventListener('visibilitychange',sync);window.addEventListener('pagehide',()=>{clearTimeout(timer);players.forEach((p,i)=>{if(ready[i])p.pauseVideo();});});window.addEventListener('pageshow',sync);sync();
})();
