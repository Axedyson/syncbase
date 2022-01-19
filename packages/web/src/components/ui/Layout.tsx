import { LoginDialog } from "../LoginDialog";
import type { FC } from "react";

const Layout: FC = ({ children }) => {
  return (
    <>
      <div className="flex min-h-screen font-medium">{children}</div>
      <LoginDialog />
    </>
  );
};

export default Layout;
