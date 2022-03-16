import Image from "next/image";
import { Toaster, toast } from "react-hot-toast";
import type { FC } from "react";

export const Toast: FC = () => {
  return (
    <Toaster>
      {(t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 p-4 w-0">
            <div className="flex items-start">
              <div className="shrink-0 pt-0.5">
                <Image
                  className="w-10 h-10 rounded-full"
                  src="/mstile-150x150.png"
                  width={10}
                  height={10}
                />
              </div>
              <div className="flex-1 ml-3">
                <p className="text-sm font-medium text-gray-900">
                  Emilia Gates
                </p>
                <p className="mt-1 text-sm text-gray-500">{t.message}</p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="flex justify-center items-center p-4 w-full text-sm font-medium text-indigo-600 hover:text-indigo-500 rounded-none rounded-r-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </Toaster>
  );
};
