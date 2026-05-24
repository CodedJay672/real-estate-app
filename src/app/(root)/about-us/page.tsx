import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { QuoteIcon, Home, Search, TrendingUp, Handshake, ShieldCheck, Smartphone, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function AboutUs() {
  return (
    <div className="w-full bg-[#f8fafc]">
      {/* Premium Hero Section */}
      <section className="relative bg-[#0f172a] text-white py-24 lg:py-32 overflow-hidden">
        {/* Luxury Background Accents */}
        <div className="absolute inset-0 bg-[url(/assets/hero-banner.jpg)] bg-cover bg-center opacity-10 mix-blend-overlay" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#b88f3a] rounded-full blur-[150px] opacity-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#f5c344] rounded-full blur-[120px] opacity-10 pointer-events-none" />
        
        <div className="wrapper relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="relative group">
              <div className="absolute -inset-1 bg-linear-to-r from-[#f5c344] to-[#b88f3a] rounded-2xl blur-sm opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#b88f3a]/40 shadow-2xl">
                <Avatar className="w-64 h-64 md:w-80 md:h-80 rounded-none shrink-0">
                  <AvatarImage src="/assets/team/ceo.jpeg" alt="Lauretta Asemota" className="object-cover object-top" />
                  <AvatarFallback className="text-4xl text-[#0f172a] bg-[#f5c344]">LA</AvatarFallback>
                </Avatar>
              </div>
            </div>
            
            <div className="flex-1 text-center lg:text-left">
              <h4 className="text-[#f5c344] font-semibold tracking-[0.2em] uppercase mb-3 text-sm">About The Company</h4>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-tight">
                Crafting The <span className="text-transparent bg-clip-text bg-linear-to-r from-[#f5c344] via-amber-200 to-[#b88f3a]">Paradise</span> You Deserve
              </h1>
              
              <div className="relative inline-block text-left">
                <QuoteIcon size={80} className="absolute -top-6 -left-8 text-[#b88f3a] opacity-20 rotate-180 z-0" />
                <p className="text-lg md:text-xl leading-relaxed text-slate-300 relative z-10 font-light max-w-3xl">
                  <strong className="text-white font-medium">CLEAN AND BEAUTIFUL PROPERTIES LIMITED</strong> is a premium real estate consulting firm. Our mission is to seamlessly blend nature, cutting-edge technology, and unmatched luxury to deliver the sophistication you truly deserve.
                  <br /><br />
                  Our highly intelligent consultants secure properties in strategic locations—across Lagos, Nigeria, the US, UK, and Dubai—with completely verified documentation. Property investment is the ultimate wealth multiplier, and <strong className="text-white font-medium">we are credible, trustworthy, and committed to your high-yield returns.</strong>
                </p>
                <div className="mt-8 pt-6 border-t border-white/10">
                  <p className="text-[#f5c344] font-semibold text-lg tracking-wide">Pst. Lauretta Asemota</p>
                  <p className="text-slate-400 text-sm uppercase tracking-wider mt-1">CEO & Founder</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team - Premium Cards */}
      <section className="py-24 bg-white relative">
        <div className="wrapper">
          <div className="text-center mb-16">
            <h4 className="text-[#b88f3a] font-bold tracking-[0.2em] uppercase mb-2 text-sm">Leadership</h4>
            <h2 className="text-3xl md:text-5xl font-bold text-[#0f172a]">Meet The Team</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            {teamMembers.map((member, index) => (
              <div key={index} className="group bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:border-[#b88f3a]/30 transition-all duration-500 overflow-hidden">
                <div className="h-32 bg-[#0f172a] relative">
                  <div className="absolute inset-0 bg-linear-to-r from-[#f5c344]/20 to-transparent" />
                </div>
                <div className="px-8 pb-8 text-center -mt-16 relative z-10">
                  <Avatar className="w-32 h-32 mx-auto mb-6 border-4 border-white shadow-lg">
                    <AvatarImage src={member.image} alt={member.name} className="object-cover" />
                    <AvatarFallback className="text-2xl text-white bg-[#0f172a]">{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-2xl font-bold text-[#0f172a] mb-1">{member.name}</h3>
                  <p className="text-transparent bg-clip-text bg-linear-to-r from-[#b88f3a] to-amber-600 font-bold uppercase tracking-wider text-xs mb-4">{member.role}</p>
                  <p className="text-slate-500 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-[#0f172a] relative overflow-hidden text-white">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#b88f3a]/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="wrapper relative z-10">
          <div className="text-center mb-16">
            <h4 className="text-[#f5c344] font-bold tracking-[0.2em] uppercase mb-2 text-sm">What We Offer</h4>
            <h2 className="text-3xl md:text-5xl font-bold">Premium Services</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-8 hover:bg-white/10 hover:-translate-y-2 transition-all duration-300 group">
                  <div className="w-14 h-14 rounded-xl bg-linear-to-br from-[#f5c344] to-[#b88f3a] flex items-center justify-center text-[#0f172a] mb-6 shadow-lg group-hover:scale-110 transition-transform">
                    <Icon size={28} strokeWidth={2.5} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">{service.title}</h3>
                  <p className="text-slate-400 leading-relaxed font-light">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us & CTA */}
      <section className="py-24 bg-white">
        <div className="wrapper">
          <div className="bg-white border border-slate-200 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row">
            <div className="p-10 lg:p-16 lg:w-3/5">
              <h4 className="text-[#b88f3a] font-bold tracking-[0.2em] uppercase mb-2 text-sm">The CBPL Advantage</h4>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-8">Excellence in Every Transaction</h2>
              
              <ul className="space-y-6">
                {[
                  "Comprehensive luxury property listings across the globe",
                  "Verified documents without fear of community encumbrance",
                  "Highly intelligent real estate and environmental consultants",
                  "Secure, transparent, and pollution-free environments"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <CheckCircle2 className="text-[#b88f3a] shrink-0 mt-0.5" size={24} />
                    <span className="text-slate-600 text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-[#0f172a] p-10 lg:p-16 lg:w-2/5 flex flex-col justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-br from-[#f5c344]/20 to-transparent mix-blend-overlay" />
              <div className="relative z-10 text-white">
                <h3 className="text-3xl font-bold mb-4">Start Your Journey</h3>
                <p className="text-slate-300 text-lg mb-10 font-light">Join the 100+ satisfied luxury homeowners who trusted us to find their paradise.</p>
                
                <Link href="https://wa.link/a0m76f" className="inline-flex items-center justify-center w-full rounded-xl bg-linear-to-r from-[#f5c344] to-[#b88f3a] px-8 py-4 text-lg font-bold text-[#0f172a] shadow-xl hover:shadow-[#f5c344]/30 hover:scale-[1.02] transition-all">
                  Contact Our Experts
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const teamMembers = [
  {
    name: "Pst. Lauretta Asemota",
    role: "CEO & Founder",
    bio: "With over a decade of executive leadership, Pst. Lauretta leads CBPL with a profound vision for luxury and innovative property solutions, guiding investors to high-yield returns.",
    image: "/assets/team/ceo.jpeg"
  },
  {
    name: "Dr. Kika Igudia",
    role: "Executive Director",
    bio: "Ensures operational excellence and strategic growth across all Clean Beautiful Properties projects, delivering a stress-free and secure experience for every client.",
    image: "/assets/team/michael.jpg" // Assuming image mapping
  },
];

const services = [
  {
    icon: Home,
    title: "Luxury Listings",
    description: "Access our exclusive database of highly verified residential and commercial properties in premium locations globally."
  },
  {
    icon: Search,
    title: "Strategic Search",
    description: "We filter through the noise to find properties that match your specific desire for nature, technology, and sophistication."
  },
  {
    icon: TrendingUp,
    title: "Investment Growth",
    description: "Property investments are a fund multiplier system. We guide you to high profitable returns amidst rising inflation."
  },
  {
    icon: Handshake,
    title: "Expert Consulting",
    description: "Highly intelligent real estate and environmental consultants guiding you safely through every step of your transaction."
  },
  {
    icon: ShieldCheck,
    title: "Secure Transactions",
    description: "Absolute peace of mind with properties featuring genuine, verified documents free from government or community encumbrance."
  },
  {
    icon: Smartphone,
    title: "Seamless Experience",
    description: "A stress-free, modern approach to property acquisition, keeping you updated in real-time through our digital platforms."
  }
];