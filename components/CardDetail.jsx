"use client"

import axios from "axios";
import React, { useState, useEffect } from "react";

const changeRupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    currency: "IDR",
  }).format(number);
};

const CardDetails = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await axios.get('/api/members');
        if (isMounted) {
          setMembers(response.data.members); // Assuming response contains a 'members' property
          setLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          console.error('Failed to fetch members:', error);
          setError(error.message);
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false; // Cleanup function to handle component unmount
    };
  }, []);

  
  if (loading) {
    return( 
      <div className='flex justify-center items-center mt-40 mb-[100%]'>
        <button disabled type="button" class="text-white bg-cyan-400 font-medium rounded-lg text-lg px-8 py-4 text-center inline-flex items-center justify-center border border-gray300">
          <svg aria-hidden="true" role="status" class="inline w-7 h-7 me-3 text-white animate-spin font-bold" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
          </svg>
          Loading...
        </button>
      </div>
      )
  }


  return (
    <>
      <section className="flex flex-wrap md:gap-10 gap-5 items-center content-center justify-center h-auto w-[85vw] my-[200px] m-auto py-20 bg-black rounded-3xl">
        {members.map((m, index) => (
          <div key={index} className="lg:w-[300px] w-[250px]  bg-white px-6 pt-8 shadow-lg">
            <div className="flex flex-col gap-3 justify-center items-center gap-2">
              <h4 className="font-semibold md:text-lg">{m.nama}</h4>
              <p className="text-xs"></p>
            </div>
            <div>
              <div className="flex flex-col gap-3 border-b py-6 text-xs">
                <div className="flex justify-between border-b border-t font-bold border-black p-2">
                  <span>Date</span>
                  <span>Payment</span>
                </div>
                {m.listPayment.map((e, index) => (
                  <p key={index} className="flex justify-between gap-11 border-b border-dotted border-gray400 text-[11px]">
                    <span>{e.date}</span>
                    <span>Rp. {changeRupiah(e.cost)}</span>
                  </p>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3 pb-6 pt-2 text-xs">
              <table className="w-full text-left">
                <thead>
                  <tr className="flex justify-between">
                    <th className="w-full py-2">Product</th>
                    <th className=" py-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="flex gap-10 md:text-base text-sm">
                    <td className="flex-1 text-[0.8rem] font-bold">{m.status.toUpperCase()}</td>
                    <td className="min-w-[44px] text-[0.8rem] font-bold">Rp. {changeRupiah(m.totalCost)}</td>
                  </tr>
                </tbody>
              </table>
              <div className=" border-b border border-dashed"></div>
              <div className="py-4 justify-center items-center flex flex-col gap-2">
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default CardDetails;
//aa