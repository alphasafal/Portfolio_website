import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function ProductFrame({ children, className }: Props) {
  return (
    <div
      className={cn(
        "product-frame rounded-xl bg-[#f6f6f8] p-2 shadow-[0_20px_50px_rgba(0,0,0,0.45)]",
        className
      )}
    >
      <div className="overflow-hidden rounded-lg bg-[#ececef]">{children}</div>
    </div>
  );
}
