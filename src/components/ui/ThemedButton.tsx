import type { ButtonHTMLAttributes, FC, ReactNode } from "react";

type ThemedButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  icon?: ReactNode;
  loading?: boolean;
};

export const ThemedButton: FC<ThemedButtonProps> = ({
  children,
  icon,
  className = "",
  loading = false,
  disabled,
  ...rest
}) => {
  const isDisabled = disabled || loading;

  // Base classes define the core style of the button.
  const baseClasses =
    "flex cursor-pointer tracking-normal h-auto items-center justify-center gap-2 rounded-2xl bg-transparent py-3 pr-[14px] pl-3 border-[#00000033] border-x-2 border-t-2 border-b-4 transition-all duration-50 ease-in-out hover:opacity-80 active:translate-y-0.5 active:transform-gpu active:border-b-2 disabled:bg-[#37464f] disabled:border-none disabled:text-[#52656d] disabled:cursor-not-allowed ";

  // Combine base classes with any custom classes passed via props.
  const combinedClasses = `${baseClasses} ${className}`.trim();

  return (
    <button
      className={combinedClasses}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-busy={loading || undefined}
      {...rest}
    >
      {icon}
      {children}
    </button>
  );
};
