import { Dialog as HeadlessDialog } from "@headlessui/react";
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
    <>
      <HeadlessDialog
        open={isOpen}
        onClose={close}
        className="overflow-y-auto fixed inset-0 z-10"
      >
        <div className="flex justify-center items-center min-h-screen">
          <HeadlessDialog.Overlay className="fixed inset-0 bg-black opacity-30" />

          <div className="relative py-3 px-2 bg-white rounded-lg">
            <HeadlessDialog.Title>{title}</HeadlessDialog.Title>
            <HeadlessDialog.Description>
              {description}
            </HeadlessDialog.Description>
            {children}
          </div>
        </div>
      </HeadlessDialog>
    </>
  );
};
