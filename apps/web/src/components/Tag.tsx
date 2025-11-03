import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TagProps {
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
  className?: string;
}

export const Tag = ({ children, onClick, active, className }: TagProps) => {
  return (
    <Badge
      variant={active ? "default" : "secondary"}
      className={cn(
        "cursor-pointer transition-smooth hover:opacity-80",
        active && "gradient-primary text-white",
        className
      )}
      onClick={onClick}
    >
      {children}
    </Badge>
  );
};
export default Tag;