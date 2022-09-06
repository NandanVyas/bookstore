import React from "react";
import Image from "next/image";

const forgotPassword = () => {
  return (
    <section className="bg-gray-50 ">
      {/* dark:bg-gray-900 */}
      <div className="flex flex-col items-center justify-center px-6  mx-auto md:h-screen ">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 "
        >
          {/* dark:text-white */}
          <Image
            width={60}
            height={60}
            className=" bg-white bg-opacity-20 rounded-full mr-2"
            src="/nv-cool.png"
            alt="logo"
          />
        </a>
        <div className="w-full p-6 bg-white rounded-lg shadow  md:mt-0 sm:max-w-md  sm:p-8">
          {/* dark:border dark:bg-gray-800 dark:border-gray-700 */}
          <h1 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
            {/* dark:text-white */}
            Forgot your password?
          </h1>
          <p className="font-light text-gray-500 ">
            {/* dark:text-gray-400 */}
            Dont fret! Just type in your email and we will send you a code to
            reset your password!
          </p>
          <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                {/* dark:text-white */}
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5 "
                placeholder="name@company.com"
                required=""
              />
              {/* dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  */}
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  aria-describedby="terms"
                  type="checkbox"
                  className="w-4 h-4 border border-orange-300 rounded bg-orange-50 focus:ring-3 focus:ring-orange-300 "
                  required=""
                />
                {/* dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-orange-600 dark:ring-offset-gray-800 */}
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="font-light text-gray-500 ">
                  {/* dark:text-gray-300 */}I accept the{" "}
                  <a
                    className="font-medium text-orange-600 hover:underline "
                    href="#"
                  >
                    {/* dark:text-orange-500 */}
                    Terms and Conditions
                  </a>
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >
              {/* dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800 */}
              Reset password
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default forgotPassword;
