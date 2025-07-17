"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import inlaze from "../assets/assets.png";

const Navbar = () => {
  const { data: session } = useSession();
  return (


    <nav className="bg-[#141414] border-gray-200 dark:bg-gray-900 w-screen">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a className="flex items-center space-x-3 rtl:space-x-reverse">

          <Image alt="menu" src={inlaze} width={150} height={80} />

        </a>


        <div className="containerw-full  md:w-auto" id="navbar-default">
          <ul className="font-medium flex  p-4 md:p-0 mt-4 border-[#141414] rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-[#141414] dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">

            {session?.user ? (
              <>
                <Link
                  href="/project"
                  className="block py-2 px-3 text-[#edb80c] rounded hover:bg-[#141414] md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Inicio
                </Link>

                <button
                  onClick={async () => await signOut()}
                  className="block py-2 px-3 text-[#edb80c] rounded hover:bg-[#141414]md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Signout
                </button>

              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block py-2 px-3 text-[#edb80c] rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="block py-2 px-3 text-[#edb80c] rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Register
                </Link>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>

  );
};
export default Navbar;