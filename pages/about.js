/* eslint-disable @next/next/no-img-element */
import React from "react";
import Image from "next/image";
// import { Autocomplete } from "@mui/material";
import { useState } from "react";

const About = () => {
  const [color, setColor] = useState("gray-900")
  const [opacity, setOpacity] = useState("0")
  const [hidden, setHidden] = useState("")
  return <div><div onMouseEnter={()=>{setColor("white"); setOpacity("100"); setHidden("")}} onMouseLeave={()=>{setColor("gray-900"); setOpacity("0"); setHidden("hidden")}} className="min-h-screen bg-gray-900 w-full group ">
     <div className={`absolute top-1/3 left-1/3 h-96 w-96 rounded-full transition-colors  duration-700 blur-3xl bg-${color}`}>
     </div>
     <div className={`absolute top-1/3 left-1/3 h-96 w-96 rounded-full transition-colors duration-700 bg-${color} `}></div>
     <img src="/itachinobg.png" alt="yoyo" className={`absolute top-[52vh] left-[81.5vh] h-[50%] transition-opacity duration-1000 opacity-${opacity} `} />
     <div className="text-orange-400 absolute top-2/3 left-[10vh] w-72 text-3xl">Its foolish to fear what we have yet to see and know </div>
     <div className="text-orange-400 absolute top-2/3 right-[10vh] w-72 text-3xl">People&#39;s lives don&#39;t end when they die. It ends when they lose faith.</div>
     <div className={`text-red-700 absolute top-[42vh] left-[86vh] font-bold text-3xl transition-transform ${hidden} `}>-Itachi Uchiha</div>
     
    </div></div>;
};

export default About;
