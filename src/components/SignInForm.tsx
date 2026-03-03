"use client";


import { signInSchema, signUpSchema } from '@/lib/validations/schema';
import AuthForm from './forms/AuthForm';

const SignInForm = ({ type, role }: { type: 'signin' | "signup"; role: 'admin' | 'user' }) => {

  const defaultValues = type === "signin" ? { email: "", password: "" } : { fullName: "", email: "", password: "" };

  return (
    <AuthForm type={type} schema={type === 'signin' ? signInSchema : signUpSchema} defaultValues={defaultValues} role={role} />
  )
}

export default SignInForm