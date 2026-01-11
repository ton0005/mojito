import React from "react";
import { goodLists } from "../../constants/index.js";
import { featureLists } from "../../constants/index.js";
import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

/**
 * Art Section Component
 * Features a scroll-driven mask reveal animation with GSAP
 * Content fades out while a masked image scales and reveals hidden content
 */
const Art = () => {
  // Detect mobile viewport for responsive animation triggers
  const isMobile = useMediaQuery({ maxWidth: 767 });

  // GSAP scroll-triggered animation sequence
  useGSAP(() => {
    // Adjust scroll trigger start position based on viewport
    const start = isMobile ? "top 20%" : "top top";

    // Create timeline with scroll trigger - pins section during animation
    const maskTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#art",
        start: start,
        end: "bottom center",
        scrub: 1.5, // Smooth scrubbing tied to scroll position
        pin: true, // Pin section during scroll animation
      },
    });

    // Animation sequence:
    maskTimeline
      // 1. Fade out the feature lists and headings
      .to(".will-fade", { opacity: 0, stagger: 0.2, ease: "power1.inOut" })
      // 2. Scale up the masked image and expand the mask
      .to(".masked-img", {
        scale: 1.3,
        maskPosition: "center",
        maskSize: "400%",
        duration: 1,
        ease: "power1.inOut",
      })
      // 3. Reveal the hidden content behind the mask
      .to(".masked-content", { opacity: 1, duration: 1, ease: "power1.inOut" });
  });

  return (
    <div id="art">
      <div className="container mx-auto h-full pt-20">
        {/* Section Title - Fades out on scroll */}
        <h2 className="will-fade">The ART</h2>

        {/* Main Content Grid */}
        <div className="content">
          {/* Left Feature List - Fades out on scroll */}
          <ul className="space-y-4 will-fade">
            {goodLists.map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <img src="images/check.png" alt="check" />
                <p>{feature}</p>
              </li>
            ))}
          </ul>

          {/* Center Cocktail Image - Scales with mask animation */}
          <div className="cocktail-img">
            <img
              src="/images/under-img.jpg"
              alt="cocktail"
              className="abs-center masked-img size-full object-contain"
            />
          </div>

          {/* Right Feature List - Fades out on scroll */}
          <ul className="space-y-4 will-fade">
            {featureLists.map((feature, index) => (
              <li key={index} className="flex items-center justify-start gap-2">
                <img src="images/check.png" alt="check" />
                <p className="md:w-fit w-60">{feature}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Masked Content Container */}
        <div className="masked-container">
          {/* Secondary Title - Fades out on scroll */}
          <h2 className="will-fade">Sip-Worthy Perfection</h2>

          {/* Hidden Content - Revealed after mask animation */}
          <div className="masked-content">
            <h3>
              Made with Craft. Poured with Passion.
              <p>
                This isn't just a drink. It's a carefully crafted moment made
                just for you.
              </p>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Art;
