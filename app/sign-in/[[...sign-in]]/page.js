import { SignIn as ClerkSignIn } from '@clerk/nextjs';

const SignInPage = () => {
  return (
    <div className='flex justify-center items-center relative top-8'>
      <ClerkSignIn path='/sign-in' routing='path' signUpUrl='/sign-up' />
    </div>
  );
};

export default SignInPage;
