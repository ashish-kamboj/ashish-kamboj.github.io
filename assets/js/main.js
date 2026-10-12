/**
* Template Name: iPortfolio - v3.0.1
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    }
    return document.querySelector(el);
  };

  const on = (type, el, listener, all = false) => {
    const selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener);
  };

  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const navbarlinks = select('#navbar .scrollto', true);
  const navbarlinksActive = () => {
    const position = window.scrollY + 200;
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return;
      const section = select(navbarlink.hash);
      if (!section) return;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active');
      } else {
        navbarlink.classList.remove('active');
      }
    });
  };
  window.addEventListener('load', navbarlinksActive);
  onscroll(document, navbarlinksActive);

  const scrollto = (el) => {
    const target = select(el);
    if (!target) return;
    const elementPos = target.offsetTop;
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    });
  };

  const backtotop = select('.back-to-top');
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active');
      } else {
        backtotop.classList.remove('active');
      }
    };
    window.addEventListener('load', toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  on('click', '.mobile-nav-toggle', function() {
    select('body').classList.toggle('mobile-nav-active');
    this.classList.toggle('bi-list');
    this.classList.toggle('bi-x');
  });

  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault();

      const body = select('body');
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active');
        const navbarToggle = select('.mobile-nav-toggle');
        navbarToggle.classList.toggle('bi-list');
        navbarToggle.classList.toggle('bi-x');
      }
      scrollto(this.hash);
    }
  }, true);

  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash);
      }
    }
  });

  const typed = select('.typed');
  if (typed) {
    let typedStrings = typed.getAttribute('data-typed-items');
    typedStrings = typedStrings.split(',');
    new Typed('.typed', {
      strings: typedStrings,
      loop: true,
      typeSpeed: 90,
      backSpeed: 50,
      backDelay: 1400
    });
  }

  const portfolioContainer = select('.portfolio-container');
  if (portfolioContainer) {
    const portfolioIsotope = new Isotope(portfolioContainer, {
      itemSelector: '.portfolio-item'
    });

    const portfolioFilters = select('#portfolio-flters li', true);
    on('click', '#portfolio-flters li', function(e) {
      e.preventDefault();
      portfolioFilters.forEach((el) => el.classList.remove('filter-active'));
      this.classList.add('filter-active');
      portfolioIsotope.arrange({
        filter: this.getAttribute('data-filter')
      });
      portfolioIsotope.on('arrangeComplete', () => AOS.refresh());
    }, true);
  }

  if (typeof GLightbox !== 'undefined') {
    GLightbox({ selector: '.portfolio-lightbox' });
  }

  if (typeof Swiper !== 'undefined' && select('.portfolio-details-slider')) {
    new Swiper('.portfolio-details-slider', {
      speed: 400,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      }
    });
  }

  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  });
})();