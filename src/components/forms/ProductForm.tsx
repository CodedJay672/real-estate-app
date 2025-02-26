"use client";

import { productSchema } from "@/lib/validations/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { RiLoader5Line } from "react-icons/ri";
import { Textarea } from "../ui/textarea";
import FileUploader from "../shared/FileUploader";
import { useToast } from "@/hooks/use-toast";
import { updateProductById, uploadProducts } from "@/lib/actions/auth";
import { useRouter } from "next/navigation";
import CustomInput from "./CustomInput";
import CustomSelect from "./CustomSelect";

const ProductForm = ({
  type,
  product,
  categories,
}: {
  type: string;
  product?: any;
  categories: any[];
}) => {
  const { toast } = useToast();
  const router = useRouter();
  const id = product ? product.id : null;

  const productCategories = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name || "",
      title: product?.title || "",
      description: product?.description || "",
      price: product?.price || 0,
      location: product?.location || "",
      bedrooms: product?.bedrooms || 0,
      bathrooms: product?.bathrooms || 0,
      size: product?.size || 0,
      type: product?.type || "",
      categoryId: product?.categoryId || "",
      listingStatus: product?.listingStatus || "selling",
      imageUrl: product?.imageUrl || "",
      amenities: product?.amenities || "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof productSchema>) => {
    try {
      const response =
        type === "add-new " || !id
          ? await uploadProducts(values)
          : await updateProductById(id, values);

      if (!response.success) {
        toast({
          title: "Error",
          description: response.message,
          variant: "destructive",
        });
      }

      toast({
        title: "Success!!",
        description: response.message,
      });
      router.push("/admin");
    } catch (error: any) {
      toast({
        title: "An error occurred",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <CustomInput
          name="name"
          label="Name"
          type="text"
          control={form.control}
          placeholder="Enter property Name"
        />
        <CustomInput
          name="location"
          label="Location"
          type="text"
          control={form.control}
          placeholder="Location of property"
        />
        <CustomInput
          name="title"
          label="Title"
          type="text"
          control={form.control}
          placeholder="Enter property title"
        />
        <div className="flex items-center justify-between gap-2">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="capitalize font-light text-sm after:content-['*'] after:text-red-500 after:inline-block after:ml-1">
                  Property Type
                </FormLabel>
                <FormControl>
                  <CustomSelect
                    options={[
                      { value: "house", label: "House" },
                      { value: "land", label: "Land" },
                    ]}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="capitalize font-light text-sm after:content-['*'] after:text-red-500 after:inline-block after:ml-1">
                  Category
                </FormLabel>
                <FormControl>
                  <CustomSelect
                    options={productCategories}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="w-full flex items-center justify-between gap-2">
          <FormField
            control={form.control}
            name="listingStatus"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="capitalize font-light text-sm after:content-['*'] after:text-red-500 after:inline-block after:ml-1">
                  Property Status
                </FormLabel>
                <FormControl>
                  <CustomSelect
                    options={[
                      { value: "selling", label: "Selling" },
                      { value: "sold out", label: "Sold Out" },
                      { value: "reopened", label: "Reopened" },
                    ]}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <CustomInput
            name="price"
            label="Price"
            type="number"
            control={form.control}
            placeholder="Enter price..."
          />
        </div>
        <div className="flex items-center justify-between gap-2">
          {form.getValues("type") === "house" && (
            <>
              <CustomInput
                name="bedrooms"
                label="Bedrooms"
                type="nubmer"
                control={form.control}
                placeholder="Bedrooms"
              />
              <CustomInput
                name="bathrooms"
                label="Bathrooms"
                type="nubmer"
                control={form.control}
                placeholder="Bedrooms"
              />
            </>
          )}

          <CustomInput
            name="size"
            label="Size"
            type="nubmer"
            control={form.control}
            placeholder="Bedrooms"
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize font-light text-sm after:content-['*'] after:text-red-500 after:inline-block after:ml-1">
                Description
              </FormLabel>
              <FormControl>
                <Textarea rows={7} placeholder="Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize font-light text-sm after:content-['*'] after:text-red-500 after:inline-block after:ml-1">
                Images
              </FormLabel>
              <FormControl>
                <FileUploader onFieldChange={field.onChange} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <CustomInput
          name="amenities"
          label="Amenities"
          type="text"
          control={form.control}
          placeholder="Seperate list with a comma (,)"
        />

        <Button
          type="submit"
          className="w-full md:h-14 flex items-center bg-primary"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting && (
            <RiLoader5Line size={24} className="animate-spin mr-2" />
          )}
          {type === "add-new" ? "Add Product" : "Update Product"}
        </Button>
      </form>
    </Form>
  );
};

export default ProductForm;
