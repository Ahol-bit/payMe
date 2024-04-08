"use client"
import Link from "next/link";
import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from "react";
import { signOut } from "next-auth/react";
import { Silkscreen } from "next/font/google";
import { faMoneyBill1Wave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';


const silkscreen = Silkscreen({
  subsets: ['latin'],
  weight: '700'
})
function Header() {
  library.add(faMoneyBill1Wave);
  const { data: session } = useSession();

  const [open, setOpen] = useState(false);

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
    <nav className="fixed top-0 w-full bg-white py-5 border-b-2 border-slate-700 z-50">
      <div className="container px-6 mx-auto lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center justify-between flex-grow">
            <div className="flex items-center justify-between lg:mx-10 mx-1">
              <FontAwesomeIcon icon={faMoneyBill1Wave} className="absolute lg:ml-[-2rem] md:ml-[-0.5rem] ml-[15px] lg:my-1 my-[6px] lg:text-3xl md:text-2xl text-xl"/>
              <h1 className="lg:text-3xl md:text-2xl text-lg lg:mx-1 md:mx-6 mx-10 font-bold text-black">
                <a href="/" className={silkscreen.className}>Pay Me</a>
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
                    <div className="absolute right-[5px] w-85 mt-4 origin-top-right rounded-md shadow-lg border border-gray-200 lg:text-[16px] text-sm">
                      <div className="py-1 bg-white rounded-md shadow-xs">
                        <Link href={"/payMe"} className="flex flex-row items-center px-4 py-2 text-gray-700 focus:text-gray-900 hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none mt-2 border-b-2 border-black-400">
                          <span className="ml-2">Payment</span>
                        </Link>
                        <Link href={"/addMember"} className="flex flex-row items-center px-4 py-2 text-gray-700 focus:text-gray-900 hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none my-2 border-b-2 border-black-400">
                          <span className="ml-2">New Member</span>
                        </Link>
                        {/* <Link href={session ? "/payMe" : "/login"} className="flex flex-row items-center px-4 py-2 text-md text-gray-700 focus:text-gray-900 hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none">
                          <span className="ml-2">Make Payment</span>
                        </Link>
                        <Link href={session ? "/addMember" : "/login"} className="flex flex-row items-center px-4 py-2 text-md text-gray-700 focus:text-gray-900 hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none">
                          <span className="ml-2">Add New Member</span>
                        </Link> */}
                        {session ? (
                          <button key="logout" onClick={() => signOut()} className="block w-full px-4 py-2 text-gray-700 focus:text-gray-900 hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none lg:hidden block">
                            Log out
                          </button>
                        ) : (
                          <button key="login" className="block w-full px-4 py-2 text-md text-gray-700 focus:text-gray-900 hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none lg:hidden block">
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
                <button key="logout" className="px-4 py-2 text-lg font-medium text-white bg-indigo-500 rounded-md focus:outline-none focus:bg-indigo-500 lg:block hidden" onClick={() => signOut()}>
                  Log out
                </button>
              ) : (
                <button key="login" className="px-4 py-2 text-lg font-medium text-white bg-green-500 rounded-md focus:outline-none focus:bg-green-500 lg:block hidden">
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
