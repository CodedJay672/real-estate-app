
const StatsCard = ({ title, value }: { title: string; value: number }) => {
  return (
    <article className="w-full p-4 border border-border rounded-xl">
      <h2 className="text-sm md:text-base text-primary">{title}</h2>
      <p className="text-3xl lg:text-4xl font-bold text-primary">{value}</p>
    </article>
  );
};

export default StatsCard;
