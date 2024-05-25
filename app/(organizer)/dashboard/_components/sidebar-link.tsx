import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SidebarLink({
  href,
  label,
  icon,
  disabled,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  disabled?: boolean;
}) {
  const pathname = usePathname();
  return (
    <div>
      <li>
        <Link
          className="h-full relative flex items-center whitespace-nowrap rounded-md hover:text-primary text-muted-foreground duration-200 font-medium"
          href={href}
        >
          <div
            className={cn(
              "relative font-base text-sm py-1.5 px-2 flex flex-row items-center space-x-2 rounded-md duration-100",
              disabled &&
                " opacity-40 cursor-not-allowed text-primary transition-none",
              pathname === href && "text-primary "
            )}
          >
            {icon}
            <span>{label}</span>
          </div>
        </Link>
      </li>
    </div>
  );
}
