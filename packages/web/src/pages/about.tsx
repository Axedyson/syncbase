import Link from "next/link";
import type { FC } from "react";

const AboutPage: FC = () => {
  return (
    <div>
      <p>test</p>
      <Link href="/">
        <a>index</a>
      </Link>
      <p>Welcome to the about page!</p>
    </div>
  );
};

export default AboutPage;
