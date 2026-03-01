"use client"

import { useState } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button";

const SubscribeEmailForm = () => {
  const [email, setEmail] = useState("");

  return (
    <form className="w-full max-w-xl flex items-center gap-3 border-b border-b-light-100 p-2 mx-auto">
      <Input type="email" value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" placeholder="Type A Valid Email Address..." className="w-full h-15 text-base md:text-lg placeholder:text-light-100 caret-accent-brown border-none focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none" />

      <Button className="h-full bg-accent-bright text-dark-200 hover:bg-accent-bright/50 cursor-pointer`">Join us</Button>
    </form>
  )
}

export default SubscribeEmailForm