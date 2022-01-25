import { useLoginDialog } from "../../hooks/useLoginDialog";
import { Dialog } from "../ui/Dialog";
import { RegisterForm } from "./RegisterForm";
import type { FC } from "react";

export const LoginDialog: FC = () => {
  const dialog = useLoginDialog();

  return (
    <Dialog close={dialog.close} isOpen={dialog.isOpen}>
      <RegisterForm />
    </Dialog>
  );
};
