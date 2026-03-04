"use client";

import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { ZodType } from "zod";

import { FIELD_NAMES, FIELD_TYPES } from "@/constants";
import { useToast } from "@/hooks/use-toast";
import { signUp } from "@/lib/actions/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

interface AuthFormProps<T extends FieldValues> {
  type: "signin" | "signup";
  schema: ZodType<T>;
  defaultValues: T;
  redirectUrl?: string
}

const AuthForm = <T extends FieldValues>({
  type,
  schema,
  defaultValues,
  redirectUrl
}: AuthFormProps<T>) => {
  const { toast } = useToast();
  const router = useRouter();
  const [error, setError] = useState<Record<string, string[]> | null>(null);


  const { role, ...otherFields } = defaultValues;

  const isSignIn = type === "signin";

  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async (values) => {
    setError(null);

    try {
      // handle new users
      if (type === "signup") {

        const newSignUp = await signUp({ fullName: values.fullName, email: values.email, password: values.password, role: values.role });

        // handle error;
        if (!newSignUp.success) {
          if (newSignUp.error) {
            setError(newSignUp.error);
          }

          toast({
            title: "Error",
            description: newSignUp?.message || "Failed to sign in",
            variant: "destructive",
          });
          return;
        }

        toast({
          title: "Success",
          description: newSignUp.message,
          variant: "default"
        });
      }

      //go on to sign user in
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (!res?.ok) {
        toast({
          title: "Error",
          description: res?.error || "Failed to sign in",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Successfully signed in",
      });
      router.push(redirectUrl || "/");
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
      <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full max-w-md space-y-8 p-3">
        <fieldset className="space-y-2">
          {Object.keys(otherFields).map((key) => (
            <FormField
              key={key}
              control={form.control}
              name={key as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize font-light after:content-['*'] after:text-red-500 after:inline-block after:ml-1">
                    {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type={FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]}
                      {...field}
                      className="w-full focus-visible::ring-0 focus-visible:ring-offset-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          {type === 'signin' && (
            <Link href="/forgot-password" className="text-sm text-right block text-red-500">
              Forgot password?
            </Link>
          )}
        </fieldset>

        {error &&
          <fieldset className="bg-red-100 rounded-lg p-1.5 space-y-2">
            {Object.entries(error).map(([field, messages]) => (
              <Fragment key={field}>
                {messages.map((message, index) => (
                  <p key={index} className="text-sm text-red-500">
                    {FIELD_NAMES[field as keyof typeof FIELD_NAMES]}: {message}
                  </p>
                ))}
              </Fragment>
            ))}
          </fieldset>
        }

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full h-12 cursor-pointer"
        >
          {form.formState.isSubmitting && (
            <Loader2 className="animate-spin mr-2" />
          )}

          {isSignIn ? "Sign In" : "Sign Up"}
        </Button>

        <p className="text-sm text-center">
          {isSignIn ? "Don't have an account? " : "Already have an account? "}
          {isSignIn ? (
            <Link href="/sign-up" className="font-medium text-green-500 text-sm">
              Sign up
            </Link>
          ) : (
            <Link href="/sign-in" className="font-medium text-green-500 text-sm">
              Login
            </Link>
          )}
        </p>
      </form>
    </Form>
  );
};

export default AuthForm;
