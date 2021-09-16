import Link from "next/link";
import { FC } from "react";

console.log(FC);

const AboutPage: FC = () => {
  return (
    <div>
      <p>test</p>
      <Link href="/">index</Link>
      <p>Welcome to the about page!</p>{" "}
    </div>
  );
};

export default AboutPage;
