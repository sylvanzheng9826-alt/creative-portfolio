const hookButtons = [...document.querySelectorAll('[data-hook]')];
function selectHook(active) {
  for (const button of hookButtons) {
    const selected = button === active;
    button.setAttribute('aria-pressed', String(selected));
    document.getElementById(button.getAttribute('aria-controls')).hidden = !selected;
  }
}
if (hookButtons.length) selectHook(hookButtons[0]);
hookButtons.forEach(button => button.addEventListener('click', () => selectHook(button)));
