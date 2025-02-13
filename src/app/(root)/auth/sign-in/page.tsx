"use client";

import AuthForm from "@/components/shared/AuthForm";
import { signInWithCreds } from "@/lib/actions/auth";
import { signInSchema } from "@/lib/validations/schema";
import Image from "next/image";

const SignIn = () => {
  return (
    <section className="w-full px-2 py-10 gap-6">
      <div className="w-full px-2 py-10 max-w-screen-lg mx-auto flex flex-col lg:flex-row ">
        <div className="flex-1 p-6">
          <h2 className="text-3xl lg:text-5xl font-semibold text-gray-800 pr-10 mb-10">
            Hey! Welcome back. Sign in to keep seeing all your favorite
            listings.
          </h2>
          <Image
            src="/assets/interview.svg"
            alt="Sign up"
            width={300}
            height={300}
            className="object-contain"
          />
        </div>
        <div className="w-96 max-w-md mx-auto shadow-xl rounded-lg p-6 mt-8 lg:mt-0">
          <AuthForm
            type="signin"
            schema={signInSchema}
            defaultValues={{
              email: "",
              password: "",
            }}
            onSubmit={signInWithCreds}
          />
        </div>
      </div>
    </section>
  );
};

export default SignIn;
