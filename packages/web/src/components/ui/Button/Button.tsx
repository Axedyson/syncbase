import type { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  label: string;
}

export const Button: FC<ButtonProps> = ({ label, ...props }) => {
  return (
    <button
      type="button"
      className="p-2 text-white bg-yellow-400 rounded-md focus:outline-none focus:ring-4 focus:ring-yellow-400 focus:ring-opacity-50"
      {...props}
    >
      {label}
    </button>
  );
};
