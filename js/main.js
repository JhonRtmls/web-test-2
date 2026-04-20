document.documentElement.classList.add('js-enabled');

document.addEventListener('DOMContentLoaded', () => {

  /* ---- GSAP Registration ---- */
  gsap.registerPlugin(ScrollTrigger);

  /* ---- Lenis Smooth Scroll ---- */
  const lenis = new Lenis();
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  /* ---- Magnetic Buttons Effect ---- */
  const magneticEls = document.querySelectorAll('.btn-pill-orange, .btn-hero-red, .btn-hero-white, .btn-cta-white, .social-pill, .btn-stack-view');
  magneticEls.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = el.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      
      gsap.to(el, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.4,
        ease: "power2.out"
      });
    });
    
    el.addEventListener('mouseleave', () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.3)"
      });
    });
  });

  /* ---- Hero Entrance Animation ---- */
  const heroTl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.8 } });
  
  heroTl.from(".hero-frame", {
    scale: 1.15,
    filter: "blur(10px)",
    opacity: 0,
    duration: 3,
  })
  .from(".hero-meta-labels span", {
    y: 30,
    opacity: 0,
    stagger: 0.1,
  }, "-=2.2")
  .from(".hero-description", {
    y: 40,
    opacity: 0,
  }, "-=1.8")
  .from(".hero-actions a", {
    y: 30,
    opacity: 0,
    stagger: 0.15,
  }, "-=1.5");

  /* ---- Split Text Reveal ---- */
    const splitTitles = document.querySelectorAll('.page-title, .section-title, .hub-center-text, .sidebar-title');
  splitTitles.forEach(title => {
    const text = title.innerText;
    title.innerHTML = text.split(' ').map(word => `<span class="word-wrap"><span class="word-inner">${word}</span></span>`).join(' ');
    
    gsap.from(title.querySelectorAll('.word-inner'), {
      scrollTrigger: {
        trigger: title,
        start: "top 95%",
        toggleActions: "play none none none"
      },
      y: "110%",
      rotation: 3,
      duration: 1.4,
      stagger: 0.04,
      ease: "power4.out"
    });
  });

  /* ---- GSAP Marquee Speed Control ---- */
  const marquees = document.querySelectorAll('.marquee-track');
  marquees.forEach(track => {
    const items = track.innerHTML;
    track.innerHTML += items; // Repeat for loop
    
    const tl = gsap.to(track, {
      xPercent: -50,
      repeat: -1,
      duration: track.classList.contains('marquee-brands') ? 60 : 30,
      ease: "none"
    });
    
    lenis.on('scroll', ({ velocity }) => {
      gsap.to(tl, {
        timeScale: 1 + Math.abs(velocity) * 0.06,
        duration: 0.4
      });
    });
  });

  /* ---- Custom Cursor Logic ---- */
  const dot = document.querySelector('.cursor-dot');
  const outline = document.querySelector('.cursor-outline');

  if (dot && outline) {
    window.addEventListener('mousemove', (e) => {
      const posX = e.clientX;
      const posY = e.clientY;

      gsap.to(dot, { x: posX, y: posY, duration: 0, ease: "none" });
      gsap.to(outline, { x: posX, y: posY, duration: 0.3, ease: "power2.out" });
    });

    const links = document.querySelectorAll('a, button, .btn-pill-orange, .social-pill, .btn-hero-red');
    links.forEach(link => {
      link.addEventListener('mouseenter', () => {
        gsap.to(outline, { scale: 1.5, borderColor: 'var(--accent-2)', duration: 0.3 });
        gsap.to(dot, { scale: 0, duration: 0.3 });
      });
      link.addEventListener('mouseleave', () => {
        gsap.to(outline, { scale: 1, borderColor: 'var(--blue-700)', duration: 0.3 });
        gsap.to(dot, { scale: 1, duration: 0.3 });
      });
    });
  }

  /* ---- Background Parallax (Removed) ---- */


  /* ---- Animaciones Manifiesto (Estilo ABCS) ---- */
  gsap.to(".manifesto-ghost", {
    scrollTrigger: {
      trigger: ".manifesto-premium",
      start: "bottom bottom",
      end: "bottom top",
      scrub: 1
    },
    xPercent: -15,
    ease: "none"
  });

  // Highlight fill effect for manifesto title
  gsap.to(".manifesto-title", {
    backgroundSize: "100% 100%",
    ease: "none",
    scrollTrigger: {
      trigger: ".manifesto-title",
      start: "top 80%",
      end: "top 20%",
      scrub: 1
    }
  });

  gsap.to(".img-1", {
    scrollTrigger: { trigger: ".manifesto-premium", start: "top bottom", end: "bottom top", scrub: 1 },
    y: -100,
    ease: "none"
  });
  gsap.to(".img-2", {
    scrollTrigger: { trigger: ".manifesto-premium", start: "top bottom", end: "bottom top", scrub: 1.5 },
    y: -200,
    ease: "none"
  });
  gsap.to(".img-3", {
    scrollTrigger: { trigger: ".manifesto-premium", start: "top bottom", end: "bottom top", scrub: 0.8 },
    y: -150,
    ease: "none"
  });

  // 4. El cuadro negro de detalle
  gsap.from(".manifesto-detail-box", {
    scrollTrigger: {
      trigger: ".manifesto-detail-box",
      start: "top 95%",
      toggleActions: "play none none reverse"
    },
    y: 40,
    opacity: 0,
    duration: 1.5,
    ease: "power4.out"
  });

  /* ---- Navbar interactions (Smart Hide) ---- */
  const navbar = document.getElementById('navbar');
  let lastScrollY = 0;

  lenis.on('scroll', ({ scroll }) => {
    navbar.classList.toggle('scrolled', scroll > 50);

    if (scroll > lastScrollY && scroll > 200) {
      navbar.classList.add('nav-hidden'); 
    } else {
      navbar.classList.remove('nav-hidden'); 
    }
    lastScrollY = scroll;
  });

  /* ---- Mobile menu ---- */
  const burger = document.getElementById('navBurger')
  const mobileMenu = document.getElementById('mobileMenu')

  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('open')
      burger.classList.toggle('active', open)
      if (open) lenis.stop(); else lenis.start();
    })

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open')
        burger.classList.remove('active')
        lenis.start()
      })
    })
  }

  /* ---- Animaciones Services Hub (Hover & Float) ---- */
  const serviceCards = document.querySelectorAll('.service-card-hub');
  
  serviceCards.forEach((card, i) => {
    // 1. Floating Animation (Consistent with previous logic but stored in a variable)
    const floatY = (i % 2 === 0) ? 20 : -20;
    const floatDura = 3 + (i * 0.5);
    
    const floatTween = gsap.to(card, {
      y: `+=${floatY}`,
      duration: floatDura,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: i * 0.2
    });

    // 2. Hover Interaction
    const cardImg = card.querySelector('.card-hover-img');
    
    card.addEventListener('mouseenter', () => {
      card.classList.add('is-hovered');
      floatTween.pause();
      gsap.to(card, {
        scale: 1.05,
        y: "-=10",
        boxShadow: "0 30px 60px rgba(0,0,0,0.2)",
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto"
      });
      if (cardImg) {
        gsap.to(cardImg, {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out"
        });
      }
    });

    card.addEventListener('mouseleave', () => {
      card.classList.remove('is-hovered');
      floatTween.resume();
      gsap.to(card, {
        scale: 1,
        y: "+=10",
        boxShadow: "0 20px 50px rgba(0,0,0,0.08)",
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto"
      });
      if (cardImg) {
        gsap.to(cardImg, {
          scale: 0.8,
          opacity: 0,
          duration: 0.4,
          ease: "power2.out"
        });
      }
    });
  });

  /* ---- Animación Proyectos Verticales (Stacked Reveal) ---- */
  const stackItems = gsap.utils.toArray(".work-stack-item");
  if (stackItems.length > 0) {
    stackItems.forEach((item, i) => {
      const inner = item.querySelector(".work-stack-inner");
      if (i < stackItems.length - 1) {
        gsap.to(inner, {
          scale: 0.95,
          opacity: 0,
          scrollTrigger: {
            trigger: item,
            start: "bottom 80%",
            end: "bottom 20%",
            scrub: true,
          }
        });
      }
    });

    const lastItem = stackItems[stackItems.length - 1];
    const sidebar = document.querySelector(".sidebar-info");

    ScrollTrigger.create({
      trigger: lastItem,
      start: "top 5vh",
      end: "+=500", 
      pin: ".works-vertical-showcase",
      pinSpacing: true,
      onUpdate: (self) => {
        if(sidebar) gsap.set(sidebar, { opacity: 1 - self.progress });
      }
    });
  }

  /* ---- Animación Problem Solver (REVEAL CON TIMELINE) ---- */
  let solverSection = document.querySelector(".problem-solver-section");
  if (solverSection) {
    let solverTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".problem-solver-section",
        start: "top top",
        end: "+=180%", 
        scrub: 1.2,    
        pin: true,
        invalidateOnRefresh: true
      }
    });

    solverTl.to({}, { duration: 0.15 });

    solverTl.to(".layer-solution", {
      clipPath: "inset(0% 0% 0% 0%)",
      ease: "none",
      duration: 1
    });

    solverTl.to({}, { duration: 0.1 });
  }

  /* ---- General Content Fade-In ---- */
  const revealElements = document.querySelectorAll('.footer-main-layout, .solution-card, .marquee-wrap');
  revealElements.forEach(el => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 95%",
        toggleActions: "play none none none"
      },
      y: 50,
      opacity: 0,
      duration: 1.5,
      ease: "power4.out"
    });
  });

});
