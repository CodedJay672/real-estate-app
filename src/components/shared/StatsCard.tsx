import { ReactNode } from "react";

const StatsCard = ({ title, value, icon, description }: {
  title: string; value: number | string, icon?: ReactNode; description?:
  ReactNode
}) => {
  return (
    <article className="w-52 md:w-full p-4 bg-light-50 border border-border rounded-xl">
      {icon && icon}
      <h2 className="text-sm md:text-base text-primary">{title}</h2>
      <p className="text-3xl lg:text-4xl font-semibold mt-1.5 text-primary">{value}</p>
      {description && description}
    </article>
  );
};

export default StatsCard;
