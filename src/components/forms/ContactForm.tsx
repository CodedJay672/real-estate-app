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

    // append propertyName to the form values
    const submissionValues = {
      ...values,
      propertyName: propertyName || "General Inquiry",
    };

    // send enquiry
    const response = await sendMessage(submissionValues);
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
      title: "Enquiry Sent Successfully!",
      description: "We have registered your lead in our CRM pipeline and sent a confirmation email.",
    });

    // Automatically trigger WhatsApp journey redirection
    const whatsappMsg = `Hi Lauretta, I just submitted an inquiry on the website for "${propertyName || "Exclusive Properties"}". I'm interested as a ${values.leadType} and would like to schedule a viewing! My details: Name: ${values.name}, Email: ${values.email}, Phone: ${values.phone || "N/A"}.`;
    const whatsappUrl = `https://wa.me/2348000000000?text=${encodeURIComponent(whatsappMsg)}`;
    
    // Redirect after a small delay
    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
    }, 1500);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize text-sm md:text-base after:content-['*'] after:text-red-500 after:inline-block after:ml-1 font-medium">
                Full Name
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  required
                  placeholder="Cynthia Adetunji"
                  className="w-full bg-light-50 rounded-md border border-slate-200 p-2 text-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize text-sm md:text-base after:content-['*'] after:text-red-500 after:inline-block after:ml-1 font-medium">
                  Email Address
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    required
                    type="email"
                    placeholder="example123@gmail.com"
                    className="bg-light-50 w-full rounded-md border border-slate-200 p-2 text-sm"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize text-sm md:text-base font-medium">
                  Phone Number
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="tel"
                    placeholder="+234 803 123 4567"
                    className="bg-light-50 w-full rounded-md border border-slate-200 p-2 text-sm"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="leadType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize text-sm md:text-base font-medium">
                I am looking to...
              </FormLabel>
              <FormControl>
                <select
                  value={field.value}
                  onChange={field.onChange}
                  className="bg-light-50 w-full p-2.5 rounded-md border border-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-accent-bright font-medium"
                >
                  <option value="buyer">Buy a Premium Property</option>
                  <option value="renter">Rent a Luxury Property</option>
                  <option value="seller">Sell/List my Property</option>
                </select>
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
              <FormLabel className="capitalize text-sm md:text-base after:content-['*'] after:text-red-500 after:inline-block after:ml-1 font-medium">
                Message / Inquiries
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  rows={4}
                  required
                  placeholder={`Hello Lauretta, I need more info about ${propertyName || "this luxury property"}`}
                  className="bg-light-50 w-full p-2 rounded-md border border-slate-200 resize-none text-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full text-dark-200 bg-accent-bright hover:bg-accent-bright/90 cursor-pointer font-bold py-3 rounded-lg flex items-center justify-center gap-2 text-base transition-all shadow-md"
        >
          {form.formState.isSubmitting ? (
            <Loader2 size={20} className="text-dark-200 animate-spin" />
          ) : (
            "Book Viewing & Inquire"
          )}
        </Button>

        <div className="text-center pt-2">
          <p className="text-xs text-slate-500">
            ⚡ Submitting will instantly register you in our CRM, email you a package, and open WhatsApp to secure a priority booking.
          </p>
        </div>
      </form>
    </Form>
  );
};

export default ContactForm;
