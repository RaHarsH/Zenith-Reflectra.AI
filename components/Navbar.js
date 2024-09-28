'use client';
import Link from 'next/link';
import { useUser, SignInButton, UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';

const Navbar = () => {
  const { isSignedIn } = useUser();
  const [screenWidth, setScreenWidth] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const menuRef = useRef(null); 

  const useScreenWidth = () => {
    const [screenWidth, setScreenWidth] = useState(0);

    useEffect(() => {
      const handleResize = () => setScreenWidth(window.innerWidth);
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    return screenWidth;
  };

  const screenWidthValue = useScreenWidth();
  const isMobile = screenWidthValue <= 768;

  const menuHandler = () => {
    setMobileMenu((prev) => !prev);

    if (!mobileMenu) {
      gsap.to(menuRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
        display: 'block',
      });
    } else {

      gsap.to(menuRef.current, {
        y: '100%',
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in',
        onComplete: () => {
          
          menuRef.current.style.display = 'none';
        },
      });
    }
  };

  const navMenuItems = [
    { title: 'Home', link: '/', isButton: false },
    { title: 'Models', link: '/models', isButton: false },

    // Conditional sign-in and sign-up buttons when user is not signed in
    ...(!isSignedIn
      ? [
          {
            title: 'Sign In',
            link: '/sign-in',
            isButton: true,
            action: <SignInButton />,
          },
          {
            title: 'Sign Up',
            link: '/sign-up',
            isButton: true,
            action: <SignInButton mode="signUp" />,
          },
        ]
      : []),
  ];

  return (
    <nav className='w-1/2 rounded-full border border-gray-500 h-16 bg-black text-white px-5 z-50 sticky top-5 mx-auto my-4 flex items-center justify-between'>
      <div className='flex justify-between items-center'>
        <Link className='flex gap-2 items-center' href='/'>
          <Image src="/logo.png" alt="Logo" width={150} height={60} priority />
        </Link>
      </div>

      <ul className={`${isMobile ? 'hidden' : ''} flex justify-around items-center gap-5`}>
        {navMenuItems.map((navMenuItem) => (
          <li key={navMenuItem.title} className='list-none'>
            <Link
              href={navMenuItem.link}
              className={`no-underline text-[12px] ${
                navMenuItem.isButton ? 'border border-gray-500 px-3 py-2 rounded-3xl' : ''
              }`}
              onClick={navMenuItem.action ? navMenuItem.action.props.onClick : undefined}
            >
              {navMenuItem.title}
            </Link>
          </li>
        ))}
        {isSignedIn && <UserButton />}
      </ul>

      
      {isMobile && (
        <div onClick={menuHandler} className='cursor-pointer'>
          {mobileMenu ? 'close' : 'menu'}
        </div>
      )}


      <div
        ref={menuRef}
        className='absolute top-16 left-0 w-full bg-black text-white z-45 rounded-lg'
        style={{ opacity: 0, transform: 'translateY(100%)', display: 'none' }} 
      >
        <ul className='flex flex-col items-center justify-center gap-6 p-4'>
          {navMenuItems.map((navMenuItem) => (
            <li key={navMenuItem.title} className='text-md'>
              <Link href={navMenuItem.link} onClick={() => { menuHandler(); navMenuItem.action && navMenuItem.action.props.onClick(); }}>
                {navMenuItem.title}
              </Link>
            </li>
          ))}
          {isSignedIn && (
            <li>
              <UserButton />
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
