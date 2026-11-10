const buttons = [...document.querySelectorAll('[data-stamp]')];
const key = 'yueyuan-passport-v1';
let marks = new Set();
try {
  const stored = JSON.parse(localStorage.getItem(key) || '[]');
  if (Array.isArray(stored)) marks = new Set(stored.filter(id => buttons.some(b => b.dataset.stamp === id)));
} catch {}
function render(active) {
  for (const b of buttons) {
    const id = b.dataset.stamp;
    const stamped = marks.has(id);
    const station = b.closest('.station');
    const mark = station.querySelector('.stamp-mark');
    const card = document.querySelector('[data-card="' + id + '"]');
    b.setAttribute('aria-pressed', String(stamped));
    b.textContent = (stamped ? '已盖章 · ' : '盖章 · ') + station.querySelector('h2').textContent;
    station.classList.toggle('is-stamped', stamped);
    mark.textContent = stamped ? '已打卡' : '未盖章';
    mark.classList.toggle('pop', active === id);
    card.classList.toggle('collected', stamped);
    card.querySelector('.card-dot').textContent = stamped ? '✳' : '○';
    document.querySelector('[data-route="' + id + '"]').textContent = stamped ? '已盖章 ✓' : '进入 →';
  }
  document.querySelector('#count').textContent = marks.size + ' / 4 已盖章';
  document.querySelector('#progress').value = marks.size;
  const complete = marks.size === buttons.length;
  document.querySelector('#card').classList.toggle('complete', complete);
  document.querySelector('#card-note').textContent = complete ? '四枚印章已集齐。点击任一能力，回看对应的作品。' : '每完成一站，这里就会点亮一项能力。';
  if (active) document.querySelector('#announcement').textContent = complete ? '四站打卡完成。' : '盖章成功，已完成 ' + marks.size + ' 站。';
}
for (const b of buttons) b.addEventListener('click', () => {
  if (marks.has(b.dataset.stamp)) return;
  marks.add(b.dataset.stamp);
  try { localStorage.setItem(key, JSON.stringify([...marks])); } catch {}
  render(b.dataset.stamp);
});
render();
