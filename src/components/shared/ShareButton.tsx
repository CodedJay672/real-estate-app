"use client"

import { Share2 } from "lucide-react"
import { Button } from "../ui/button"


const ShareButton = ({ productLink }: { productLink: string }) => {
  const handleClick = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Check out this product!',
        text: 'I found this amazing product and thought you might like it.',
        url: productLink,
      })
        .then(() => console.log('Product shared successfully'))
        .catch((error) => console.error('Error sharing:', error));
    } else {
      alert('Sharing is not supported in this browser. Please copy the link: ' + productLink);
    }
  }

  return (
    <Button type="button" variant="ghost" size="icon" className="p-0.5 cursor-pointer rounded-full group" onClick={handleClick}>
      <Share2 className="text-blue-700" />
    </Button>
  )
}

export default ShareButton