import React, {useEffect, useState} from "react";
import Link from "next/link";
import {useRouter} from "next/router";

const AddFaqPage = (props) => {
    const [question, setQuestion] = useState("");
    const [name, setName] = useState("");
    const [token, setToken] = useState("");
    const router = useRouter();

    useEffect(() => {
        const mytoken = localStorage.getItem("token");
        if (!mytoken) {
            router.push("/");
        } else {
            setToken(mytoken);
            fetchData(mytoken);
        }
    }, []);

    const fetchData = async (mytoken) => {
        let data = {token: mytoken};
        let a = await fetch(`api/getUserDetails`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        let res = await a.json();
        setName(res.user.name);
    };

    //   const router = useRouter();
    //   const token = router.query.token;
    const handleChange = (e) => {
        console.log(e.target.name);
        if (e.target.name == "question") {
            console.log(question);
            setQuestion(e.target.value);
        }
    };

    function isUserLoggedIn() {
        return localStorage.getItem("isUserLoggedIn") === "true";
    }

    const sendQueryButtonPressed = async () => {
        if (isUserLoggedIn()) {
            let data = {
                question: question,
                //   token: router.query.token,
                name: name,
                //   email: email,
                answer: "",
            };
            let a = await fetch(`api/addFAQ`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            let res = await a.json();
            if (res.success) {
                console.log("Data Sent To DB");
            }
        } else {
            console.log("Please log in to share your questions")
        }
    };

    return (
        <div className="flex items-center justify-start bg-white dark:bg-gray-900 py-20">
            <div className="mx-auto w-full max-w-lg">
                <h1 className="text-3xl font-medium dark:text-orange-400 ">
                    Add Your Question
                </h1>
                {/* <p className="mt-3 dark:text-orange-200">Email me at <span className='italic text-orange-500 dark:text-blue-100'>nv.nandanvyas@gmail.com</span> or message here:</p> */}
                <p className="mt-3 dark:text-orange-200">
                    We would love to answer your query !
                </p>

                <div className="grid gap-6 sm:grid-cols-2 mt-10">
                    <div className="relative z-0 col-span-2">
            <textarea
                name="question"
                rows="5"
                value={question}
                onChange={handleChange}
                id="question"
                className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 dark:text-orange-300 focus:border-orange-600 focus:outline-none focus:ring-0"
                placeholder=" "
            ></textarea>
                        <label
                            className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-orange-600 peer-focus:dark:text-orange-500">
                            Your Question ?
                        </label>
                    </div>
                </div>
                <div className="flex flex-row">
                    <button
                        type="submit"
                        onClick={sendQueryButtonPressed}
                        className="flex mr-4 mt-5 text-white bg-orange-500 border-0 py-2 px-2 focus:outline-none hover:bg-orange-600 rounded text-lg"
                    >
                        Send Query
                    </button>
                    {/* <Link href={"/"} className="r-0"> */}
                        <button
                            className="flex mr-4 mt-5 text-white bg-orange-500 border-0 py-2 px-2 focus:outline-none hover:bg-orange-600 rounded text-lg" onClick={props.cancelHandler}>
                            Cancel
                        </button>
                    {/* </Link> */}
                </div>
            </div>
        </div>
    );
};

export default AddFaqPage;
