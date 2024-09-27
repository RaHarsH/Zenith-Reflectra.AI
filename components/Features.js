import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import React, { useEffect } from 'react'


const Features = () => {
    gsap.registerPlugin(ScrollTrigger)

      useEffect(() => {
    const featureContent = document.querySelector('.feature-content');
    const contentDivs = featureContent.querySelectorAll('div');

    contentDivs.forEach((content, index) => {
      gsap.fromTo(
        content,
        { opacity: 0, x: 50 }, 
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
    <div className='w-full mt-64'>
        <div className='w-full flex justify-center items-center'>
            <h1 className='text-5xl text-gray-300'>Features</h1>
        </div>
        <div className='w-full flex justify-center'>
            <div className='w-3/4 text-white flex flex-col justify-center items-center mt-10 border border-gray-600 rounded-2xl'>
                <div className='feature-content full py-5'>
                    <div className='flex justify-around items-center gap-10 mb-10'>
                        <p>feature-icon</p>
                        <h2 className='text-2xl text-gray-300'>
                            Improved Reasoning<br />
                            Utilizes Chain of Thought (COT) to help AI solve complex problems step by step.
                        </h2>
                    </div>
                    <div className='flex justify-around items-center gap-10 mb-10'>
                        <p>feature-icon</p>
                        <h2 className='text-2xl text-gray-300'>
                            Improved Reasoning<br />
                            Utilizes Chain of Thought (COT) to help AI solve complex problems step by step.
                        </h2>
                    </div>
                    <div className='flex justify-around items-center gap-10 mb-10'>
                        <p>feature-icon</p>
                        <h2 className='text-2xl text-gray-300'>
                            Improved Reasoning<br />
                            Utilizes Chain of Thought (COT) to help AI solve complex problems step by step.
                        </h2>
                    </div>
                    <div className='flex justify-around items-center gap-10 mb-10'>
                        <p>feature-icon</p>
                        <h2 className='text-2xl text-gray-300'>
                            Improved Reasoning<br />
                            Utilizes Chain of Thought (COT) to help AI solve complex problems step by step.
                        </h2>
                    </div>
                    <div className='flex justify-around items-center gap-10 mb-10'>
                        <p>feature-icon</p>
                        <h2 className='text-2xl text-gray-300'>
                            Improved Reasoning<br />
                            Utilizes Chain of Thought (COT) to help AI solve complex problems step by step.
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Features