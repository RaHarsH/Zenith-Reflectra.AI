import Link from 'next/link';
import { useUser, SignInButton, SignOutButton, UserButton } from '@clerk/nextjs';

const Navbar = () => {
  const { isSignedIn, user } = useUser();

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
    {
      title: isSignedIn ? 'Sign Out' : 'Sign In',
      link: isSignedIn ? '#' : '/sign-in', // Prevents navigation when signed out
      isButton: true,
      action: isSignedIn ? <SignOutButton /> : <SignInButton />,
    },
    {
      title: 'Sign Up',
      link: '/sign-up',
      isButton: true,
    },
  ];

  return (
    <nav className='w-1/2 rounded-full border h-16 bg-black text-white px-5 z-50 sticky top-5 mx-auto my-4 flex items-center justify-around'>
      <div className='flex justify-between items-center'>
        <Link className='flex gap-2 items-center' href='/'>
          <span>Logo</span>
          <h3>Reflectra.AI</h3>
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
        {
          isSignedIn ? <UserButton /> : ''
        }
      </ul>
    </nav>
  );
};

export default Navbar;
