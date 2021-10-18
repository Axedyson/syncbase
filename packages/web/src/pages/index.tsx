import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";

const HomePage: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
          <Link href="/about">
            <a className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600">
              <h3 className="text-2xl font-bold">About/</h3>
              <p className="mt-4 text-xl">
                This link will take you to the about page
              </p>
            </a>
          </Link>
        </div>
      </main>
      <Image
        src="/android-chrome-512x512.png"
        alt="some image"
        width={100}
        height={100}
      />
    </div>
  );
};

export default HomePage;
