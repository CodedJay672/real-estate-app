"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { contactSchema } from "@/lib/validations/schema";
import { z } from "zod";
import { Textarea } from "../ui/textarea";

const ContactForm = ({ className }: { className: string }) => {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof contactSchema>) => {
    //send the message
    toast({
      title: "Success",
      description: "Message sent successfully",
    });
    router.push("/");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize text-sm md:text-base after:content-['*'] after:text-red-500 after:inline-block after:ml-1">
                Name
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  required
                  placeholder="Cynthia Adetunji"
                  className={`${className} w-full rounded-md`}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize text-sm md:text-base after:content-['*'] after:text-red-500 after:inline-block after:ml-1">
                Email
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  required
                  placeholder="example123@gmail.com"
                  className={`${className} w-full rounded-md`}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize text-sm md:text-base after:content-['*'] after:text-red-500 after:inline-block after:ml-1">
                Message
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  rows={6}
                  required
                  placeholder="Hello, please give me more information about the location of this property."
                  className={`${className} w-full p-2 rounded-md resize-none`}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full text-dark-200 bg-accent-bright hover:bg-accent-bright  cursor-pointer font-semibold"
        >
          Send Message
        </Button>
      </form>
    </Form>
  );
};

export default ContactForm;
