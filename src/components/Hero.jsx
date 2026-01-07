import React from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useMediaQuery } from "react-responsive";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

/**
 * Hero Section Component
 * Features animated text, parallax leaves, and scroll-driven video playback
 */
const Hero = () => {
  const videoRef = React.useRef();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useGSAP(() => {
    // Split text for character and line animations
    const heroSplit = new SplitText(".title", { type: "chars, words" });
    const paragraphSplit = new SplitText(".subtitle", { type: "lines" });

    // Apply gradient class to each character in the hero title
    heroSplit.chars.forEach((char) => char.classList.add("text-gradient"));

    // Animate hero title characters sliding up with stagger effect
    gsap.from(heroSplit.chars, {
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.06,
    });

    // Animate subtitle lines fading in and sliding up
    gsap.from(paragraphSplit.lines, {
      yPercent: 100,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      stagger: 0.1,
      delay: 1,
    });

    // Parallax scroll animation for decorative leaves and arrow
    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })
      .to(".right-leaf", { y: 200 }, 0)
      .to(".left-leaf", { y: -200 }, 0)
      .to(".arrow", { y: 100 }, 0);

    // Responsive scroll trigger values for video animation
    const startValue = isMobile ? "top 50%" : "center 60%";
    const endValue = isMobile ? "120% top" : "bottom top";

    // Video scroll-driven timeline - scrubs video playback based on scroll position
    const tl = gsap.timeline({
        scrollTrigger: {
		trigger: "video",
		start: startValue,
		end: endValue,
		scrub: true,
		pin: true,
	 },
	});

    // Sync video currentTime with scroll progress once metadata is loaded
    videoRef.current.onloadedmetadata = () => {
      tl.to(videoRef.current, {
        currentTime: videoRef.current.duration,
      });
    }
}, []);

  return (
    <>
      {/* Hero Section */}
      <section id="hero" className="noisy">
        {/* Main Title */}
        <h1 className="title">MOJITO</h1>

        {/* Decorative Leaves - Animated on scroll */}
        <img
          src="/images/hero-left-leaf.png"
          alt="left leaf"
          className="left-leaf"
        />
        <img
          src="/images/hero-right-leaf.png"
          alt="right leaf"
          className="right-leaf"
        />

        {/* Hero Content */}
        <div className="body">
          <div className="content">
            {/* Tagline - Hidden on mobile */}
            <div className="space-y-5 hidden md:block">
              <p>Cool. Crisp. Classic</p>
              <p className="subtitle">
                Sip the spirit <br /> of summer
              </p>
            </div>

            {/* CTA Section */}
            <div className="view-cocktails">
              <p className="subtitle">
                Every cocktail we serve is a reflection of our obsession with
                detail — from the first muddle to the final garnish. That care
                is what turns a simple drink into something truly memorable.
              </p>
              <a href="#cocktails">View Cocktails</a>
            </div>
          </div>
        </div>
      </section>

      {/* Background Video - Scroll-driven playback */}
      <div className="video absolute inset-0">
        <video
          ref={videoRef}
          src="/videos/output.mp4"
          muted
          playsInline
          preload="auto"
        />
      </div>
    </>
  );
};

export default Hero;
