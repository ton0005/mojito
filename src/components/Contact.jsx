import React from "react";
import { socials, openingHours } from "../../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

/**
 * Contact/Footer Section Component
 * Displays location, contact info, opening hours, and social links
 * Features scroll-triggered text animations using GSAP SplitText
 */
const Contact = () => {
  // GSAP scroll-triggered animation sequence
  useGSAP(() => {
    // Split the main heading into individual words for animation
    const titleSplit = SplitText.create("#contact h2", { type: "words" });

    // Create timeline triggered when section reaches center of viewport
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#contact",
        start: "top center",
      },
      ease: "power1.inOut",
    });

    // Animation sequence:
    timeline
      // 1. Animate heading words sliding up with stagger
      .from(titleSplit.words, {
        opacity: 0,
        yPercent: 100,
        stagger: 0.02,
      })
      // 2. Animate subheadings and paragraphs sliding up
      .from("#contact h3, #contact p", {
        opacity: 0,
        yPercent: 100,
        stagger: 0.02,
      })
      // 3. Animate right decorative leaf floating up
      .to("#f-right-leaf", { y: -50, duration: 1, ease: "power1.inOut" })
      // 4. Animate left decorative leaf floating up (simultaneously with '<')
      .to(
        "#f-left-leaf",
        { y: -50, duration: 1, ease: "power1.inOut" },
        "<"
      );
  });

  return (
    <footer id="contact">
      {/* Decorative Leaves */}
      <img
        src="images/footer-right-leaf.png"
        alt="right-leaf"
        id="f-right-leaf"
      />
      <img src="images/footer-left-leaf.png" alt="left-leaf" id="f-left-leaf" />

      {/* Main Content Container */}
      <div className="content">
        {/* Section Title */}
        <h2>Where to Find Us</h2>

        {/* Location Info */}
        <div>
          <h3>Visit Our Bar</h3>
          <p> 123 Cocktail, Oaklands Park, South Australia </p>
        </div>

        {/* Contact Details */}
        <div>
          <h3>Contact Us</h3>
          <p> Phone: (08) 1234 5678 </p>
          <p> Email: hello@redvelvet.com </p>
        </div>

        {/* Opening Hours - Dynamically rendered from constants */}
        <div>
          <h3>Open Everyday</h3>
          {openingHours.map((time) => (
            <p key={time.day}>
              {time.day}: {time.time}
            </p>
          ))}
        </div>

        {/* Social Media Links */}
        <div>
          <h3>Socials</h3>
          <div className="flex-center gap-5">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
              >
                <img src={social.icon} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
