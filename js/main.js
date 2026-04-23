/* ================================================
    GESTOO — Main JavaScript v.4
   ================================================ */

document.addEventListener("DOMContentLoaded", () => {
  // ── Lenis Smooth Scroll ──
  const lenis = new Lenis();

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  // ── Dynamic Background Color Scrub ──
  const body = document.body;
  const bgBlue = "#152A3C"; // var(--bg)
  const bgWhite = "#FFFFFF";

  gsap.set(body, { backgroundColor: bgWhite });

  // Transition: White -> Blue (Entering Marquee/Services)
  gsap.to(body, {
    backgroundColor: bgBlue,
    scrollTrigger: {
      trigger: ".strategic-marquee",
      start: "top 90%",
      end: "top 20%",
      scrub: true,
    },
  });

  // ── Utility: Split text into spans (Words) ──
  const splitText = (el) => {
    const text = el.textContent.trim();
    const words = text.split(/\s+/);
    el.innerHTML = words.map((word) => `<span>${word}</span>`).join(" ");
  };

  // ── Navbar Scroll Effect ──
  const navbar = document.getElementById("navbar");
  const updateNavbar = () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };
  window.addEventListener("scroll", updateNavbar, { passive: true });

  // ── Mobile Menu ──
  const burger = document.getElementById("navBurger");
  const mobileMenu = document.getElementById("mobileMenu");

  if (burger && mobileMenu) {
    burger.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.toggle("open");
      burger.classList.toggle("active", isOpen);
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    const closeBtn = document.getElementById("mobileMenuClose");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
        burger.classList.remove("active");
        document.body.style.overflow = "";
      });
    }

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
        burger.classList.remove("active");
        document.body.style.overflow = "";
      });
    });
  }

  // ── Custom Cursor ──
  const cursor = document.querySelector(".cursor");
  const follower = document.querySelector(".cursor-follower");

  if (cursor && follower) {
    document.addEventListener("mousemove", (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
      });
      gsap.to(follower, {
        x: e.clientX - 16,
        y: e.clientY - 16,
        duration: 0.3,
      });
    });

    // Hover effects for interactive elements
    const interactives = document.querySelectorAll(
      "a, button, .service-item, .work-card, .brand-logo",
    );
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        gsap.to(cursor, { scale: 1.5, backgroundColor: "var(--white)" });
        gsap.to(follower, { scale: 1.5, borderColor: "var(--white)" });
      });
      el.addEventListener("mouseleave", () => {
        gsap.to(cursor, { scale: 1, backgroundColor: "var(--accent-2)" });
        gsap.to(follower, { scale: 1, borderColor: "var(--accent-2)" });
      });
    });
  }

  // ── Manifesto Animations (v.2 style) ──
  const manifestoSection = document.querySelector(".manifesto-premium");
  if (manifestoSection) {
    const title = manifestoSection.querySelector(".manifesto-title");
    splitText(title);

    const titleSpans = title.querySelectorAll("span");

    // Scroll-triggered text reveal
    gsap.to(titleSpans, {
      opacity: 1,
      stagger: 0.1,
      scrollTrigger: {
        trigger: title,
        start: "top 80%",
        end: "top 20%",
        scrub: true,
      },
    });


    // Floating images parallax
    gsap.to(".img-1", {
      y: -120,
      rotate: 5,
      scrollTrigger: {
        trigger: ".manifesto-premium",
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      },
    });

    gsap.to(".img-2", {
      y: -200,
      rotate: -8,
      scrollTrigger: {
        trigger: ".manifesto-premium",
        start: "top bottom",
        end: "bottom top",
        scrub: 2,
      },
    });

    gsap.to(".img-3", {
      y: -150,
      rotate: 3,
      scrollTrigger: {
        trigger: ".manifesto-premium",
        start: "top bottom",
        end: "bottom top",
        scrub: 1.2,
      },
    });

    // Detail box reveal
    gsap.from(".manifesto-detail-box", {
      y: 50,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".manifesto-detail-box",
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
    });
  }

  // ── Services Hub (v.5) ──
  const hubSection = document.querySelector(".services-hub");
  if (hubSection) {
    const hubCards = hubSection.querySelectorAll(".hub-card");

    // Entrance and Parallax for each card
    hubCards.forEach((card) => {
      const p = parseFloat(card.dataset.parallax) || 0.1;

      // Entrance
      gsap.from(card, {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top bottom-=50",
          toggleActions: "play none none reverse",
        },
      });

      // Continuous Parallax Scroll
      gsap.to(card, {
        y: -150 * p,
        scrollTrigger: {
          trigger: hubSection,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    // Center circle entrance
    gsap.from(".hub-center-circle", {
      scale: 0.5,
      opacity: 0,
      duration: 1.5,
      ease: "power4.out",
      scrollTrigger: {
        trigger: hubSection,
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    });

    // Rings subtle pulse/rotation
    gsap.to(".hub-ring", {
      rotation: 360,
      duration: 100,
      repeat: -1,
      ease: "none",
    });

    gsap.from(".hub-ring", {
      opacity: 0,
      stagger: 0.3,
      duration: 2,
      scrollTrigger: {
        trigger: hubSection,
        start: "top 80%",
      },
    });
  }

  // ── Problem Solver Reveal (v.4 Refined) ──
  const solverSection = document.querySelector(".solver-section");
  if (solverSection) {
    gsap.fromTo(
      ".layer-solution",
      { yPercent: 100 },
      {
        yPercent: 0,
        ease: "none",
        scrollTrigger: {
          trigger: ".solver-section",
          start: "top top",
          end: "+=150%",
          scrub: true,
          pin: true,
          anticipatePin: 0.5,
          invalidateOnRefresh: true,
        },
      },
    );
  }

  // ── Smooth Anchors ──
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        lenis.scrollTo(target);
      }
    });
  });

  // ── Global Reveal Observer ──
  const revealElements = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );
  revealElements.forEach((el) => revealObserver.observe(el));

  // Refresh ScrollTrigger after everything is loaded
  ScrollTrigger.refresh();
});
