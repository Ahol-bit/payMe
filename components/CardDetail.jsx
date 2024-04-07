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

  return (
    <>
      <section className="flex flex-wrap md:gap-10 gap-5 items-center content-center justify-center h-auto w-[85vw] mt-[200px] m-auto py-20 bg-black rounded-3xl">
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
