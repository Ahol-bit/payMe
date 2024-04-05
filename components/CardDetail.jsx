import axios from "axios";


const mainUrl = process.env.NEXT_PUBLIC_BASE_URL;

const getMembers = async () => {
  try {
    const res = await axios.get(`${mainUrl}/api/members`, {
      headers: { 'Cache-Control': 'no-store' }
    });

    if (!res.data) {
      throw new Error('Failed to fetch members or data is missing');
    }

    return res.data;
  } catch (error) {
    console.error("Error loading members: ", error.message);
    throw error;
  }
};

const changeRupiah = (number)=>{
  return new Intl.NumberFormat("id-ID", {
    currency: "IDR"
  }).format(number);
}

const { members } = await getMembers();

export default function CardDetails() {
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
  )
}