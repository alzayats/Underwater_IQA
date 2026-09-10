/* UNIQAT project page.
   Two behaviours only: the before/after comparison on the home page, and a
   lightbox on the gallery. Everything else the previous version did (scroll
   reveals, smooth-scroll shims, a hamburger for four links) has been removed;
   CSS handles it or it was decoration. */

(function initCompare() {
  const fig = document.getElementById('compare');
  if (!fig) return;

  const set = (ratio) => {
    const pct = Math.min(100, Math.max(0, ratio * 100));
    fig.style.setProperty('--split', pct.toFixed(2) + '%');
    fig.setAttribute('aria-valuenow', Math.round(pct));
  };

  const fromEvent = (e) => {
    const rect = fig.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    set(x / rect.width);
  };

  let dragging = false;
  fig.addEventListener('pointerdown', (e) => {
    dragging = true;
    fig.setPointerCapture(e.pointerId);
    fromEvent(e);
  });
  fig.addEventListener('pointermove', (e) => { if (dragging) fromEvent(e); });
  fig.addEventListener('pointerup', (e) => {
    dragging = false;
    if (fig.hasPointerCapture(e.pointerId)) fig.releasePointerCapture(e.pointerId);
  });
  fig.addEventListener('pointercancel', () => { dragging = false; });

  // Keyboard access: the comparison is content, not decoration.
  fig.tabIndex = 0;
  fig.setAttribute('role', 'slider');
  fig.setAttribute('aria-label', 'Compare the degraded and recovered rendering of the same reef scene');
  fig.setAttribute('aria-valuemin', '0');
  fig.setAttribute('aria-valuemax', '100');
  fig.addEventListener('keydown', (e) => {
    const current = parseFloat(fig.style.getPropertyValue('--split')) || 50;
    const step = e.shiftKey ? 10 : 2;
    if (e.key === 'ArrowLeft') { set((current - step) / 100); e.preventDefault(); }
    if (e.key === 'ArrowRight') { set((current + step) / 100); e.preventDefault(); }
    if (e.key === 'Home') { set(0); e.preventDefault(); }
    if (e.key === 'End') { set(1); e.preventDefault(); }
  });

  set(0.5);
})();

(function initLightbox() {
  const items = document.querySelectorAll('.gallery-item');
  if (!items.length) return;

  const overlay = document.createElement('div');
  overlay.className = 'lightbox';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.hidden = true;
  overlay.innerHTML = '<button class="lightbox-close" aria-label="Close">Close</button><img alt="">';
  document.body.appendChild(overlay);

  const img = overlay.querySelector('img');
  const close = () => { overlay.hidden = true; document.body.style.overflow = ''; };

  items.forEach((item) => {
    const thumb = item.querySelector('img');
    if (!thumb) return;
    item.style.cursor = 'zoom-in';
    item.addEventListener('click', () => {
      img.src = thumb.src;
      img.alt = thumb.alt || '';
      overlay.hidden = false;
      document.body.style.overflow = 'hidden';
      overlay.querySelector('.lightbox-close').focus();
    });
  });

  overlay.addEventListener('click', (e) => { if (e.target !== img) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !overlay.hidden) close(); });
})();

(function initCodeCopy() {
  document.querySelectorAll('pre').forEach((pre) => {
    const btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.textContent = 'Copy';
    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(pre.innerText);
        btn.textContent = 'Copied';
        setTimeout(() => { btn.textContent = 'Copy'; }, 1600);
      } catch (err) {
        btn.textContent = 'Select and copy';
      }
    });
    pre.style.position = 'relative';
    pre.appendChild(btn);
  });
})();
