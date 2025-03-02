import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
} from "../ui/dropdown-menu";

const CustomDropdown = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (t: boolean) => void;
}) => {
  return (
    <DropdownMenu open={open} onOpenChange={onOpenChange}>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Watchlist</DropdownMenuLabel>
        <DropdownMenuItem>Profile</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CustomDropdown;
