import { quickLinks } from "@/constants";
import Logo from "../shared/Logo";
import Link from "next/link";
import SubscribeEmailForm from "../forms/SubscribeEmailForm";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <section className="w-full bg-slate-50 p-4 py-10 space-y-24">
      <div className="container mx-auto space-y-10">
        <div className="space-y-8 w-full">
          <h2 className="w-full text-2xl md:text-4xl font-light text-dark-200 text-center">Stay <span className="text-accent-brown">Informed!</span></h2>
          <p className="text-sm md:text-base text-dark-50 max-w-xl font-medium text-center mx-auto">Stay informed with industry news and happenings, Market prices, Government policies and overall business outlook which helps you make informed decision about making your next investment</p>
        </div>
        <SubscribeEmailForm />
      </div>

      <div className="container flex flex-col md:flex-row justify-around flex-wrap mx-auto">
        <div className="w-56 overflow-hidden">
          <Logo />
          <p className="text-sm lg:text-base font-light">
            Because of our resource and results, we are Your Realty Partner for
            Life.
          </p>
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

        <ul className="list-none list-inside my-10 md:my-0">
          <li>
            <h2 className="text-sm lg:text-base font-semibold">Social media</h2>
          </li>
          <li className="py-1">
            <Link
              href="https://www.facebook.com/profile.php?id=100063960527914"
              target="_blank"
              className="text-xs lg:text-sm hover:underline transition-all"
            >
              Facebook
            </Link>
          </li>
          <li className="py-1">
            <Link
              href="https://youtube.com" target="_blank"
              className="text-xs lg:text-sm hover:underline transition-all"
            >
              YouTube
            </Link>
          </li>
          <li className="py-1">
            <Link
              href="https://www.instagram.com/laurettaasemota?igsh=MXBsazJrOG1tdzB6bQ=="
              target="_blank"
              className="text-xs lg:text-sm hover:underline transition-all"
            >
              Instagram
            </Link>
          </li>
          <li className="py-1">
            <Link
              href="https://www.tiktok.com/@laurettaasemota?_t=ZM-8whsWZgYljq&_r=1"
              target="_blank"
              className="text-xs lg:text-sm hover:underline transition-all"
            >
              TikTok
            </Link>
          </li>
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
          Clean and Beautiful Properties LTD © {year}. All rights reserved.
        </p>
      </div>
    </section>
  );
};

export default Footer;
