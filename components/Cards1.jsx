// "use client"
// import { useState, useEffect } from "react";
// import useSWR from 'swr'
import AddPayment from "./addPayBtn";

const getMembers = async() => {
  try {
    const res = await fetch("http://localhost:3000/api/members", {
      cache: "no-store"
    })

    if(!res.ok) {
      throw new Error('Failed to fetch topics');
    }

    return res.json();
  } catch(error) {
    console.log("Error loading topics: ", error)
  }
}

// const fetcher = (...args) => fetch(...args).then((res) => res.json())

const { members } = await getMembers();
export default function Cards()  {
  
  let htmlData = new Array;
    // const [total, setTotal] = useState(1000);
    // const [input, setInput] = useState('');

  function handleClick() {
    setTotal(prev => prev + Number(input));
    setInput('')
  }
  // const [members, setMembers] = useState(null);
  // const [isLoading, setLoading] = useState(true);

  // useEffect(() => {
  //   fetch('http://localhost:3000/api/members')
  //     .then((res) => res.json())
  //     .then((members) => {
  //       setMembers(members)
  //       setLoading(false)
  //     })
  // }, [])
  
  // const { data, error } = useSWR('http://localhost:3000//api/members', fetcher)
 

  return (
    <section className='FlexContainer'>
      {members.map(m => (
      <div className="container-box">
          <div className="name-data">{m.nama}</div>
          <input type="number" placeholder="   input money" className="input-money"/>
          <input type="hidden" className="input-detail" />

          <div className="cost">Total = Rp. Total</div>
          <button className="detail-btn">Detail</button>
      </div>
      ))}
    </section>
  )
}