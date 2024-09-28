import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import React, { useEffect } from 'react'
import Image from 'next/image';


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
            <div className='w-3/4 text-white flex flex-col pl-10 justify-center items-center mt-10 border border-gray-600 rounded-2xl'>
                <div className='feature-content full py-5'>
                    <div className='flex justify-around items-center gap-10 mb-10'>
                        <p className='flex-2'>
                          <Image
                            src="/improved_reasoning.png"  
                            alt="Improved Reasoning Icon"
                            width={80} 
                            height={80}
                            className='rounded-lg' 
                          />      
                        </p>
                        <h2 className='flex-1 text-2xl text-gray-300'>
                            Improved Reasoning<br />
                            Utilizes Chain of Thought (COT) to help AI solve complex problems step by step.
                        </h2>
                    </div>
                    <div className='flex justify-around items-center gap-10 mb-10'>
                        <p className='flex-2'>
                        <Image
                            src="/self_reflection.png"  
                            alt="Self-Reflection Icon"
                            width={80} 
                            height={80}
                            className='rounded-lg' 
                          />  
                        </p>
                        <h2 className='flex-1 text-2xl text-gray-300'>
                            Self-Reflection<br />
                            AI learns from its answers, enabling continuous improvement and smarter responses.
                        </h2>
                    </div>
                    <div className='flex justify-around items-center gap-10 mb-10 text-wrap'>
                        <p className='flex-2'>
                        <Image
                            src="/open_source.png"  
                            alt="Open-Source Integration Icon"
                            width={80} 
                            height={80}
                            className='rounded-lg' 
                          />  
                        </p>
                        <h2 className='flex-1 text-2xl text-gray-300'>
                            Open-Source Integration<br />
                            Easily integrates with existing models, promoting collaboration and innovation in the community.
                        </h2>
                    </div>
                    <div className='flex justify-around items-center gap-10 mb-10'>
                        <p className='flex-2'>
                        <Image
                            src="/friendlyuserinterface.png"  
                            alt="User-Friendly Interface Icon"
                            width={80} 
                            height={80}
                            className='rounded-lg' 
                          />  
                        </p>
                        <h2 className='flex-1 text-2xl text-gray-300'>
                            User-Friendly Interface<br />
                            Intuitive design that simplifies the integration of Reflectra.ai’s capabilities.
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Features