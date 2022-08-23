import ctl from "@netlify/classnames-template-literals";
import { Spinner } from "../icons/Spinner";
import type { ComponentPropsWithoutRef, FC } from "react";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  label: string;
  loading?: boolean;
}

const buttonClasses = ctl(`
  flex
  items-center
  justify-center
  rounded-md
  py-2
  px-4
  font-semibold
  text-orange-400
  transition
  hover:opacity-80
  focus:outline-none
  focus:ring-4
  focus:ring-primary/40
  disabled:cursor-default
  disabled:opacity-60
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
