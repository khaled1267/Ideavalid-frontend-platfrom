import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navber from "@/component/Navber";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Home | IdeaValid",
  description: "IdeaValid is a platform for startup ideation and validation.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      
      <body className="min-h-full flex flex-col">
        <Navber />
        <Toaster
  position="top-center"
  reverseOrder={false}
/>
       <main className="flex-1">{children}</main>
        </body>
    </html>
  );
}
