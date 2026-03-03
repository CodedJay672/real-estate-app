import SignInForm from '@/components/SignInForm';
import { User } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Sign up | Clean Beautiful Properties",
  description:
    "Clean beautiful properties is a real estate listing platform where you can find your next home or investment property.",
};

const SignUp = () => {
  return (

    <section className='w-full max-w-sm flex-center flex-col gap-1.5'>
      <Link href="/" className='text-sm md:text-base text-primary  place-self-end mb-10'>
        Go Home
      </Link>
      <div className='w-max p-2 rounded-full bg-light-100/50'>
        <User size={20} className='fill-dark-200' />
      </div>
      <p className='text-sm md:text-base text-dark-200'>Join our community</p>

      <SignInForm type="signup" role="user" />

    </section>

  )
}

export default SignUp