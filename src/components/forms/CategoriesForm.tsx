"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2 } from "lucide-react";

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
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { useParams, useRouter } from "next/navigation";
import { createCategory, updateCategory } from "@/lib/actions/category.actions";

const CategoriesForm = ({ default: defaultValues, cb }: { default?: { name: string, description?: string }; cb?: () => void }) => {
  const { toast } = useToast();
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: defaultValues?.name || "",
      description: defaultValues?.description || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof categorySchema>) => {
    let response: ApiResponse<categoryResponse>;
    try {
      if (defaultValues) {
        response = await updateCategory(id, values);
      } else {
        response = await createCategory(values);
      }

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

      // return to category table if callback is not specified
      if (cb) cb()
      else router.push('/admin/listings?tab=categories')
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-xl space-y-4 mx-auto">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize font-light text-sm after:content-['*'] after:text-red-500 after:inline-block after:ml-1">
                Name
              </FormLabel>
              <FormControl>
                <Input {...field} required placeholder="e.g Penthouses" className="h-10 md:h-14 rounded-md" />
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
              <FormLabel className="capitalize font-light">
                Description
              </FormLabel>
              <FormControl>
                <Textarea {...field} rows={6} maxLength={1000} placeholder="Add a brief description" className="resize-none" />
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
              <Loader2
                size={20}
                className="text-subtle-light animate-spin"
              />
              <span className="text-base  font-thin">{id ? 'Updating...' : 'Creating...'}</span>
            </>
          ) : (
            <span className="text-base  font-thin">{id ? 'Update' : 'Create'}</span>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default CategoriesForm;
