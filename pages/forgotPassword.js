import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

const ForgotPassword = () => {
  // const [token, setToken] = useState("")
  const router = useRouter();
  const token = router.query.token;
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [email, setEmail] = useState("");
  // const [disabled, setDisabled] = useState(true)
  
  const handleChange = (e) => {
    if (e.target.name == "password") {
      setPassword(e.target.value);
    } else if (e.target.name == "confirmpassword") {
      setConfirmpassword(e.target.value);
    } else if (e.target.name == "email") {
      setEmail(e.target.value);
    }
    // setDisabled(!(password==confirmpassword && password.length > 1 && confirmpassword.length > 1))
    // console.log(disabled,password,confirmpassword)
  };
  const resetPassword = async () => {
    let data = {
      sendmail: false,
      token:router.query.token,
      password,
      confirmpassword,
    };
    let a = await fetch(`api/resetPassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let res = await a.json();
    if (res.success) {
      console.log("password reset success");
    }
  };
  const sendEmail = async () => {
    let data = {
      email,
      sendmail: true,
    };
    let a = await fetch(`api/resetPassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let res = await a.json();
    if (res.success) {
      console.log("EMAIL SENT");
      console.log("Copy this and add ?token=<>")
      console.log(res.token);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 ">
      <div className="flex flex-col items-center justify-center px-6  mx-auto md:min-h-[80vh] ">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <Image
            width={60}
            height={60}
            className=" bg-white bg-opacity-20 rounded-full mr-2"
            src="/nv-cool.png"
            alt="logo"
          />
        </a>
        <div className="w-full p-6 bg-white rounded-lg shadow  md:mt-0 sm:max-w-md  sm:p-8 dark:border dark:bg-gray-800 dark:border-gray-700">
          <h1 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Forgot your password?
          </h1>

          {!token && (
            <div className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  value={email}
                  onChange={handleChange}
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                />
              </div>
              {/* <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  aria-describedby="terms"
                  type="checkbox"
                  className="w-4 h-4 border border-orange-300 rounded bg-orange-50 focus:ring-3 focus:ring-orange-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-orange-600 dark:ring-offset-gray-800 "
                  required=""
                />
                
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">
                  I accept the{" "}
                  <a
                    className="font-medium text-orange-600 hover:underline dark:text-orange-500"
                    href="#"
                  >
                    
                    Terms and Conditions
                  </a>
                </label>
              </div>
            </div> */}
              <button
                onClick={sendEmail}
                type="submit"
                className="w-full text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Send Email
              </button>
            </div>
          )}
          {token && (
            <div className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                New Password
              </label>
              <input
                value={password}
                onChange={handleChange}
                type="password"
                name="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="••••••••"
                required=""
              />
              <div>
                <label
                  htmlFor="confirmpassword"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm New Password
                </label>
                <input
                  value={confirmpassword}
                  onChange={handleChange}
                  type="password"
                  name="confirmpassword"
                  id="confirmpassword"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="••••••••"
                  required=""
                />
              </div>

              <button
                onClick={resetPassword}
                disabled = {!(password==confirmpassword && password.length > 1 && confirmpassword.length > 1)}
                type="submit"
                className="w-full text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-orange-400"
              >
                Reset password
              </button>
              {!(password==confirmpassword && password.length > 1 && confirmpassword.length > 1) && <span className="text-red-500 text-xs font-semibold italic">Passwords do not match</span>}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
