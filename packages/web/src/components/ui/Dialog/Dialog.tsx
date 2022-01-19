import { Dialog as HeadlessDialog } from "@headlessui/react";
import { Button } from "../Button";
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
        <HeadlessDialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <HeadlessDialog.Title>{title}</HeadlessDialog.Title>
        <HeadlessDialog.Description>{description}</HeadlessDialog.Description>
        {children}
        <Button onClick={close} label="Cancel" />
      </HeadlessDialog>
    </>
  );
};
