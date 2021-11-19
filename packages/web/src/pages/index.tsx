import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";

const IndexPage: FC = () => {
  return (
    <div>
      <p className="mt-4">
        By logging in you accept our Privacy Policy and Terms of Service.
      </p>
      <Link href="/register">
        <a className="block text-purple-800 text-opacity-100">Register</a>
      </Link>
      <Image
        src="/android-chrome-512x512.png"
        alt="some image"
        width={100}
        height={100}
      />
    </div>
  );
};

export default IndexPage;
