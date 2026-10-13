import "./globals.css";
import { Geist } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/CartProvider";
const geist=Geist({subsets:["latin"],display:"swap"});
export const metadata = {
 metadataBase:new URL(process.env.NEXT_PUBLIC_SITE_URL||"http://localhost:3000"),
 title:{default:"Addis Eats | Good food, delivered",template:"%s | Addis Eats"},
 description:"Discover Ethiopian favorites and local food in Addis Ababa.",
 openGraph:{type:"website",siteName:"Addis Eats",title:"Addis Eats | Good food, delivered",description:"Discover Ethiopian favorites and local food in Addis Ababa.",images:["/og-image.svg"]},
};
export default function RootLayout({ children }) {
 return <html lang="en"><body className={geist.className}><CartProvider><Header/>{children}<Footer/></CartProvider></body></html>;
}
