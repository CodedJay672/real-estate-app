import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectProps {
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}

const CustomSelect = ({ options, onChange }: SelectProps) => {
  return (
    <Select onValueChange={onChange} defaultValue={options[0].value}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Type" className="min-w-full" />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CustomSelect;
