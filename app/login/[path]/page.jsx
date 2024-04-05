"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from 'next-auth/react';
import { faKey, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { useParams } from "react-router-dom";

export default function Login() {
  library.add(faKey, faUser);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  const { query } = router;
  // Get the current path from the URL
  const currentPath = window.location.pathname;

  // Split the path by "/"
  const pathParts = currentPath.split('/');

  // Get the last part of the path
  const nextPath = pathParts[pathParts.length - 1];


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid Credentials");
        return;
      }
      

      router.replace(`/${nextPath}`);
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="lg:w-[900px] flex flex-col justify-center items-center gap-4 lg:m-[auto] m-[40px] lg:mt-[200px] mt-[200px] px-0 py-20 bg-black rounded-3xl">
      <h1 className={`text-white md:mb-3 md:text-2xl text-lg mb-3`}>
        Please log in to continue.
      </h1>
      <input 
        required
        type="text"
        className="border border-gray400 px-5 py-2 lg:w-1/3 w-[220px] rounded-lg ml-2" 
        placeholder={`email`}
        value={email} 
        onChange={(e) => setEmail(e.target.value)}
      />
       <FontAwesomeIcon icon={faUser} color="white" className="absolute lg:ml-[-330px] lg:mt-[-80px] md:ml-[-280px] ml-[-245px] mt-[-80px]"/>
      <input 
        required
        type="password"
        className="border border-gray400 px-5 py-2 lg:w-1/3  w-[220px] rounded-lg ml-2" 
        placeholder="password"
        value={password} 
        onChange={(e) => setPassword(e.target.value)}
      />
      <FontAwesomeIcon icon={faKey} color="white" className="absolute lg:ml-[-330px] lg:mt-[40px] md:ml-[-280px] ml-[-245px] mt-[40px]"/>
      <button
        type="submit"
        className="bg-cyan-400 text-black py-2 px-4 rounded-lg border border-gray400 hover:bg-gray-300 mt-[20px]"
      >
        Log In {/* Updated button text */}
      </button>
      {error && (
        <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
          {error}
        </div>
      )}
    </form>
  );
}
