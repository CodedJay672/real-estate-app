"use client";

import AuthForm from "@/components/shared/AuthForm";
import { signUp } from "@/lib/actions/auth";
import { signUpSchema } from "@/lib/validations/schema";
import { FcLike } from "react-icons/fc";
import { MdOutlineRecommend, MdOutlineTipsAndUpdates } from "react-icons/md";
import React from "react";

const SignUp = () => {
  return (
    <section className="w-full px-2 py-10 gap-6">
      <div className="w-full px-2 py-10 max-w-screen-lg mx-auto flex flex-col lg:flex-row ">
        <div className="flex-1 p-6">
          <h2 className="text-3xl lg:text-5xl font-semibold text-gray-800 pr-10 ">
            Create an account to save listings and much more
          </h2>
          <ul className="w-96 my-5 lg:my-10 text-gray-600 list-outside space-y-6">
            <li className="text-base font-medium flex items-start gap-2">
              <FcLike size={64} className="-mt-3" />
              <span className="leading-6">
                Save your favorite properties so that you can easily find them
                later.
              </span>
            </li>
            <li className="text-base font-medium flex items-start gap-2">
              <MdOutlineRecommend size={55} color="red" />
              <span className="leading-6">
                Get personalized recommendations based on your preferences.
              </span>
            </li>
            <li className="flex items-start gap-2 text-base font-medium">
              <MdOutlineTipsAndUpdates size={50} color="red" />
              <span className="leading-6">
                Stay updated on the latest listings in your area.
              </span>
            </li>
          </ul>
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
