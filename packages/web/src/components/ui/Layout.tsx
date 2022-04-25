import { Toast } from "./Toast";
import type { FC } from "react";

interface LayoutProps {
  children: React.ReactElement;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen font-medium">
      <Toast />
      {children}
    </div>
  );
};
