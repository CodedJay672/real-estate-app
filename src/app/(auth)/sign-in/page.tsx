
import AuthForm from '@/components/forms/AuthForm'
import { signInWithCreds } from '@/lib/actions/auth'
import { signInSchema } from '@/lib/validations/schema'
import { User } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Sign In | Clean Beautiful Properties",
  description:
    "Clean beautiful properties is a real estate listing platform where you can find your next home or investment property.",
};

const SignIn = () => {
  return (
    <div className='w-5/6 md:w-1/2 '>
      <section className='w-full h-full flex-center flex-col gap-1.5'>
        <div className='p-2 rounded-full bg-light-100'>
          <User size={20} className='fill-dark-200' />
        </div>
        <p className='text-sm md:text-base text-dark-200'>Login to continue</p>
        <AuthForm type='signin' schema={signInSchema} defaultValues={{ email: "", password: "" }} onSubmit={signInWithCreds} redirectUrl='/' />
      </section>
    </div>
  )
}

export default SignIn