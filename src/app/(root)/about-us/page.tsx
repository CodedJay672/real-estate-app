import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { QuoteIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AboutUs() {
  return (
    <div className="w-full">
      <section className="bg-linear-to-r from-primary to-primary-light text-white py-20">
        <div className="wrapper">
          <div className="flex gap-10">

            <Avatar className="w-100 h-100 shrink-0">
              <AvatarImage src="/assets/team/lauretta.png" alt="Lauretta Asemota" className="rounded-md" />
              <AvatarFallback>LA</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold mb-6">About US</h1>
              <div className="w-full relative">
                <QuoteIcon size={150} className="absolute -top-5 -left-5 text-slate-400 opacity-25 fill-slate-400 rotate-180 z-0" />
                <p className=" flex-1 max-w-3xl text-lg leading-relaxed relative z-10">
                  CLEAN AND BEAUTIFUL PROPERTIES LIMITED is a real estate consulting firm with a mission to create the paradise you truly deserve, with a perfect blend of Nature, technology, Luxury and sophistication.
                  <br /><br />
                  At Clean and Beautiful Properties limited, we provide you with the very best real estate  solutions; offering you a stress-free, secure, accessible, pollution free, and economically advantaged environment, guiding you through on the right path.
                  <br /><br />
                  Our highly intelligent real estate and environmental consultants offer you that value in strategic locations of properties with genuine, verified documents without  fear of any encumbrance from government or community, or any future demolition.
                  We have properties in Lekki and across Lagos, across Nigeria, the US, UK and Dubai.
                  We will guide you on the journey to high profitable returns on your investments, amidst rising inflation.
                  Property investments are a fund multiplier system, growing your money by leaps and bounds.
                  WE ARE CREDIBLE AND TRUSTWORTHY and that would be your testimonial by God's special grace.
                  <br /><br />
                  <br /><br />
                  Warm regards
                  LAURETTA ASEMOTA (Pst)
                </p>
                <QuoteIcon size={150} className="absolute -bottom-5 -right-5 text-slate-400 fill-slate-400 opacity-25 z-0" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-light-100">
        <div className="wrapper">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-primary">Our Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              We are a real estate consulting firm with a mission to create the paradise you truly deserve, with a perfect blend of Nature, technology, Luxury and sophistication. We are committed to providing exceptional service, expert guidance, and innovative solutions to help you navigate the real estate market with confidence and ease.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="wrapper">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">Meet the Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src={member.image} alt={member.name} />
                  <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-accent-brown font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-light-100">
        <div className="wrapper">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="wrapper">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">Why Choose US?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Excellence in Every Transaction</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-accent-bright mr-3">✓</span>
                  <span>Comprehensive property listings with detailed information</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-bright mr-3">✓</span>
                  <span>Advanced search and filtering capabilities</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-bright mr-3">✓</span>
                  <span>Expert guidance and market insights</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-bright mr-3">✓</span>
                  <span>Secure and transparent transaction process</span>
                </li>
              </ul>
            </div>
            <div className="bg-linear-to-br from-accent-bright to-accent-brown rounded-lg p-8 text-white">
              <h3 className="text-2xl font-semibold mb-4">Join Thousands of Satisfied Customers</h3>
              <p className="mb-6">Experience the difference with CBPL's commitment to quality and customer satisfaction.</p>
              <Link href="https://wa.link/a0m76f" className="bg-white text-primary hover:bg-gray-100 px-8 py-3 transition-colors">
                Get Started Today
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-primary text-white">
        <div className="wrapper text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Find Your Dream Property?</h2>
          <p className="text-xl mb-8">Contact our team today and let us help you navigate the real estate market.</p>
          <Link href="https://wa.link/a0m76f" className="bg-accent-bright text-primary hover:bg-accent-brown px-8 py-3 transition-colors">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}

const teamMembers = [
  {
    name: "Lauretta Asemota (pst)",
    role: "CEO & Founder",
    bio: "With over 15 years in real estate, Sarah leads CBPL with a vision for innovative property solutions.",
    image: "/assets/team/sarah.jpg"
  },
  {
    name: "Dr. Kika Igudia",
    role: "Executive Director",
    bio: "Ensures operational excellence and strategic growth across all Clean Beautiful Properties projects.",
    image: "/assets/team/michael.jpg"
  },
];

const services = [
  {
    icon: "🏠",
    title: "Property Listings",
    description: "Comprehensive database of residential and commercial properties with detailed information and high-quality images."
  },
  {
    icon: "🔍",
    title: "Advanced Search",
    description: "Powerful search tools to filter properties by location, price, size, amenities, and more."
  },
  {
    icon: "📊",
    title: "Market Insights",
    description: "Access to real-time market data, trends, and analytics to make informed decisions."
  },
  {
    icon: "🤝",
    title: "Expert Guidance",
    description: "Professional support from our team of real estate experts throughout your journey."
  },
  {
    icon: "🔒",
    title: "Secure Transactions",
    description: "Safe and transparent processes for buying, selling, and renting properties."
  },
  {
    icon: "📱",
    title: "Mobile Access",
    description: "Full functionality on mobile devices for property browsing on the go."
  }
];