"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { signUp } from "@/lib/actions/auth";
import { signUpSchema } from "@/lib/validations/schema";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FIELD_NAMES } from "@/constants";
import { generateErrorMessage } from "@/lib/utils";

type CreateUserFormValues = z.infer<typeof signUpSchema>;

const defaultValues: CreateUserFormValues = {
  fullName: "",
  email: "",
  password: "",
  role: "admin",
};

export default function AdminCreateUserForm() {
  const [serverError, setServerError] = useState<Record<string, string[]> | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<CreateUserFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues,
  });

  const handleCreate: SubmitHandler<CreateUserFormValues> = async (values) => {
    setServerError(null);
    setIsSubmitting(true);

    try {
      const response = await signUp({
        fullName: values.fullName,
        email: values.email,
        password: values.password,
        role: values.role,
      });

      if (!response.success) {
        setServerError(response.error ?? null);
        toast({
          title: "Could not create user",
          description: response.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Account created",
        description: `${response.data?.fullName} has been created as ${response.data?.role}.`,
      });
      form.reset(defaultValues);
      router.refresh();
    } catch (error) {
      setServerError({ form: [generateErrorMessage(error)] });
      toast({
        title: "Error",
        description: generateErrorMessage(error),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleCreate)} className="space-y-6">
        <div className="w-full md:w-sm space-y-4">
          {(["fullName", "email", "password"] as const).map((fieldName) => (
            <FormField
              key={fieldName}
              control={form.control}
              name={fieldName}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize font-medium">
                    {FIELD_NAMES[field.name]}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type={fieldName === "password" ? "password" : fieldName === "email" ? "email" : "text"}
                      placeholder={`Enter ${FIELD_NAMES[field.name]}`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium">Role</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                  >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {serverError && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {Object.entries(serverError).map(([field, messages]) => (
              <div key={field} className="space-y-1">
                <p className="font-semibold">{field === "form" ? "Error" : FIELD_NAMES[field as keyof typeof FIELD_NAMES] ?? field}</p>
                {messages.map((message, index) => (
                  <p key={index}>{message}</p>
                ))}
              </div>
            ))}
          </div>
        )}

        <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto px-6">
          {isSubmitting ? "Creating…" : "Create account"}
        </Button>
      </form>
    </Form>
  );
}
