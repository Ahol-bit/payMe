"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios";
import moment from "moment";
import { faHandFist, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';

export default function AddMember() {
  library.add(faHandFist, faUser);
  const [nama, setNama] = useState("");
  const [description, setDescription] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const aid = ''
    const listPayment = [
      {
        date: moment().format("DD-MM-YYYY"),
        cost: 0
      }
    ]
    const totalCost = 0
    const status = 'belum lunas'

    if (!nama) {
      alert("nama and description are required.");
      return;
    }

    try {
      const res = await axios.post('/api/members', { 
        aid,
        nama,
        listPayment,
        totalCost,
        status
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
        // body: JSON.stringify({ title, description })
      })
      if(res) {
        router.push('/');
        router.refresh();
      } else {
        throw new Error("Failed to create a topic")
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
<form onSubmit={handleSubmit} className="lg:w-[900px] flex flex-col justify-center items-center gap-4 lg:m-[auto] m-[40px] lg:mt-[200px] mt-[200px] px-0 py-20 bg-black rounded-3xl">
  <h1 className={`text-white md:mb-3 md:text-2xl text-lg mb-3`}>
    Add Member to Join
  </h1>
  <input 
    onChange={(e) => setNama(e.target.value)}
    value={nama}
    required
    type="text"
    className="border border-gray400 px-5 py-2 lg:w-1/3 md:w-[270px] w-[200px] rounded-lg ml-2" 
    placeholder="Add Name"
  />
   <FontAwesomeIcon icon={faUser} color="white" className="absolute lg:ml-[-330px] lg:mt-[-80px] md:ml-[-290px] ml-[-225px] lg:mt-[-70px] mt-[-70px]"/>
  <input 
    onChange={(e) => setDescription(e.target.value)}
    value={description}
    type="text"
    className="border border-gray400 px-5 py-2 lg:w-1/3  md:w-[270px] w-[200px] rounded-lg ml-2" 
    placeholder="Seberapa tangguh anda"
  />
    <FontAwesomeIcon icon={faHandFist} color="white" className="absolute lg:ml-[-330px] lg:mt-[40px] md:ml-[-290px] ml-[-225px] lg:mt-[45px] mt-[45px]"/>
    <button
      type="submit"
      className="bg-cyan-400 text-black py-2 px-4 rounded-lg border border-gray400 hover:bg-gray-300 md:mt-[10px]"
    >
      Add
  </button>
</form>

  )
}