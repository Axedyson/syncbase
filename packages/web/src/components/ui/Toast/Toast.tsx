import ctl from "@netlify/classnames-template-literals";
import { ToastBar, Toaster, toast } from "react-hot-toast";
import { Cross } from "../icons/Cross";
import type { FC } from "react";

const crossContainerClasses = (error: boolean) =>
  ctl(`
  p-1.5
  w-8
  h-8
  rounded-lg
  ${error && "bg-red-100"}
`);

const closeButtonClasses = ctl(`
 ${crossContainerClasses(false)}
  -mx-1.5
  text-gray-400
  hover:text-gray-900
  hover:bg-gray-100
  focus:outline-none
  focus:ring-2
  focus:ring-gray-300
`);

export const Toast: FC = () => {
  return (
    <Toaster
      toastOptions={{
        position: "bottom-center",
        error: {
          duration: Infinity,
          icon: (
            <div className={crossContainerClasses(true)}>
              <Cross error />
            </div>
          ),
        },
      }}
    >
      {(t) => (
        <ToastBar toast={t}>
          {({ icon, message }) => (
            <>
              {icon}
              <div className="ml-1 text-sm font-medium text-slate-500">
                {message}
              </div>
              <button
                type="button"
                className={closeButtonClasses}
                aria-label="Close"
                onClick={() => toast.dismiss(t.id)}
              >
                <span className="sr-only">Close</span>
                <Cross />
              </button>
            </>
          )}
        </ToastBar>
      )}
    </Toaster>
  );
};
