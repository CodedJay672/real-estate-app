import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Control, FieldPath } from "react-hook-form";
import { z } from "zod";
import { productSchema } from "@/lib/validations/schema";

interface Props {
  name: FieldPath<z.infer<typeof productSchema>>;
  control: Control<z.infer<typeof productSchema>>;
  label: string;
  type: string;
  placeholder: string;
}

const CustomInput = ({ name, label, type, control, placeholder }: Props) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel className="capitalize font-light text-sm after:content-['*'] after:text-red-500 after:inline-block after:ml-1">
            {label}
          </FormLabel>
          <FormControl>
            <Input
              type={type}
              {...field}
              placeholder={placeholder}
              className="w-full p-2 md:h-14 outline-0 border border-blue-100 text-base focus:ring-0 focus:outline-blue-200"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomInput;
