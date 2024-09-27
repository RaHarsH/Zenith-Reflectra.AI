import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";

const InfiniteMovingCards = ({
items,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  className = "",
}) => {
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && scrollerRef.current) {
      const scroller = scrollerRef.current;

      const totalItemsWidth = scroller.scrollWidth;
      const viewportWidth = containerRef.current.offsetWidth;

      let timesToRepeat = Math.ceil(viewportWidth / totalItemsWidth) + 1;
      for (let i = 0; i < timesToRepeat; i++) {
        Array.from(scroller.children).forEach((item) => {
          const clone = item.cloneNode(true);
          scroller.appendChild(clone);
        });
      }

      
      const animationDuration = getSpeed();
      const directionValue = direction === "left" ? "-100%" : "100%";

      const tl = gsap.timeline({
        repeat: -1,
        defaults: { ease: "none", duration: animationDuration },
      });

      tl.fromTo(
        scroller,
        { x: "0%" },
        {
          x: directionValue,
        }
      );

    
      if (pauseOnHover) {
        containerRef.current.addEventListener("mouseenter", () => tl.pause());
        containerRef.current.addEventListener("mouseleave", () => tl.play());
      }

    //   return () => {
    //     containerRef.current.removeEventListener("mouseenter", () => tl.pause());
    //     containerRef.current.removeEventListener("mouseleave", () => tl.play());
    //     tl.kill();
    //   };
    }
  }, [direction, speed, pauseOnHover]);

  const getSpeed = () => {
    switch (speed) {
      case "fast":
        return 15; 
      case "normal":
        return 30; 
      case "slow":
        return 60; 
      default:
        return 30;
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden w-full ${className}`}
    >
      <ul ref={scrollerRef} className="flex flex-nowrap gap-5">
        {items.map((item, idx) => (
          <li
            key={idx}
            className="w-[350px] max-w-full relative rounded-2xl border border-gray-700 px-8 py-6 md:w-[450px] flex-shrink-0"
            style={{
              background:
                "linear-gradient(180deg, var(--slate-800), var(--slate-900))",
            }}
          >
            <blockmodel>
              <span className="w-full flex justify-center items-center text-sm leading-[1.6] text-gray-100 font-normal">
                <Link href='/models' className='relative top-3 text-2xl'>
                    <h1>{item.model}</h1>
                </Link>
              </span>
              <div className="mt-6 flex flex-row items-center">
                <span className="flex flex-col gap-1">
                  <span className="text-sm leading-[1.6] text-gray-400 font-normal">
                    {item?.version}
                  </span>
                  {/* <span className="text-sm leading-[1.6] text-gray-400 font-normal">
                    {item.title}
                  </span> */}
                </span>
              </div>
            </blockmodel>
          </li>
        ))}
      </ul>
    </div>
  );
};


const ModelCarousel = () => {
  const items = [
    { model: "LLama 3.2", },
    { model: "MiniLLM",},
    { model: "Phi3.5", },
    { model: "Gemma2", },
  ];

  return (
    <div className="text-white mt-20">
        <div className="w-full flex justify-center items-center text-5xl text-gray-300 mb-10">
            <h1>Checkout latest models</h1>
        </div>
      <InfiniteMovingCards
        items={items}
        direction="left"
        speed="normal"
        pauseOnHover={true}
        className="custom-carousel"
      />
    </div>
  );
};

export default ModelCarousel;
