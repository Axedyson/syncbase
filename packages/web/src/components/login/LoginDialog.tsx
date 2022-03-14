import { useLoginDialog } from "../../hooks/useLoginDialog";
import { Dialog } from "../ui/Dialog";
import { TabGroup } from "../ui/TabGroup";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import type { FC } from "react";

export const LoginDialog: FC = () => {
  const dialog = useLoginDialog();

  return (
    <Dialog close={dialog.close} isOpen={dialog.isOpen}>
      <TabGroup Register={<RegisterForm />} Login={<LoginForm />} />
    </Dialog>
  );
};
