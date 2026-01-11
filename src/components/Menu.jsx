import React from "react";
import { allCocktails } from "../../constants";
import { useState } from "react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

/**
 * Menu Section Component
 * Features an interactive cocktail carousel with GSAP animations
 * Users can navigate between cocktails using tabs or arrow buttons
 */
const Menu = () => {
  // Reference for animating content container
  const contentRef = useRef();

  // Track the currently selected cocktail index
  const [currentIndex, setCurrentIndex] = useState(0);

  // GSAP animations triggered on cocktail change
  useGSAP(() => {
    // Fade in the cocktail title
    gsap.fromTo("#title", { opacity: 0 }, { opacity: 1, duration: 1 });

    // Slide in the cocktail image from the left
    gsap.fromTo(
      ".cocktail img",
      { opacity: 0, xPercent: -100 },
      { opacity: 1, xPercent: 0, duration: 1, ease: "power1.inOut" }
    );

    // Slide up the details heading
    gsap.fromTo(
      ".details h2",
      { opacity: 0, yPercent: 100 },
      { opacity: 100, yPercent: 0, ease: "power1.inOut" }
    );

    // Slide up the details description
    gsap.fromTo(
      ".details p",
      { opacity: 0, yPercent: 100 },
      { opacity: 100, yPercent: 0, ease: "power1.inOut" }
    );
  }, [currentIndex]);

  // Total number of cocktails for wrapping navigation
  const totalCocktails = allCocktails.length;

  // Navigate to a specific slide with circular wrapping
  const goToSlide = (index) => {
    const newIndex = (index + totalCocktails) % totalCocktails;
    setCurrentIndex(newIndex);
  };

  // Get cocktail at a relative offset from current index (supports wrapping)
  const getCocktailAt = (indexOffset) => {
    return allCocktails[
      (currentIndex + indexOffset + totalCocktails) % totalCocktails
    ];
  };

  // Get current, previous, and next cocktails for display
  const currentCocktail = getCocktailAt(0);
  const prevCocktail = getCocktailAt(-1);
  const nextCocktail = getCocktailAt(1);

  return (
    <section id="menu" aria-labelledby="menu-heading">
      {/* Decorative Leaves */}
      <img src="images/slider-left-leaf.png" alt="left-leaf" id="m-left-leaf" />
      <img
        src="images/slider-right-leaf.png"
        alt="right-leaf"
        id="m-right-leaf"
      />

      {/* Screen reader only heading */}
      <h2 id="menu-heading" className="sr-only">
        Cocktail Menu
      </h2>

      {/* Cocktail Navigation Tabs */}
      <nav className="cocktail-tabs" aria-label="Cocktail Navigation">
        {allCocktails.map((cocktail, index) => {
          const isActive = index === currentIndex;
          return (
            <button
              key={cocktail.id}
              className={`${
                isActive
                  ? "text-white border-white"
                  : "text-white/50 border-white/50"
              }`}
              onClick={() => goToSlide(index)}
            >
              {cocktail.name}
            </button>
          );
        })}
      </nav>

      {/* Main Content Area */}
      <div className="content">
        {/* Previous/Next Arrow Navigation */}
        <div className="arrows">
          <button
            className="text-left"
            onClick={() => goToSlide(currentIndex - 1)}
          >
            <span>{prevCocktail.name}</span>
            <img
              src="images/right-arrow.png"
              alt="right-arrow"
              aria-hidden="true"
            />
          </button>
          <button
            className="text-left"
            onClick={() => goToSlide(currentIndex + 1)}
          >
            <span>{nextCocktail.name}</span>
            <img
              src="images/left-arrow.png"
              alt="left-arrow"
              aria-hidden="true"
            />
          </button>
        </div>

        {/* Cocktail Image Display */}
        <div className="cocktail">
          <img src={currentCocktail.image} className="object-content" />
        </div>

        {/* Recipe Information Panel */}
        <div className="recipe">
          <div ref={contentRef} className="info">
            <p> Recipe for: </p>
            <p id="title"> {currentCocktail.name} </p>
          </div>
          <div className="details">
            <h2>{currentCocktail.title}</h2>
            <p>{currentCocktail.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;
