"use client";

import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { usePathname, useRouter } from "next/navigation";


import { useToast } from "@/hooks/use-toast";
import { contactSchema } from "@/lib/validations/schema";
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
import { Textarea } from "../ui/textarea";
import { sendMessage } from "@/lib/actions/messages.actions";
import { Loader2 } from "lucide-react";

const ContactForm = ({ propertyName }: { propertyName: string }) => {
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof contactSchema>) => {
    // verify auth
    if (!session?.user) {
      toast({
        title: "Error: unauthorized",
        description: "Please login to make enquiries",
        variant: "destructive"
      })

      return router.push(`/sign-in?next=${pathname}`);
    }

    // send enquiry
    const response = await sendMessage(values);
    if (!response.success) {
      toast({
        title: "Error",
        description: response.message,
        variant: 'destructive'
      })
      return;
    }

    //reset the form
    form.reset();
    toast({
      title: "Success",
      description: "Message sent successfully",
    });
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
                  className=" w-full bg-light-50 rounded-md"
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
                  className="bg-light-50 w-full rounded-md"
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
                  placeholder={`Hello, I need more info about this ${propertyName}`}
                  className="bg-light-50 w-full p-2 rounded-md resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full text-dark-200 bg-accent-bright hover:bg-accent-bright  cursor-pointer font-semibold"
        >
          {form.formState.isSubmitting ? <Loader2 size={20} className="text-dark-200 animate-spin" /> : "Send Message"}

        </Button>
      </form>
    </Form>
  );
};

export default ContactForm;
