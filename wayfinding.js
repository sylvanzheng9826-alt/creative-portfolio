let scrollFrame = 0;
function showReadingProgress() {
  scrollFrame = 0;
  const max = document.documentElement.scrollHeight - innerHeight;
  document.documentElement.style.setProperty('--read', max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0);
}
function requestProgress() { if (!scrollFrame) scrollFrame = requestAnimationFrame(showReadingProgress); }
addEventListener('scroll', requestProgress, {passive:true});
addEventListener('resize', requestProgress);
addEventListener('hashchange', requestProgress);
requestProgress();
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    for (const e of entries) if(e.isIntersecting){
      e.target.classList.add('entered'); observer.unobserve(e.target);
    }
  }, {threshold:.08});
  document.querySelectorAll('.project,.next-stop').forEach(el => observer.observe(el));
}
for(const b of document.querySelectorAll('[data-stamp]')){
  let played = b.getAttribute('aria-pressed') === 'true';
  b.addEventListener('click',()=>{
    if(played || reduced.matches || b.getAttribute('aria-pressed') !== 'true') return;
    played = true;
    for(let i=0;i<8;i++){
      const spark=document.createElement('span');
      spark.className='stamp-particle';spark.textContent=i%2?'✦':'·';spark.setAttribute('aria-hidden','true');
      const a=i*Math.PI/4;
      spark.style.setProperty('--dx', (47*Math.cos(a))+'px');
      spark.style.setProperty('--dy', (47*Math.sin(a))+'px');
      b.parentElement.append(spark);
      setTimeout(()=>spark.remove(),720);
    }
  });
}
const viewer=document.querySelector('#gallery-view');
const posters=[...document.querySelectorAll('#posters .gallery a')];
if(viewer?.showModal && posters.length){
  let index=0;
  function show(i){
    index=(i+posters.length)%posters.length;
    const source=posters[index], img=viewer.querySelector('img');
    img.src=source.href; img.alt=source.querySelector('img').alt;
    viewer.querySelector('a').href=source.href;
    viewer.querySelector('#gallery-label').textContent=(index+1)+' / '+posters.length+' · '+source.querySelector('figcaption strong').textContent;
  }
  posters.forEach((link,i)=>link.addEventListener('click',e=>{
    if(e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
    e.preventDefault();show(i);viewer.showModal();
  }));
  viewer.querySelector('[data-close]').onclick=()=>viewer.close();
  viewer.querySelector('[data-prev]').onclick=()=>show(index-1);
  viewer.querySelector('[data-next]').onclick=()=>show(index+1);
  viewer.addEventListener('keydown',e=>{
    if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();show(index+(e.key==='ArrowRight'?1:-1));}
  });
  viewer.addEventListener('click',e=>{if(e.target===viewer){const r=viewer.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)viewer.close();}});
}
