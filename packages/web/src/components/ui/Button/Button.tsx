import ctl from "@netlify/classnames-template-literals";
import { Spinner } from "../icons/Spinner";
import type { ComponentPropsWithoutRef, FC } from "react";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  label: string;
  loading?: boolean;
}

const ButtonClasses = ctl(`
  flex
  justify-center
  items-center
  py-2
  px-4
  font-semibold
  text-white
  bg-primary
  hover:bg-opacity-80
  rounded-md
  focus:ring-4
  focus:ring-primary
  focus:ring-opacity-40
  disabled:opacity-60
  transition
  disabled:cursor-default
  focus:outline-none
`);

export const Button: FC<ButtonProps> = ({ label, loading, ...props }) => {
  return (
    <button
      type="button"
      className={ButtonClasses}
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
