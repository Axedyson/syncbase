import Link from "next/link";

const HomePage = ({ test }) => {
  return (
    <div>
      {test}
      <h1>test</h1>
      <Link href="/about">about</Link>
      <p>Welcome to the index page!</p>
    </div>
  ); };

export default HomePage;
