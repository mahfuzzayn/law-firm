import { cn } from "@/lib/utils";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  as?: "section" | "div" | "article";
  variant?: "public" | "dashboard";
};

export function Container({
  children,
  className,
  as: Tag = "div",
  variant = "public",
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        variant === "public" && "max-w-7xl",
        variant === "dashboard" && "max-w-none",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
