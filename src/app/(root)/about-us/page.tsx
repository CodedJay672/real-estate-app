import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutUs() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-primary to-primary-light text-white py-20">
        <div className="wrapper text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About US</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Your trusted partner in finding the perfect property. We connect buyers, sellers, and renters with exceptional real estate opportunities.
          </p>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 bg-light-100">
        <div className="wrapper">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-primary">Our Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              At CBPL, our mission is to revolutionize the real estate experience by providing a seamless, transparent, and innovative platform that empowers individuals and families to find their dream homes. We believe that everyone deserves access to quality housing options, and we're committed to making the property search process efficient, enjoyable, and stress-free.
            </p>
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-16">
        <div className="wrapper">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">Meet the Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

      {/* Our Services */}
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

      {/* Why Choose Us */}
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

      {/* Contact CTA */}
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
    name: "Sarah Johnson",
    role: "CEO & Founder",
    bio: "With over 15 years in real estate, Sarah leads CBPL with a vision for innovative property solutions.",
    image: "/assets/team/sarah.jpg" // Placeholder, will use fallback
  },
  {
    name: "Michael Chen",
    role: "Head of Technology",
    bio: "Michael ensures our platform delivers cutting-edge features for seamless user experiences.",
    image: "/assets/team/michael.jpg"
  },
  {
    name: "Emily Rodriguez",
    role: "Real Estate Specialist",
    bio: "Emily brings expertise in market analysis and helps clients find their perfect homes.",
    image: "/assets/team/emily.jpg"
  }
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