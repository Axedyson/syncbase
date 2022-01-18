import { LoginDialog } from "../components/LoginDialog";
import { Dialog } from "../components/ui/Dialog";
import { urqlClientWrapper } from "../graphql/client";
import type { FC } from "react";

const IndexPage: FC = () => {
  return (
    <>
      <LoginDialog />
      <Dialog />
    </>
  );
};

export default urqlClientWrapper(IndexPage);
