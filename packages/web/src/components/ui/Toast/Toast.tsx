import ctl from "@netlify/classnames-template-literals";
import { ToastBar, Toaster, toast } from "react-hot-toast";
import { X } from "../icons/X";
import type { FC } from "react";

const xIconContainerClasses = ctl(`
  inline-flex
  shrink-0
  justify-center
  items-center
  w-8
  h-8
  bg-red-100
  rounded-lg
`);

export const Toast: FC = () => {
  return (
    <Toaster
      toastOptions={{
        position: "bottom-center",
        error: {
          duration: Infinity,
          icon: (
            <div className={xIconContainerClasses}>
              <X error />
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
              <div className="ml-1 text-sm font-medium">{message}</div>
              <button
                type="button"
                aria-label="Close"
                className="inline-flex p-1.5 -m-1.5 ml-auto w-8 h-8 text-gray-400 hover:text-gray-900 bg-white hover:bg-gray-100 rounded-lg focus:ring-2 focus:ring-gray-300"
                onClick={() => toast.dismiss(t.id)}
              >
                <span className="sr-only">Close</span>
                <X />
              </button>
            </>
          )}
        </ToastBar>
      )}
    </Toaster>
  );
};
