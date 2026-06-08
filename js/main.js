/* Savannah Bean Coffee Ltd — Site Interactions */
(function(){
  'use strict';

  // ===== Header scroll state =====
  const header = document.querySelector('.site-header');
  const onScroll = () => {
    if(!header) return;
    if(window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  // ===== Mobile nav =====
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-header nav');
  if(toggle && nav){
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      document.body.classList.toggle('menu-open');
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('open');
      document.body.classList.remove('menu-open');
    }));
  }

  // ===== Scroll reveal =====
  const revealEls = document.querySelectorAll('.reveal');
  const inViewport = (el) => {
    const r = el.getBoundingClientRect();
    return r.top < (window.innerHeight || document.documentElement.clientHeight) && r.bottom > 0;
  };
  if('IntersectionObserver' in window && revealEls.length){
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, {threshold:0, rootMargin:'0px 0px -10% 0px'});
    revealEls.forEach(el => io.observe(el));
    // Immediately reveal anything already in viewport (no scroll needed)
    requestAnimationFrame(() => {
      revealEls.forEach(el => { if(inViewport(el)) el.classList.add('in'); });
    });
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  // ===== Lightbox (gallery) =====
  const items = document.querySelectorAll('.masonry-item');
  const lb = document.getElementById('lightbox');
  if(items.length && lb){
    const lbImg = lb.querySelector('img');
    const closeBtn = lb.querySelector('.lightbox-close');
    const prevBtn = lb.querySelector('.lightbox-prev');
    const nextBtn = lb.querySelector('.lightbox-next');
    let idx = 0;
    const sources = Array.from(items).map(i => i.querySelector('img').getAttribute('src'));

    const open = (i) => {
      idx = i;
      lbImg.src = sources[idx];
      lb.classList.add('open');
      document.body.style.overflow = 'hidden';
    };
    const close = () => { lb.classList.remove('open'); document.body.style.overflow = ''; };
    const step = (n) => { idx = (idx + n + sources.length) % sources.length; lbImg.src = sources[idx]; };

    items.forEach((it, i) => it.addEventListener('click', () => open(i)));
    closeBtn.addEventListener('click', close);
    prevBtn.addEventListener('click', () => step(-1));
    nextBtn.addEventListener('click', () => step(1));
    lb.addEventListener('click', (e) => { if(e.target === lb) close(); });
    document.addEventListener('keydown', (e) => {
      if(!lb.classList.contains('open')) return;
      if(e.key === 'Escape') close();
      if(e.key === 'ArrowLeft') step(-1);
      if(e.key === 'ArrowRight') step(1);
    });
  }

  // ===== Contact form validation =====
  const form = document.getElementById('contact-form');
  if(form){
    const successBox = form.querySelector('.form-success');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;
      form.querySelectorAll('.field').forEach(f => f.classList.remove('invalid'));

      const required = ['fullname','country','email','message'];
      required.forEach(name => {
        const el = form.querySelector(`[name="${name}"]`);
        if(!el) return;
        if(!el.value.trim()){ el.closest('.field').classList.add('invalid'); valid = false; }
      });
      const email = form.querySelector('[name="email"]');
      if(email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)){
        email.closest('.field').classList.add('invalid'); valid = false;
      }
      if(!valid) return;
      successBox.classList.add('show');
      form.reset();
      setTimeout(() => successBox.classList.remove('show'), 6000);
      successBox.scrollIntoView({behavior:'smooth', block:'center'});
    });
  }

  //countries
       // ===== Countries dropdown =====
  const countries = [
    "Afghanistan","Albania","Algeria","Andorra","Angola","Argentina","Armenia","Australia",
    "Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Belgium","Benin","Bhutan",
    "Botswana","Brazil","Bulgaria","Burundi","Cameroon","Canada","Chad","Chile","China",
    "Colombia","Congo","Costa Rica","Croatia","Cuba","Cyprus","Czech Republic","Denmark",
    "Djibouti","Egypt","Ethiopia","Finland","France","Germany","Ghana","Greece","Guinea",
    "Hungary","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Jamaica","Japan",
    "Jordan","Kenya","Kuwait","Lebanon","Lesotho","Liberia","Libya","Madagascar","Malawi",
    "Malaysia","Mali","Mexico","Morocco","Mozambique","Namibia","Nepal","Netherlands",
    "New Zealand","Nigeria","Norway","Pakistan","Peru","Philippines","Poland","Portugal",
    "Qatar","Romania","Russia","Rwanda","Saudi Arabia","Senegal","Singapore","Somalia",
    "South Africa","South Korea","Spain","Sri Lanka","Sudan","Sweden","Switzerland",
    "Tanzania","Thailand","Tunisia","Turkey","Uganda","Ukraine","United Arab Emirates",
    "United Kingdom","United States","Uruguay","Vietnam","Yemen","Zambia","Zimbabwe"
  ];

  const countrySelect = document.getElementById("country");

  if (countrySelect) {
    countries.forEach(country => {
      const option = document.createElement("option");
      option.value = country;
      option.textContent = country;

      // optional UX improvement: preselect Kenya
      if (country === "Kenya") option.selected = true;

      countrySelect.appendChild(option);
    });
  }

  //send email
        function sendMail(event){
        event.preventDefault();

        const name = document.getElementById("fullname").value;
        const country = document.getElementById("country").value;
        const phone = document.getElementById("phone").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        const subject = "New Coffee Export Inquiry - Savannah Bean Coffee Ltd";

        const body = `
      Name: ${name}
      Country: ${country}
      Phone: ${phone}
      Email: ${email}

      Message:
      ${message}
        `;

        const mailtoLink = `mailto:langatbright001@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        window.location.href = mailtoLink;

        return false;
      }

  // ===== Year =====
  const y = document.getElementById('year');
  if(y) y.textContent = new Date().getFullYear();
})();
