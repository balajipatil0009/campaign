// Static only — no backend. Dummy checkout modal + UI interactions.
(function () {
  const modal = document.getElementById('modal');
  const closeBtn = document.getElementById('modalClose');
  const form = document.getElementById('demoForm');
  const step1 = document.getElementById('modalStep1');
  const step2 = document.getElementById('modalStep2');
  const payBtn = document.getElementById('payBtn');
  const sticky = document.getElementById('stickyBar');

  function openModal() {
    step1.hidden = false;
    step2.hidden = true;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-buy]').forEach((b) => b.addEventListener('click', openModal));
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
  document.getElementById('doneBtn').addEventListener('click', closeModal);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('fName').value.trim() || 'मित्र';
    payBtn.disabled = true;
    payBtn.textContent = 'Processing…';
    setTimeout(() => {
      document.getElementById('sName').textContent = name;
      document.getElementById('orderId').textContent =
        'DEMO-' + Math.floor(1000 + Math.random() * 9000);
      step1.hidden = true;
      step2.hidden = false;
      payBtn.disabled = false;
      payBtn.textContent = 'Pay ₹199 (Demo)';
    }, 1100);
  });

  // FAQ accordion
  document.querySelectorAll('.faq').forEach((item) => {
    const q = item.querySelector('.faq-q');
    q.addEventListener('click', () => {
      const open = item.classList.contains('open');
      document.querySelectorAll('.faq').forEach((f) => f.classList.remove('open'));
      if (!open) item.classList.add('open');
    });
  });

  // Sticky bar on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 480) sticky.classList.add('show');
    else sticky.classList.remove('show');
  }, { passive: true });

  document.getElementById('year').textContent = new Date().getFullYear();
})();
