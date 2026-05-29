"use client"

import { useState } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useToast } from "@/hooks/use-toast"

const SubscribeEmailForm = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setLoading(false);

    toast({
      title: "Success! 🎉",
      description: "Thank you for subscribing to Clean & Beautiful Properties newsletter!",
    });
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl flex items-center gap-3 border-b border-b-light-100 px-2 py-1 mx-auto">
      <Input 
        type="email" 
        required
        value={email} 
        onChange={e => setEmail(e.target.value)} 
        autoComplete="email" 
        placeholder="Type A Valid Email Address..." 
        className="w-full h-12 md:h-15 text-base md:text-lg placeholder:text-light-100 caret-accent-brown border-none focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none bg-transparent" 
      />

      <Button disabled={loading} className="h-full bg-[#f5c344] text-[#0f172a] hover:bg-[#b88f3a] cursor-pointer">
        {loading ? "Joining..." : "Join us"}
      </Button>
    </form>
  )
}

export default SubscribeEmailForm