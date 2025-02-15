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
import { Input } from "../ui/input";
import CustomSelect from "./CustomSelect";
import { Textarea } from "../ui/textarea";
import FileUploader from "./FileUploader";
import { useToast } from "@/hooks/use-toast";
import { uploadProducts } from "@/lib/actions/auth";

const ProductForm = () => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      title: "",
      description: "",
      price: 0,
      location: "",
      propertyType: "house",
      bedrooms: 0,
      bathrooms: 0,
      size: 0,
      listingStatus: "selling",
      imageUrl: "",
      amenities: "",
      landmarks: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof productSchema>) => {
    try {
      const response = await uploadProducts(values);

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
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize font-light text-sm after:content-['*'] after:text-red-500 after:inline-block after:ml-1">
                Name
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  {...field}
                  className="w-full p-2 h-14 outline-0 border border-blue-100 text-base focus:ring-0 focus:outline-blue-200"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize font-light text-sm after:content-['*'] after:text-red-500 after:inline-block after:ml-1">
                Title
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  {...field}
                  className="w-full p-2 h-14 outline-0 border border-blue-100 text-base focus:ring-0 focus:outline-blue-200"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize font-light text-sm after:content-['*'] after:text-red-500 after:inline-block after:ml-1">
                Location
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  {...field}
                  className="w-full p-2 h-14 outline-0 border border-blue-100 text-base focus:ring-0 focus:outline-blue-200"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between items-center space-x-2">
          <FormField
            control={form.control}
            name="propertyType"
            render={({ field }) => (
              <FormItem>
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
            name="listingStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize font-light text-sm after:content-['*'] after:text-red-500 after:inline-block after:ml-1">
                  Listing Status
                </FormLabel>
                <FormControl>
                  <CustomSelect
                    options={[
                      { value: "selling", label: "Selling" },
                      { value: "soldOut", label: "Sold Out" },
                      { value: "reOpened", label: "Sales Reopened" },
                    ]}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="bedrooms"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize font-light text-sm after:content-['*'] after:text-red-500 after:inline-block after:ml-1">
                  Bedrooms
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    className="w-full p-2 h-14 outline-0 border border-blue-100 text-base focus:ring-0 focus:outline-blue-200"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bathrooms"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize font-light text-sm after:content-['*'] after:text-red-500 after:inline-block after:ml-1">
                  Bathrooms
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    className="w-full p-2 h-14 outline-0 border border-blue-100 text-base focus:ring-0 focus:outline-blue-200"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="size"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize font-light text-sm after:content-['*'] after:text-red-500 after:inline-block after:ml-1">
                  Square Feet
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    className="w-full p-2 h-14 outline-0 border border-blue-100 text-base focus:ring-0 focus:outline-blue-200"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize font-light text-sm after:content-['*'] after:text-red-500 after:inline-block after:ml-1">
                  Price
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    className="w-full p-2 h-14 outline-0 border border-blue-100 text-base focus:ring-0 focus:outline-blue-200"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
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

        <FormField
          control={form.control}
          name="amenities"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize font-light text-sm after:content-['*'] after:text-red-500 after:inline-block after:ml-1">
                Amenities
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Seperate list with a comma (,)"
                  {...field}
                  className="w-full p-2 h-14 outline-0 border border-blue-100 text-base focus:ring-0 focus:outline-blue-200 placeholder:text-gray-300"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full h-14 flex items-center"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting && (
            <RiLoader5Line size={24} className="animate-spin mr-2" />
          )}
          Add Product
        </Button>
      </form>
    </Form>
  );
};

export default ProductForm;
