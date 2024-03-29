"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios";
import moment from "moment";

export default function AddMember() {
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
  <input 
    required
    type="text"
    className="border border-gray400 px-5 py-2 lg:w-1/3 rounded-lg" 
    placeholder="username"
  />
  <input 
    type="password"
    className="border border-gray400 px-5 py-2 lg:w-1/3 rounded-lg" 
    placeholder="password"
  />

  <button
    type="submit"
    className="bg-sky text-black py-2 px-4 rounded-lg border border-gray400 hover:bg-gray300 mt-[20px]"
  >
    Add Member
  </button>
</form>

  )
}