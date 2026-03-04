"use client";

import AuthForm from '@/components/forms/AuthForm';
import { signInSchema } from '@/lib/validations/schema';
import { User } from 'lucide-react';
import Link from 'next/link';

const AdminLogin = () => {
  return (
    <section className='w-full max-w-sm h-full flex-center flex-col gap-2 p-3'>
      <Link href="/" className='mb-3 place-self-end'>Go Home</Link>
      <User size={20} className='fill-dark-200' />
      <p className='text-sm md:text-base text-dark-200'>Admin Login</p>
      <AuthForm type='signin' schema={signInSchema} defaultValues={{ email: "", password: "" }} redirectUrl='/admin' />
    </section>
  )
}

export default AdminLogin