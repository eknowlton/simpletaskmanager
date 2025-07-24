import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PillProps {
  label: string;
  className?: string;
  onClick?: () => void;
}

export default function Pill({ label, className, onClick }: PillProps) {
  return (
    <Badge
      className={cn(
        "px-2 py-1 flex items-center justify-between gap-2 bg-inherit hover:bg-inherit text-muted-foreground border border-muted-foreground rounded-md",
        className
      )}
    >
      <span className="flex-1 text-center">{label}</span>
      {onClick && (
        <X
          className="w-4 h-4 flex-shrink-0 cursor-pointer hover:text-red-700 transition-colors"
          onClick={onClick}
        />
      )}
    </Badge>
  );
}
