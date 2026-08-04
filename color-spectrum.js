(function () {
  const track = document.getElementById('spectrum-track');
  const thumb = document.getElementById('linkedin-thumb');
  if (!track || !thumb) return;

  const STARTING_HUE = 215; // matches the site's original blue
  let hue = STARTING_HUE;
  let dragging = false;
  let didDrag = false;
  let startClientX = 0;
  let startLeft = 0;

  function maxTravel() {
    const trackWidth = track.getBoundingClientRect().width;
    const thumbWidth = thumb.getBoundingClientRect().width;
    return Math.max(trackWidth - thumbWidth, 1);
  }

  function applyHue(newHue) {
    hue = ((newHue % 360) + 360) % 360;
    document.documentElement.style.setProperty('--hue', hue);
  }

  function positionThumbForHue() {
    const left = (hue / 360) * maxTravel();
    thumb.style.left = left + 'px';
  }

  function setFromLeft(left) {
    const max = maxTravel();
    const clamped = Math.max(0, Math.min(left, max));
    thumb.style.left = clamped + 'px';
    applyHue((clamped / max) * 360);
  }

  // Initial paint + keep it correct across resizes/reflow
  window.addEventListener('load', positionThumbForHue);
  window.addEventListener('resize', positionThumbForHue);
  positionThumbForHue();

  thumb.addEventListener('pointerdown', (e) => {
    dragging = true;
    didDrag = false;
    startClientX = e.clientX;
    startLeft = thumb.getBoundingClientRect().left - track.getBoundingClientRect().left;
    thumb.setPointerCapture(e.pointerId);
    thumb.classList.add('is-dragging');
  });

  thumb.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    const dx = e.clientX - startClientX;
    if (Math.abs(dx) > 4) didDrag = true;
    if (didDrag) setFromLeft(startLeft + dx);
  });

  function endDrag() {
    dragging = false;
    thumb.classList.remove('is-dragging');
  }
  thumb.addEventListener('pointerup', endDrag);
  thumb.addEventListener('pointercancel', endDrag);

  // A drag shouldn't also trigger the LinkedIn navigation.
  // A plain click (no movement) still opens LinkedIn normally.
  thumb.addEventListener('click', (e) => {
    if (didDrag) {
      e.preventDefault();
      didDrag = false;
    }
  });
})();
