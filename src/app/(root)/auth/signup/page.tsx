"use client";

import AuthForm from "@/components/shared/AuthForm";
import { signUp } from "@/lib/actions/auth";
import { signUpSchema } from "@/lib/validations/schema";
import React from "react";

const SignUp = () => {
  return (
    <section className="w-full px-2 py-10 gap-6">
      <div className="w-full px-2 py-10 max-w-screen-lg mx-auto flex flex-col lg:flex-row ">
        <div className="flex-1 p-6">
          <h2 className="text-3xl lg:text-5xl font-semibold text-gray-800 pr-10 ">
            Hey! Welcome Back. Sign up for a better experience.
          </h2>
        </div>
        <div className="w-96 max-w-md mx-auto shadow-xl rounded-lg p-6 mt-8 lg:mt-0">
          <AuthForm
            type="signup"
            schema={signUpSchema}
            defaultValues={{
              fullName: "",
              email: "",
              password: "",
            }}
            onSubmit={signUp}
          />
        </div>
      </div>
    </section>
  );
};

export default SignUp;
