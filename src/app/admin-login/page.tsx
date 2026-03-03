"use client";

import AuthForm from '@/components/forms/AuthForm';
import { signInSchema } from '@/lib/validations/schema';
import { User } from 'lucide-react';

const AdminLogin = () => {
  return (
    <section className='w-full h-full flex-center gap-2'>
      <User size={20} className='fill-dark-200' />
      <p className='text-sm md:text-base text-dark-200'>Login as</p>
      <AuthForm type='signin' schema={signInSchema} defaultValues={{ email: "", password: "" }} role='admin' redirectUrl='/admins' />
    </section>
  )
}

export default AdminLogin