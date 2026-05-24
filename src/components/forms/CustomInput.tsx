import { z } from "zod";
import { Control, FieldPath } from "react-hook-form";

import { cn } from "@/lib/utils";
import { productSchema } from "@/lib/validations/schema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

interface Props {
  name: FieldPath<z.infer<typeof productSchema>>;
  control: Control<z.infer<typeof productSchema>>;
  label: string;
  type: string;
  placeholder: string;
  required?: boolean;
}

const CustomInput = ({ name, label, type, control, placeholder, required }: Props) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel className={cn("first-letter:capitalize font-light text-sm", required && "after:content-['*'] after:text-red-500 after:inline-block after:ml-1")}>
            {label}
          </FormLabel>
          <FormControl>
            <Input
              type={type}
              {...field}
              placeholder={placeholder}
              required={required}
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
