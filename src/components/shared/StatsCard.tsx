import React from "react";

const StatsCard = ({ title, value }: { title: string; value: number }) => {
  return (
    <article className="w-full p-4 shadow-md rounded-xl bg-subtle-light">
      <h2 className="text-sm lg:text-lg font-normal">{title}</h2>
      <p className="text-3xl lg:text-4xl font-bold text-blue-300">{value}</p>
    </article>
  );
};

export default StatsCard;
