import type { FC } from "react";

const Layout: FC = ({ children }) => {
  return <div className="flex h-screen">{children}</div>;
};

export default Layout;
