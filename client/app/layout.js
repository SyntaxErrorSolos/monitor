import "./globals.css";
import { Lexend_Deca } from "next/font/google";

const lexend = Lexend_Deca({
  subsets: ["latin"],
  weight: ["500", "600", "700", "900"],
});

export const metadata = {
  title: "Monitor",
  description: "Create simple and easy to manage alerts for your website!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={lexend.className}>{children}</body>
    </html>
  );
}
