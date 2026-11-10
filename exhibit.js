const exhibition = [...document.querySelectorAll('.station')];
const cabinet = document.querySelector('#card');
const menus = [...document.querySelectorAll('.work-menu')];
function routeExhibit() {
  const id = location.hash.slice(1);
  const target = document.getElementById(id);
  const active = target?.closest('.station');
  for (const station of exhibition) {
    station.hidden = station !== active;
    station.classList.toggle('is-active', station === active);
    if (station.hidden) station.querySelectorAll('video').forEach(video => video.pause());
  }
  cabinet.hidden = id !== 'card';
  for (const link of document.querySelectorAll('.stop')) {
    if (link.hash === '#' + active?.id) link.setAttribute('aria-current','true');
    else link.removeAttribute('aria-current');
  }
  if (target && (active || id === 'card')) requestAnimationFrame(() => target.scrollIntoView({block:'start'}));
}
document.body.classList.add('exhibit-ready');
addEventListener('hashchange', routeExhibit);
routeExhibit();
menus.forEach(menu => menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => menu.open = false)));
document.addEventListener('keydown', e => {if(e.key === 'Escape') menus.forEach(menu => {if(menu.open){menu.open=false;menu.querySelector('summary').focus();}});});
const kinetic = document.querySelector('.kinetic');
const rhythm = [...document.querySelectorAll('[data-beat]')];
rhythm.forEach(b => b.addEventListener('click', () => {
  kinetic.dataset.mode = b.dataset.beat;
  rhythm.forEach(x => x.setAttribute('aria-pressed', String(x === b)));
}));
document.querySelector('#motion-toggle').addEventListener('click', e => {
  const paused = kinetic.classList.toggle('is-paused');
  e.currentTarget.setAttribute('aria-pressed', String(paused));
  e.currentTarget.textContent = paused ? '播放动画' : '暂停动画';
});
