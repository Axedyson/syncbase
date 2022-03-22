import { Toast } from "./Toast";
import type { FC } from "react";

export const Layout: FC = ({ children }) => {
  return (
    <div className="flex min-h-screen font-medium">
      <Toast />
      {children}
    </div>
  );
};
