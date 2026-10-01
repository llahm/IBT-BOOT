import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { CartProvider } from "../components/CartProvider";

export const metadata = {
  title: {
    default: "Addis Eats | Good food, delivered",
    template: "%s | Addis Eats",
  },
  description: "Discover Ethiopian favorites and local food in Addis Ababa.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
