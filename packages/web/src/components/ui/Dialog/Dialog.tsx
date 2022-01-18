import { Dialog as HeadlessDialog } from "@headlessui/react";
import { useLoginDialog } from "../../../stores/useLoginDialog";
import { Button } from "../Button";
import type { FC } from "react";

export const Dialog: FC = () => {
  const dialogStore = useLoginDialog();

  return (
    <>
      <div className="flex gap-2 p-2 m-auto rounded-md border-2 border-slate-400">
        <Button onClick={() => dialogStore.open()} label="Log In" />
        <Button onClick={() => dialogStore.open()} label="Create Account" />
      </div>
      <HeadlessDialog
        open={dialogStore.isOpen}
        onClose={() => dialogStore.close()}
      >
        <HeadlessDialog.Overlay />

        <HeadlessDialog.Title>Deactivate account</HeadlessDialog.Title>
        <HeadlessDialog.Description>
          This will permanently deactivate your account
        </HeadlessDialog.Description>

        <p>
          Are you sure you want to deactivate your account? All of your data
          will be permanently removed. This action cannot be undone.
        </p>

        <Button onClick={() => dialogStore.close()} label="Cancel" />
      </HeadlessDialog>
    </>
  );
};
