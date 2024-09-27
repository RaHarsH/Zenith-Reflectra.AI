'use client'
import { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import { Lamp } from "@/components/Lamp";
import About from "@/components/About";
import { StarBackground } from "@/components/StarBackground";

export default function Home() {
  const reflectraRef = useRef(null);
  const subheadingRef = useRef(null)

  useEffect(() => {
    const splitText = new SplitType(reflectraRef.current, { types: 'chars' });

    gsap.fromTo(
      splitText.chars, 
      { opacity: 0, x: -100 },
      { opacity: 1, x: 0, duration: 1, ease: "power3.out", stagger: 0.05 } // Final state with stagger
    );

    gsap.fromTo(
      subheadingRef.current,
      {
        opacity: 0, y: 100
      },
      {
        opacity: 1,
        y: 0,
        duration: 1, ease: "power3.out",
      }
    )
   
    return () => {
      splitText.revert();
    };
  }, []);

  return (
    <>
      <StarBackground />
      <div className='w-full px-5 mt-[-12px]'>
        <div className='w-full flex flex-col items-center justify-center'>
          <Lamp />
          <h1 className='text-8xl font-semibold mt-[-80px] z-10'>
            <span ref={reflectraRef} className='text-gray-400'>REFLECTRA.</span>
            <span className='bg-gradient-to-r from-purple-400 via-pink-600 to-red-600 bg-clip-text text-transparent'>
              AI
            </span>
          </h1>
          <h2 ref={subheadingRef} className='text-gray-200 mt-10 text-3xl'>
            Revolutionizing AI Innovation
          </h2>
        </div>
        <About />
      </div>
      
    </>
  );
}
