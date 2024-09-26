import { SignUp as ClerkSignUp } from '@clerk/nextjs';

const SignUpPage = () => {
  return (
    <div className='flex justify-center items-center relative top-8'>
      <ClerkSignUp path='/sign-up' routing='path' signInUrl='/sign-in' />
    </div>
  );
};

export default SignUpPage;
