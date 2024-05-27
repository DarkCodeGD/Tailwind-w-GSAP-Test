import { gsap } from "../node_modules/gsap/all.js";

//========== Elements ==========//
const teamHeader = document.querySelector(".team-header");
const teamCards = document.querySelectorAll(".team-card");
const cardImg = document.querySelectorAll(".card-img");
const cardName = document.querySelectorAll(".card-name");
const cardInfo = document.querySelectorAll(".card-info");
const cardIcon = document.querySelectorAll(".card-icon");
const footerAboutHeader = document.querySelector(".footer-about-header");
const footerAboutInfo = document.querySelector(".footer-about-info");
const footerLinkHeader = document.querySelector(".footer-link-header");
const footerLinkWrapper = document.querySelector(".footer-link-wrapper");
const footerLinkContainer = document.querySelectorAll(".footer-link-container");

const allElemsSet = [
  teamHeader,
  footerAboutHeader,
  footerAboutInfo,
  footerLinkHeader,
  ...footerLinkContainer,
  ...teamCards,
  ...cardImg,
  ...cardName,
  ...cardInfo,
  ...cardIcon
];

const allObserveSingleElems = [
  teamHeader,
  footerAboutHeader,
  footerAboutInfo,
  footerLinkHeader,
  footerLinkWrapper
];

// Global Set
gsap.set(allElemsSet, { opacity: 0 });

// Custom Set
gsap.set(teamHeader, { y: -150 });
gsap.set(teamCards, { y: -200 });
gsap.set(cardImg, { scale: 0 });
gsap.set(cardName, { y: -50 });
gsap.set(cardInfo, { y: -50 });
gsap.set(cardIcon, { x: -100 });
gsap.set(footerAboutHeader, { x: -150 });
gsap.set(footerAboutInfo, { x: 150 });
gsap.set(footerLinkHeader, { y: -100 });
gsap.set(footerLinkContainer, { x: -100 });

//========== Animation Functions ==========//
document.addEventListener("DOMContentLoaded", () => {
  const heroAnim = () => {
    const sequence1 = gsap
      .timeline({
        defaults: {
          opacity: 0,
          duration: 0.7,
          ease: "power1.inOut"
        }
      })
      .fromTo(
        "#navbar",
        {
          y: -200
        },
        {
          y: 0,
          opacity: 1
        }
      )
      .fromTo(
        ".nav-logo",
        {
          x: -100
        },
        {
          x: 0,
          opacity: 1
        }
      )
      .fromTo(
        ".link-container",
        {
          y: -100
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2
        }
      );

    const sequence2 = gsap
      .timeline({
        defaults: {
          opacity: 0,
          ease: "power1.inOut",
          duration: 1
        }
      })
      .fromTo(
        ".hero-header",
        {
          y: -200
        },
        {
          y: 0,
          opacity: 1,
          ease: "elastic"
        }
      )
      .fromTo(
        ".hero-sub-header",
        {
          x: 200
        },
        {
          x: 0,
          opacity: 1
        }
      )
      .fromTo(
        ".hero-info",
        {
          y: 100
        },
        {
          y: 0,
          opacity: 1
        }
      )
      .fromTo(
        ".hero-button-wrapper",
        {
          y: 100,
          scale: 1.5
        },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          ease: "elastic"
        }
      );

    sequence1.add(sequence2);
  };

  // Run hero section animation when the browser loads
  heroAnim();

  // This is the team sections animation function
  const teamAnim = (elemArr) => {
    gsap
      .timeline({
        defaults: {
          duration: 0.5,
          ease: "power1.inOut"
        }
      })
      .to(elemArr, {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.3
      })
      .to(cardImg, {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: "elastic"
      })
      .to(cardName, {
        y: 0,
        opacity: 1
      })
      .to(cardInfo, {
        y: 0,
        opacity: 1
      })
      .to(cardIcon, {
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: "elastic",
        stagger: {
          amount: 0.5
        }
      });
  };

  // Test elements if available
  // (() => {
  //   console.log(footerLinkContainer);
  // })();

  //========== Observers ==========//
  // This function stores intersecting elems in an array
  // Mostly used for stagger animations...
  const observerMulti = new IntersectionObserver(
    (entries, observer) => {
      // Check if elem is intersecting, if so, then store in array.
      const targets = entries.map((entry) => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
          return entry.target;
        }
      });

      try {
        // Get targets from array and apply GSAP animations
        teamAnim(targets);
      } catch (err) {
        return;
      }
    },
    {
      root: null,
      rootMargin: "0px",
      threshold: 1
    }
  );

  // This observer just observes for single/container elements
  const observerSingle = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log();

          // This switch statement runs a different animation
          // if the parent of the soon to be animated elements
          // has a data attribute...
          switch (entry.target.dataset.animDiff) {
            case "footer-link-wrapper":
              gsap.to(footerLinkContainer, {
                opacity: 1,
                x: 0,
                duration: 0.5,
                ease: "elastic",
                stagger: 0.3
              });

              break;
            default:
              gsap.to(entry.target, {
                opacity: 1,
                x: 0,
                y: 0,
                duration: 1,
                ease: "power1.inOut"
              });
          }

          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      rootMargin: "-100px",
      threshold: 0.1
    }
  );

  //========== Observe Elements ==========//
  teamCards.forEach((elem) => {
    observerMulti.observe(elem);
  });

  allObserveSingleElems.forEach((elem) => {
    observerSingle.observe(elem);
  });
});
