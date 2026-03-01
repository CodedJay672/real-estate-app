"use client"

import { EllipsisVertical } from "lucide-react"
import { Button } from "../ui/button"


const MoreAction = () => {
  return (
    <Button type="button" variant="ghost" size="icon" className="p-0.5 cursor-pointer rounded-full group">
      <EllipsisVertical className="text-dark-100" />
    </Button>
  )
}

export default MoreAction