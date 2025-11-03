import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import * as React from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchBar = ({
  value,
  onChange,
  placeholder = "Search prompts...",
  className,
}: SearchBarProps) => {
  return (
    <div className={"relative w-full max-w-2xl " + (className ?? "")}
    >
      <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        className="pl-10 h-12 text-base shadow-card"
      />
    </div>
  );
};
