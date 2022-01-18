import { useState } from "react";
import { LoginDialog } from "../components/LoginDialog";
import { Button } from "../components/ui/Button";
import { Dialog } from "../components/ui/Dialog";
import { urqlClientWrapper } from "../graphql/client";
import type { FC } from "react";

const IndexPage: FC = () => {
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="flex gap-2 p-2 m-auto rounded-md border-2 border-slate-400">
        <Button onClick={openModal} label="Log In" />
        <Button onClick={openModal} label="Create Account" />
      </div>
      <Dialog isOpen={open} closeModal={closeModal} />
      <LoginDialog />
    </>
  );
};

export default urqlClientWrapper(IndexPage);
