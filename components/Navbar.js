import Link from 'next/link';
import { useUser, SignInButton, SignOutButton, UserButton } from '@clerk/nextjs';
import Image from 'next/image';

const Navbar = () => {
  const { isSignedIn } = useUser();

  const navMenuItems = [
    {
      title: 'Home',
      link: '/',
      isButton: false,
    },
    {
      title: 'Models',
      link: '/models',
      isButton: false,
    },
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
    <nav className='w-1/2 rounded-full border border-gray-500 h-16 bg-black text-white px-5 z-50 sticky top-5 mx-auto my-4 flex items-center justify-around'>
      <div className='flex justify-between items-center'>
        <Link className='flex gap-2 items-center' href='/'>
          <Image
            src="/logo.png"
            alt="Logo"
            width={150}
            height={60}
            priority
          />
        </Link>
      </div>

      <ul className='flex justify-around items-center gap-5'>
        {navMenuItems.map((navMenuItem) => (
          <li key={navMenuItem.title} className='list-none'>
            <Link
              href={navMenuItem.link}
              className={`no-underline text-[12px] ${navMenuItem.isButton ? 'border border-gray-500 px-3 py-2 rounded-3xl' : ''}`}
              onClick={navMenuItem.action ? navMenuItem.action.props.onClick : undefined}
            >
              {navMenuItem.title}
            </Link>
          </li>
        ))}
        {isSignedIn && <UserButton />}
      </ul>
    </nav>
  );
};

export default Navbar;
