import axios from "axios";
import CardDetails from "@/components/CardDetail";
import MetaHeader from "@/components/metaHead";
import Head from "next/head";

// const mainUrl = process.env.NEXT_PUBLIC_BASE_URL;

// const getMembers = async () => {
//   try {
//     const res = await axios.get(`${mainUrl}/api/members`, {
//       headers: { 'Cache-Control': 'no-store' }
//     });

//     if (!res.data) {
//       throw new Error('Failed to fetch members or data is missing');
//     }

//     return res.data;
//   } catch (error) {
//     console.error("Error loading members: ", error.message);
//     throw error;
//   }
// };

// const changeRupiah = (number)=>{
//   return new Intl.NumberFormat("id-ID", {
//     currency: "IDR"
//   }).format(number);
// }

// const { members } = await getMembers();
export const metadata = {
  title: "Home || Pay Me",
  description: "Generated by create next app",
};

export default function Details() {
  return (
    <>
     <Head>
        <title>My page title</title>
    </Head>
    <CardDetails />
  </>
  )
}