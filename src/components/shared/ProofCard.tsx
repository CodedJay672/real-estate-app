"use client";
import { CgProfile } from "react-icons/cg";
import { ImQuotesLeft } from "react-icons/im";
import { ImQuotesRight } from "react-icons/im";

const ProofCard = ({
  text,
  name,
  title,
}: {
  title: string;
  name: string;
  text: string;
}) => {
  return (
    <div className="min-w-64 h-80 rounded-xl bg-subtle-light opacity-90 p-6 z-20 shadow-lg flex flex-col justify-between">
      <div className="flex-1 flex flex-col justify-between">
        <div className="w-full flex justify-start -mb-10">
          <ImQuotesLeft size={84} color="#bfd1e62a" />
        </div>
        <p className="text-base lg:text-lg text-center leading-5 tracking-wider font-light">
          {text}
        </p>
        <div className="w-full flex justify-end -mt-10">
          <ImQuotesRight size={84} color="#bfd1e62a" />
        </div>
      </div>
      <div className="flex justify-center items-center gap-1">
        <CgProfile className="text-blue-200 size-8 md:size-10" />

        <div className="flex-1">
          <h3 className="text-sm lg:text-base font-semibold leading-4">
            {name}
          </h3>
          <p className="text-xs md:text-sm text-left">{title}</p>
        </div>
      </div>
    </div>
  );
};

export default ProofCard;
