import type { FC } from "react";

console.log("loool");
const Layout: FC = ({ children }) => {
  return <div className="flex min-h-screen font-medium">{children}</div>;
};

export default Layout;
