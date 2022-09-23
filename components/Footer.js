import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="bg-gradient-to-t from-orange-500/20 dark:bg-gray-900 dark:from-orange-900/30">
      <footer className="text-gray-600  dark:text-orange-200 body-font">
        <div className="container px-5 pt-20 pb-3 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
          <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
            <Link href={"/"}>
              <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900 dark:text-orange-600">
                <Image
                  src="/N V BookStore-1.png"
                  alt=""
                  width={200}
                  height={40}
                />
              </a>
            </Link>
            <div className="mt-2 ml-2 px-1 text-sm text-gray-500 dark:text-orange-300">
              A bookstore created using:
              <ul className="">
                <li className="hover:text-gray-800 dark:hover:text-orange-800 ">
                  <a href={"https://nextjs.org/"} target="blank">
                    NextJS
                  </a>
                </li>
                <li className="hover:text-gray-800 dark:hover:text-orange-800 ">
                  <a href={"https://tailwindcss.com/"} target="blank">
                    Tailwind
                  </a>
                </li>
                <li className="hover:text-gray-800 dark:hover:text-orange-800 ">
                  <a href={"https://www.mongodb.com/"} target="blank">
                    MongoDB
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center text-sm">
            <div className="lg:w-1/4 md:w-1/2 w-full px-4 "></div>
            {/* <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-900 dark:text-orange-600  tracking-widest text-sm mb-3">
                CATEGORIES
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <a className=" hover:text-gray-800 dark:hover:text-orange-800">
                    First Link
                  </a>
                </li>
                <li>
                  <a className=" hover:text-gray-800 dark:hover:text-orange-800">
                    Second Link
                  </a>
                </li>
                <li>
                  <a className=" hover:text-gray-800 dark:hover:text-orange-800">
                    Third Link
                  </a>
                </li>
                <li>
                  <a className=" hover:text-gray-800 dark:hover:text-orange-800">
                    Fourth Link
                  </a>
                </li>
              </nav>
            </div> */}
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-900 dark:text-orange-600 tracking-widest text-sm mb-3">
                CUSTOMER SERVICE
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <a
                    href={"/contact"}
                    className=" hover:text-gray-800 dark:hover:text-orange-800"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href={"/about"}
                    className=" hover:text-gray-800 dark:hover:text-orange-800"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href={"/returnpolicy"}
                    className=" hover:text-gray-800 dark:hover:text-orange-800"
                  >
                    Return Policy
                  </a>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-900 dark:text-orange-600 tracking-widest text-sm mb-3">
                POLICY
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <a
                    href={"/privacy"}
                    className=" hover:text-gray-800 dark:hover:text-orange-800"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href={"/termsNc"}
                    className=" hover:text-gray-800 dark:hover:text-orange-800"
                  >
                    Terms and Conditions
                  </a>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-900 dark:text-orange-600 tracking-widest text-sm mb-3">
                SOCIALS
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <a
                    href={"https://github.com/NandanVyas"}
                    target="blank"
                    className=" hover:text-gray-800 dark:hover:text-orange-800"
                  >
                    Github
                  </a>
                </li>
                <li>
                  <a
                    href={"https://github.com/NandanVyas"}
                    target="blank"
                    className=" hover:text-gray-800 dark:hover:text-orange-800"
                  >
                    Second Link
                  </a>
                </li>
                <li>
                  <a
                    href={"https://www.linkedin.com/in/nv-nandanvyas/"}
                    target="blank"
                    className=" hover:text-gray-800 dark:hover:text-orange-800"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href={"https://www.instagram.com/nandanvyas_/"}
                    target="blank"
                    className=" hover:text-gray-800 dark:hover:text-orange-800"
                  >
                    Instagram
                  </a>
                </li>
              </nav>
            </div>
          </div>
        </div>
        <div className=" p-0">
          <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
            <p className="text-gray-500  dark:text-orange-200 text-sm text-center sm:ml-auto ">
              <a
                href="https://github.com/NandanVyas"
                rel="noopener noreferrer"
                className=" ml-1"
                target="_blank"
              >
                @NandanVyas
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
