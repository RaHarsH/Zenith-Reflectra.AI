'use client'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import React, { useEffect } from 'react';

const About = () => {
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const aboutContent = document.querySelector('#about-content');
    const contentDivs = aboutContent.querySelectorAll('div');

    contentDivs.forEach((content, index) => {
      gsap.fromTo(
        content,
        { opacity: 0, x: -100 }, 
        {
          opacity: 1,
          x: 0,
          duration: 1,
          scrollTrigger: {
            trigger: content,
            start: 'top bottom', 
            end: 'bottom top',
            toggleActions: 'play none none reverse', 
            markers: false,
            scrub: true, 
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill()); 
    };
  }, []);

  return (
    <div className='about-us-container text-white mt-64'>
      <div className='w-full flex justify-center items-center'>
        <h1 className='text-5xl text-gray-300'>About Us</h1>
      </div>
      <div id='about-content' className='flex flex-col justify-center items-center mt-10 gap-16'>
        <div className='w-3/4 border border-gray-600 px-6 py-5 rounded-2xl'>
          <h2 className='text-2xl text-gray-300'>
            We help open-source models, or AI, think better and answer questions more like people do. Imagine you have a tricky puzzle. Sometimes, it helps to break it into smaller pieces to solve it step by step. That’s what we call Chain of Thought (COT)! It helps the AI understand complicated problems by thinking one part at a time.
          </h2>
        </div>
        <div className='w-3/4 border border-gray-600 px-6 py-5 rounded-2xl'>
          <h2 className='text-2xl text-gray-300'>
            We also teach the AI to reflect. This means it can look back at its answers and ask, "Was that a good answer?" If it wasn't, it can try to think of a better one. This way, the AI learns to give smarter and more thoughtful answers!
          </h2>
        </div>
        <div className='w-3/4 border border-gray-600 px-6 py-5 rounded-2xl'>
          <h2 className='text-2xl text-gray-300'>
            At REFLECTRA AI, we believe that by giving these special tools to open-source AI models, we can make them really good at helping us solve problems.
          </h2>
        </div>
        <div className='w-3/4 border border-gray-600 px-6 py-5 rounded-2xl'>
          <h2 className='text-2xl text-gray-300'>
            So, join us as we make AI smarter and better at answering questions!
          </h2>
        </div>
      </div>
    </div>
  );
};

export default About;
