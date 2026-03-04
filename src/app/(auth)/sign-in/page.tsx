"use client"

import AuthForm from '@/components/forms/AuthForm';
import { signInSchema } from '@/lib/validations/schema';
import { User } from 'lucide-react';
import Link from 'next/link';


const SignIn = () => {
  return (

    <section className='w-full max-w-sm flex-center flex-col gap-1.5 p-3'>
      <Link href="/" className='place-self-end'>Go Home</Link>
      <div className='w-max p-2 rounded-full bg-light-100/50'>
        <User size={20} className='fill-dark-200' />
      </div>
      <p className='text-sm md:text-base text-dark-200'>Login to continue</p>

      <AuthForm type="signin" schema={signInSchema} defaultValues={{ email: "", password: "" }} />

    </section>

  )
}

export default SignIn