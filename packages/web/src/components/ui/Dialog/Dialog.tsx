import { Dialog as HeadlessDialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import type { FC } from "react";

interface DialogProps {
  isOpen: boolean;
  close: () => void;
  children: React.ReactNode;
}

export const Dialog: FC<DialogProps> = ({ isOpen, close, children }) => (
  <Transition show={isOpen} as={Fragment}>
    <HeadlessDialog className="relative z-10" onClose={close}>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      </Transition.Child>
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <HeadlessDialog.Panel className="relative m-2 w-full rounded-lg bg-white p-3 shadow-lg sm:w-96">
              {children}
            </HeadlessDialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </HeadlessDialog>
  </Transition>
);
