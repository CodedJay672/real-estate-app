"use client";

import { useRouter } from "next/navigation";
import { use, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { productSchema } from "@/lib/validations/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import FileUploader from "../shared/FileUploader";
import { useToast } from "@/hooks/use-toast";
import CustomInput from "./CustomInput";
import CustomSelect from "./CustomSelect";
import { generateErrorMessage } from "@/lib/utils";
import { updateProductById, uploadProducts } from "@/lib/actions/products.actions";
import { Loader2 } from "lucide-react";
import { useProductProvider } from "../providers/StoreProvider";

interface ProductFormProps {
  type: 'add-new' | 'update',
  categories: Promise<ApiResponse<categoryResponse[]>>
  productId?: string;
  defaultCategoryId?: string;
  product?: Promise<ApiResponse<listings>>;
  callbackFn?: () => void
}

const ProductForm = ({
  productId,
  type,
  product,
  categories,
  defaultCategoryId,
  callbackFn
}: ProductFormProps) => {
  const { setProductImageId, productImageId } = useProductProvider((state) => state);

  const { toast } = useToast();
  const router = useRouter();


  // resolve categories
  const categoryList = use(categories);
  const productCategories = categoryList.data?.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  // resolve the product if an id is available
  let productInfo: ApiResponse<listings> | undefined;
  if (productId && product) productInfo = use(product);

  // form structure and default values
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: productInfo?.data?.name || "",
      title: productInfo?.data?.title || "",
      description: productInfo?.data?.description || "",
      price: productInfo?.data?.price || 0,
      location: productInfo?.data?.location || "",
      bedrooms: productInfo?.data?.bedrooms || 0,
      bathrooms: productInfo?.data?.bathrooms || 0,
      size: productInfo?.data?.size || 0,
      categoryId: productInfo?.data?.categoryId || "",
      listingStatus: productInfo?.data?.listingStatus || "selling",
      imageUrl: productInfo?.data?.imageUrl || "",
      imageId: productInfo?.data?.imageId || "",
      tags: productInfo?.data?.tags || "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof productSchema>) => {
    try {
      const response =
        type === "add-new" || !productId
          ? await uploadProducts({ ...values, imageId: productImageId })
          : await updateProductById(productId, { ...values, imageId: productImageId });

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

      if (callbackFn) callbackFn()
      else router.push("/admin/listings");
    } catch (error) {
      toast({
        title: "An error occurred",
        description: generateErrorMessage(error),
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
          required={true}
        />
        <CustomInput
          name="location"
          label="Location"
          type="text"
          control={form.control}
          placeholder="Location of property"
          required={true}
        />
        <div className="flex items-center justify-between gap-2">
          <CustomInput
            name="title"
            label="Title"
            type="text"
            control={form.control}
            placeholder="Enter property title"
            required={true}
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
                    value={field.value}
                    defaultValue={defaultCategoryId || ""}
                    options={productCategories ?? []}
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
                    value={field.value}
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
            required={true}
          />
        </div>
        <div className="flex items-center justify-between gap-2">
          <CustomInput
            name="bedrooms"
            label="Bedrooms (Optional)"
            type="nubmer"
            control={form.control}
            placeholder="Bedrooms"
          />
          <CustomInput
            name="bathrooms"
            label="Bathrooms (Optional)"
            type="nubmer"
            control={form.control}
            placeholder="Bedrooms"
          />

          <CustomInput
            name="size"
            label="Size (optional)"
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
                <Textarea rows={7} placeholder="Description" required {...field} />
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
                <FileUploader onFieldChange={field.onChange} imageId={productInfo?.data?.imageId ?? ""} {...field} />
              </FormControl>
              <FormMessage />
              <FormDescription>
                (Only JPEG and PNG files are acceptable. Max 2MB)
              </FormDescription>
            </FormItem>
          )}
        />

        <CustomInput
          name="tags"
          label="Tags (add SEO related tags)"
          type="text"
          control={form.control}
          placeholder="Seperate list with a comma (,)"
          required={true}
        />

        <Button
          type="submit"
          className="w-full md:h-14 flex items-center bg-primary"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting && (
            <Loader2 size={24} className="animate-spin mr-2" />
          )}
          {type === "add-new" ? "Add Product" : "Update Product"}
        </Button>
      </form>
    </Form>
  );
};

export default ProductForm;
