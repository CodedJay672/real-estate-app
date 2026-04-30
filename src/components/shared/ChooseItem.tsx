import React from "react";

const ChooseItem = ({
  title,
  text,
  bgColor,
}: {
  title: string;
  text: string;
  bgColor: string;
}) => {
  return (
    <div
      className={`flex justify-start items-center p-4 w-full rounded-lg`}
      style={{ backgroundColor: bgColor }}
    >
      <div className="size-10 bg-primary p-3 rounded-lg flex-center">
        <h2 className="text-light-50 text-base md:text-lg font-bold">
          {title}
        </h2>
      </div>
      <p className="text-left text-sm md:text-base ml-2 font-bold">{text}</p>
    </div>
  );
};

export default ChooseItem;
