import type { ComponentProps, FC } from "react";

interface ButtonProps extends ComponentProps<"button"> {
  label: string;
}

export const Button: FC<ButtonProps> = ({ label, ...props }) => {
  return (
    <button
      type="button"
      className="bg-primary focus:ring-primary px-4 py-2 text-white font-semibold rounded-md focus:outline-none focus:ring-4 focus:ring-opacity-50"
      {...props}
    >
      {label}
    </button>
  );
};
