import CategoriesForm from "@/components/forms/CategoriesForm";
import Back from "@/components/shared/Back";

const CreateCategory = () => {
  return (
    <section className="wrapper">
      <div className="flex gap-1">
        <Back />
        <div className="space-y-0.5">
          <h1 className="text-lg md:text-xl font-semibold text-dark-200">
            Create category
          </h1>
          <p className="text-sm md:text-base font-normal text-dark-50">
            Enter category details below
          </p>
        </div>
      </div>

      <CategoriesForm />
    </section>
  );
};

export default CreateCategory;
