import { HTMLProps, PropsWithChildren } from "react";

const buttonClasses: Record<ButtonVariants, string> = {
  PRIMARY:
    "bg-blue-500 hover:bg-blue-600 transition-colors gap-1 px-2 h-8 rounded-md text-slate-100 flex items-center justify-start",
  SECONDARY:
    "bg-white hover:bg-slate-100 transition-colors gap-1 px-2 h-8 rounded-md border border-blue-400 text-blue-400 hover:text-blue-500 flex items-center justify-start",
};

type ButtonVariants = "PRIMARY" | "SECONDARY";

export default function Button({
  children,
  className,
  type = "button",
  variant = "PRIMARY" as ButtonVariants,
  ...restProps
}: PropsWithChildren &
  HTMLProps<HTMLButtonElement> & { variant?: ButtonVariants }) {
  return (
    <button
      {...restProps}
      type={type as "button" | "submit" | "reset" | undefined}
      className={`${buttonClasses[variant as ButtonVariants]} ${
        className ?? ""
      }`}
    >
      {children}
    </button>
  );
}
