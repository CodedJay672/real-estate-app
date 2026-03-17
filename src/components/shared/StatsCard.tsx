import { ReactNode } from "react";

const StatsCard = ({ title, value, icon }: { title: string; value: number, icon: ReactNode }) => {
  return (
    <article className="w-full p-4 bg-light-50 border border-border rounded-xl">
      {icon}
      <h2 className="text-sm md:text-base text-primary">{title}</h2>
      <p className="text-3xl lg:text-4xl font-bold mt-3 text-primary">{value}</p>
    </article>
  );
};

export default StatsCard;
