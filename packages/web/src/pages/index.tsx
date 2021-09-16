import Link from "next/link";
import { FC } from "react";

console.log(FC);

const HomePage: FC = () => {
  return (
    <div>
      <h1>test</h1>
      <Link href="/about">about</Link>
      <p>Welcome to the index page!</p>
    </div>); };

export default HomePage;
