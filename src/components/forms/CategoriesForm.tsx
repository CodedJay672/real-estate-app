"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { categorySchema } from "@/lib/validations/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { ImSpinner4 } from "react-icons/im";
import { createCategory } from "@/lib/actions/auth";

const CategoriesForm = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof categorySchema>) => {
    try {
      const response = await createCategory(values);

      if (!response.success) {
        toast({
          title: "Error",
          description: response.message,
          variant: "destructive",
        });
        return false;
      }

      toast({
        title: "Success!!",
        description: response.message,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize font-light text-sm after:content-['*'] after:text-red-500 after:inline-block after:ml-1">
                Name
              </FormLabel>
              <FormControl>
                <Input {...field} className="h-10 md:h-14 rounded-md" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize font-light text-sm after:content-['*'] after:text-red-500 after:inline-block after:ml-1">
                Description
              </FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-primary flex justify-center items-center"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <>
              <ImSpinner4
                size={20}
                className="text-subtle-light animate-spin"
              />
              <span className="text-base  font-thin">Creating...</span>
            </>
          ) : (
            <span className="text-base  font-thin">Create</span>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default CategoriesForm;
