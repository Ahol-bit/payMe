import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header1";
import { AuthProvider } from "./Provider";
import dynamic from 'next/dynamic';

const Headers = dynamic(() => import('@/components/Header'), { ssr: false });
const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="max-w 3xl mx-auto">
          <AuthProvider>
          <Headers />
          <div className="mt-8">
            {children}
          </div>
          </AuthProvider>
        </div>
      <footer className='relative bottom-[0] border-t-[2px] border-black p-5 text-center'>
        <p className="text-lg">&copy; FOOTER</p>
      </footer>
      </body>
    </html>
  );
}
