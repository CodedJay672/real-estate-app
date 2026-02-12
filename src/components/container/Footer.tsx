import { quickLinks } from "@/constants";
import { getYear } from "@/lib/utils";
import {
  RiFacebookLine,
  RiInstagramLine,
  RiTiktokLine,
  RiYoutubeLine,
} from "react-icons/ri";
import Logo from "../shared/Logo";

const Footer = () => {
  return (
    <section className="w-full bg-slate-50 p-4 py-10">
      <div className="container py-10 md:py-16 xl:py-20 flex flex-col md:flex-row justify-around flex-wrap mx-auto">
        <div className="w-56 overflow-hidden">
          <Logo />
          <p className="text-sm lg:text-base font-light">
            Because of our resource and results, we are Your Realty Partner for
            Life.
          </p>
          <div className="flex gap-2 my-2">
            <a
              href="https://www.facebook.com/profile.php?id=100063960527914"
              target="_blank"
            >
              <RiFacebookLine className="size-4 lg:size-6" />
            </a>
            <a href="https://youtube.com" target="_blank">
              <RiYoutubeLine className="size-4 lg:size-6" />
            </a>
            <a
              href="https://www.instagram.com/laurettaasemota?igsh=MXBsazJrOG1tdzB6bQ=="
              target="_blank"
            >
              <RiInstagramLine className="size-4 lg:size-6" />
            </a>
            <a
              href="https://www.tiktok.com/@laurettaasemota?_t=ZM-8whsWZgYljq&_r=1"
              target="_blank"
            >
              <RiTiktokLine className="size-4 lg:size-6" />
            </a>
          </div>
        </div>
        <ul className="list-none list-inside my-10 md:my-0">
          <li>
            <h2 className="text-sm lg:text-base font-semibold">Quick Links</h2>
          </li>
          {quickLinks.map((link, idx) => (
            <li className="py-1" key={link.link + idx}>
              <a
                href={link.link}
                className="text-xs lg:text-sm hover:underline transition-all"
              >
                {link.lable}
              </a>
            </li>
          ))}
        </ul>

        <div className="w-56">
          <h2 className="text-base lg:text-base font-medium">Visit Us</h2>
          <p className="text-sm mt-1">
            Plot 6c, UPDC estate rd, Elf bus stop , Lekki - Epe expressway,
            Lagos, Nigeria.
            <br />
            <br />
            Call us:
            <br />
            +23490 1689 0757
            <br />
            <br />
            email us:
            <br />
            support@cleanbeautifulproperties.com
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center border-t border-gray-200 py-5">
        <p className="text-xs text-gray-600 text-center">
          Clean and Beautiful Properties LTD © {getYear()}. All rights reserved.
        </p>
      </div>
    </section>
  );
};

export default Footer;
