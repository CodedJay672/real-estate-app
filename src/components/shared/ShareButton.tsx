"use client"

import { EllipsisVertical, Share2 } from "lucide-react"
import { Button } from "../ui/button"


const ShareButton = () => {
  return (
    <Button type="button" variant="ghost" size="icon" className="p-0.5 cursor-pointer rounded-full group">
      <Share2 className="text-blue-700" />
    </Button>
  )
}

export default ShareButton