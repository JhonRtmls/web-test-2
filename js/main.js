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

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
        burger.classList.remove("active");
        document.body.style.overflow = "";
      });
    });
  }

  // ── Manifesto Animations (v.2 style) ──
  const manifestoSection = document.querySelector(".manifesto-premium");
  if (manifestoSection) {
    const title = manifestoSection.querySelector(".manifesto-title");
    splitText(title);

    const titleSpans = title.querySelectorAll("span");

    // Scroll-triggered text reveal (letters/words appearing)
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

    // Ghost text parallax
    gsap.to(".manifesto-ghost", {
      xPercent: -20,
      scrollTrigger: {
        trigger: ".manifesto-premium",
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
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
});
