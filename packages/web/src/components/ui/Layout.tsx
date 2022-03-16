import { Toast } from "./Toast";
import type { FC } from "react";

const Layout: FC = ({ children }) => {
  return (
    <div className="flex min-h-screen font-medium">
      <Toast />
      {children}
    </div>
  );
};

export default Layout;
