// menu toggle for mobile
document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      if (mainNav.style.display === 'flex') {
        mainNav.style.display = 'none';
      } else {
        mainNav.style.display = 'flex';
        mainNav.style.flexDirection = 'column';
        mainNav.style.gap = '12px';
      }
    });
  }

  // smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // share button (uses native share if available)
  const shareBtn = document.getElementById('shareBtn');
  if (shareBtn) {
    shareBtn.addEventListener('click', async () => {
      const shareData = {
        title: 'Anúncio do Bem',
        text: 'Conheça o Anúncio do Bem — assista anúncios e gere impacto social.',
        url: window.location.href
      };
      if (navigator.share) {
        try {
          await navigator.share(shareData);
        } catch (err) {
          console.log('share canceled', err);
        }
      } else {
        // fallback: copy url
        navigator.clipboard.writeText(window.location.href);
        alert('Link copiado. Compartilhe com seus amigos!');
      }
    });
  }

  // simple stat animation (numbers start at 0)
  const statEls = document.querySelectorAll('.stat-value');
  statEls.forEach(el => {
    const target = parseInt(el.dataset.target || '0', 10);
    if (!isNaN(target) && target > 0) {
      let current = 0;
      const step = Math.max(1, Math.floor(target / 60));
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          el.textContent = target.toLocaleString('pt-BR');
          clearInterval(timer);
        } else {
          el.textContent = current.toLocaleString('pt-BR');
        }
      }, 16);
    }
  });

  // set year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
