import CategoriesForm from "@/components/forms/CategoriesForm";

const CreateCategory = () => {
  return (
    <section className="wrapper flex flex-col">
      <div className="w-full lg:max-w-screen-md mb-4">
        <h1 className="text-xl lg:text-2xl font-semibold text-blue-300">
          Create category
        </h1>
        <p className="text-sm lg:text-base font-normal text-blue-300">
          Enter category details below
        </p>
      </div>

      <div className="w-full flex-1 flex-center">
        <div className="w-4/5 md:w-1/3 bg-subtle-light rounded-lg p-4 shadow-md">
          <CategoriesForm />
        </div>
      </div>
    </section>
  );
};

export default CreateCategory;
