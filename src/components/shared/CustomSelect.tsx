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
    <Select>
      <SelectTrigger className="form-select p-2 w-[180px] lg:w-[340px]">
        <SelectValue placeholder="Type" />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem
            key={option.value}
            onClick={() => onChange(option.value)}
            value={option.value}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CustomSelect;
