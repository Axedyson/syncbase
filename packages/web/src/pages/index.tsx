import { LoginDialog } from "../components/login/LoginDialog";
import { Button } from "../components/ui/Button";
import { urqlClientWrapper } from "../graphql/client";
import { useLoginDialog } from "../hooks/useLoginDialog";
import type { FC } from "react";

const IndexPage: FC = () => {
  const dialog = useLoginDialog();

  return (
    <div className="flex gap-2 p-2 m-auto rounded-md border-2 border-slate-400">
      <Button onClick={dialog.open} label="Log In" />
      <Button onClick={dialog.open} label="Create Account" />
      <LoginDialog />
    </div>
  );
};

export default urqlClientWrapper(IndexPage);
