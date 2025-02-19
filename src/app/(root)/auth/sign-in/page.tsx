"use client";

import AuthForm from "@/components/shared/AuthForm";
import { signInWithCreds } from "@/lib/actions/auth";
import { signInSchema } from "@/lib/validations/schema";
import Image from "next/image";

const SignIn = () => {
  return (
    <section className="w-full px-2 py-10 gap-6">
      <div className="w-full px-2 py-10 mx-auto flex flex-col lg:flex-row ">
        <div className="w-full md:max-w-screen-sm flex-1 p-6 flex flex-col justify-center items-center mx-auto">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-gray-800 p-2 lg:pr-10 mb-10">
            Hey! Welcome back. Sign in to keep seeing all your favorite
            listings.
          </h2>
          <Image
            src="/assets/interview.svg"
            alt="Sign up"
            width={300}
            height={300}
            className="object-contain w-[200px] md:w-[300px] lg:w-[400px]"
          />
        </div>
        <div className="w-full max-w-md max-h-max mx-auto shadow-xl rounded-lg p-6 mt-8 lg:mt-0">
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
