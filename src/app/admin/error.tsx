"use client";

import React from "react";

const ErrorFile = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="size-96 flex justify-center items-center flex-col">
        <h1 className="text-9xl text-center font-bold">Oops!!</h1>
        <p className="text-2xl text-center font-bold">
          Something broke. Please refresh the page.
        </p>
      </div>
    </div>
  );
};

export default ErrorFile;
