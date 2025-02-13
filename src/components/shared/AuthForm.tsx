"use client";

import React from "react";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodType } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FIELD_NAMES, FIELD_TYPES } from "@/constants";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { RiLoader5Line } from "react-icons/ri";
import { useRouter } from "next/navigation";

interface AuthFormProps<T extends FieldValues> {
  type: "signin" | "signup";
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (values: T) => Promise<{ success: boolean; message: string }>;
}

const AuthForm = <T extends FieldValues>({
  type,
  schema,
  defaultValues,
  onSubmit,
}: AuthFormProps<T>) => {
  const { toast } = useToast();
  const router = useRouter();
  const isSignIn = type === "signin";

  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async (values) => {
    try {
      const res = await onSubmit(values);

      if (!res.success) {
        toast({
          title: "Error",
          description: res.message,
          variant: "destructive",
        });
      }

      toast({
        title: "Success",
        description: res.message,
      });
      router.push("/");
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
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        {Object.keys(defaultValues).map((key) => (
          <FormField
            key={key}
            control={form.control}
            name={key as Path<T>}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize font-light text-sm after:content-['*'] after:text-red-500 after:inline-block after:ml-1">
                  {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                </FormLabel>
                <FormControl>
                  <Input
                    type={FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]}
                    {...field}
                    className="w-full p-2 h-14 outline-0 outline-blue-300 text-base bg-blue-100 focus:ring-0 focus:outline-blue-200"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button
          type="submit"
          className="w-full h-14 flex items-center"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting && (
            <RiLoader5Line className="animate-spin mr-2" />
          )}

          {isSignIn ? "Sign In" : "Sign Up"}
        </Button>

        <p className="text-sm font-medium">
          {isSignIn ? "Don't have an account? " : "Already have an account? "}
          {isSignIn ? (
            <Link href="/auth/signup" className="font-bold text-gold text-lg">
              Sign up
            </Link>
          ) : (
            <Link href="/auth/sign-in" className="font-bold text-gold text-lg">
              Login
            </Link>
          )}
        </p>
      </form>
    </Form>
  );
};

export default AuthForm;
