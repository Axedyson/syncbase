import ctl from "@netlify/classnames-template-literals";
import { Spinner } from "../icons/Spinner";
import type { ComponentPropsWithoutRef, FC } from "react";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  label: string;
  loading?: boolean;
}

const buttonClasses = ctl(`
  flex
  justify-center
  items-center
  py-2
  px-4
  font-semibold
  text-white
  bg-blue-200
  rounded-md
  focus:outline-none
  focus:ring-4
  focus:ring-primary/40
  hover:opacity-80
  disabled:opacity-60
  transition
  disabled:cursor-default
`);

export const Button: FC<ButtonProps> = ({ label, loading, ...props }) => {
  return (
    <button
      type="button"
      className={buttonClasses}
      disabled={loading}
      {...props}
    >
      <span className={loading ? "invisible" : undefined}>{label}</span>
      {loading && (
        <span className="absolute">
          <Spinner />
        </span>
      )}
    </button>
  );
};
