import { LoaderCircle } from "lucide-react";

import { cn } from "@/lib/utils";

interface LoaderProps {
  size?: number;
  color?: string;
  className?: string;
  iconClassName?: string;
}

const Spinner = ({
  size = 18,
  color = "text-muted-foreground",
  className = "",
  iconClassName = ""
}: LoaderProps) => {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <LoaderCircle
        className={cn("animate-spin", color, iconClassName)}
        style={{ width: size, height: size }}
      />
    </div>
  );
};

export default Spinner;
