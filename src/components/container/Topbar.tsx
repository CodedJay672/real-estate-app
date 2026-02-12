import { auth } from "@/auth";
import Header from "./Header";
import Image from "next/image";
import Link from "next/link";
import Logo from "../shared/Logo";

const Topbar = async () => {
  const session = await auth();

  return (
    <header className="w-ful z-50 px-2 py-4 sticky top-0 backdrop-blur-md bg-gray-50">
      <nav className="container flex justify-between items-center mx-auto">
        <Logo />
        <ul className="text-base hidden md:flex items-center justify-between gap-6">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/listings">Listings</Link>
          </li>
          <li>
            <Link href="/about-us">About Us</Link>
          </li>
        </ul>
        <Header session={session} />
      </nav>
    </header>
  )
};

export default Topbar;
