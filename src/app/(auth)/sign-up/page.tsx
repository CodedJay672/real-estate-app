"use client";

import AuthForm from '@/components/forms/AuthForm';
import { signUpSchema } from '@/lib/validations/schema';
import { User } from 'lucide-react';
import Link from 'next/link';



const SignUp = () => {
  return (

    <section className='w-full max-w-sm flex-center flex-col gap-1.5 p-3'>
      <Link href="/" className='text-sm md:text-base text-primary  place-self-end mb-10'>
        Go Home
      </Link>
      <div className='w-max p-2 rounded-full bg-light-100/50'>
        <User size={20} className='fill-dark-200' />
      </div>
      <p className='text-sm md:text-base text-dark-200'>Join our community</p>

      <AuthForm type="signup" schema={signUpSchema} defaultValues={{ fullName: "", email: "", password: "", role: 'user' }} />

    </section>

  )
}

export default SignUp