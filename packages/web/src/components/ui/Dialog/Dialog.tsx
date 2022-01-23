import { Dialog as HeadlessDialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import type { FC } from "react";

interface DialogProps {
  title: string;
  description: string;
  isOpen: boolean;
  close: () => void;
}

export const Dialog: FC<DialogProps> = ({
  title,
  description,
  isOpen,
  close,
  children,
}) => {
  return (
    <Transition show={isOpen} as={Fragment}>
      <HeadlessDialog
        onClose={close}
        className="overflow-y-auto fixed inset-0 z-10"
      >
        <div className="flex justify-center items-center min-h-screen">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <HeadlessDialog.Overlay className="fixed inset-0 bg-black/30" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="relative py-3 px-2 bg-white rounded-lg shadow-xl">
              <HeadlessDialog.Title>{title}</HeadlessDialog.Title>
              <HeadlessDialog.Description>
                {description}
              </HeadlessDialog.Description>
              {children}
            </div>
          </Transition.Child>
        </div>
      </HeadlessDialog>
    </Transition>
  );
};
