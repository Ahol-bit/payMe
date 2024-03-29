import Link from "next/link";

export default function Header() {
  return (
<div className="fixed top-0 left-0 w-full flex justify-between items-center bg-white px-6 py-7 border-b-4 border-slate-700 z-40">
      <Link className="text-slate-800 font-bold text-3xl" href={"/"}>
        aSONGan
      </Link>
      <nav className="flex justify-between items-center">
        <Link className="md:p-4 lg:px-5 ml-4 md:text-lg text-xs hover:text-gray400" href={"/addMember"}>
          Add Member    
        </Link>
        <Link className="md:p-4 lg:px-5 ml-4  md:text-lg text-xs hover:text-gray400" href={"/payMe"}>
          Pay Me   
        </Link>
      </nav>
</div>
  )
}