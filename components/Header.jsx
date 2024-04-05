"use client"
import Link from "next/link";
import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from "react";
import { signOut } from "next-auth/react";
import Login from "@/app/login/page";


function Header() {
  const { data: session } = useSession();

  if (typeof window === 'undefined') {
    return null; // Return null if running on the server side
  }

  const [open, setOpen] = useState(false);

  // Close the dropdown when Esc key is pressed
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <nav className="fixed top-0 w-full bg-white py-5 border-b-4 border-slate-700 z-50">
      <div className="container px-6 mx-auto lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center justify-between flex-grow">
            <div className="flex-shrink-0">
              <h1 className="text-3xl font-bold text-black">
                <a href="/">Pay Me</a>
              </h1>
            </div>
            <div className="lg:block">
              <div className="flex items-center">
                <div className="relative">
                  <button onClick={() => setOpen(!open)} className="flex flex-row items-center px-3 py-2 mx-3 text-lg lg:text-xl font-medium text-black-300 rounded-md hover:text-gray-500 hover:bg-gray-300 focus:outline-none focus:text-white focus:bg-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 feather feather-folder" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
                    <span className="mx-2">Pages</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`w-4 h-4 mt-1 transform ${open ? 'rotate-180' : 'rotate-0'} feather feather-chevron-down`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </button>
                  {open && (
                    <div className="absolute right-0 w-48 mt-2 origin-top-right rounded-md shadow-lg">
                      <div className="py-1 bg-white rounded-md shadow-xs">
                        <Link href={session ? "/payMe" : "/login/payMe"} className="flex flex-row items-center px-4 py-2 text-md text-gray-700 focus:text-gray-900 hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none">
                          <spa className="ml-2">Make Payment</spa>
                        </Link>
                        <Link href={session ? "/addMember" : "/login/addMember"} className="flex flex-row items-center px-4 py-2 text-md text-gray-700 focus:text-gray-900 hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none">
                          <span className="ml-2">Add New Member</span>
                        </Link>
                        {session ? (
                          <button onClick={() => signOut()} className="block w-full px-4 py-2 text-md text-gray-700 focus:text-gray-900 hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none lg:hidden block">
                            Log out
                          </button>
                        ) : (
                          <button onClick={() => signOut()} className="block w-full px-4 py-2 text-md text-gray-700 focus:text-gray-900 hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none lg:hidden block">
                          <Link href={'/login'}>
                            Log in
                          </Link>
                        </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              {session ? (
                <button className="px-4 py-2 text-lg font-medium text-white bg-indigo-500 rounded-md focus:outline-none focus:bg-indigo-500 lg:block hidden" onClick={() => signOut()}>
                  Log out
                </button>
              ) : (
                <button className="px-4 py-2 text-lg font-medium text-white bg-green-500 rounded-md focus:outline-none focus:bg-green-500 lg:block hidden">
                  <Link href={'/login'}>
                    Log in
                  </Link>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  
  );
}

export default React.memo(Header);
