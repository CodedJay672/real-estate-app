import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <Link href="/" className="flex justify-center items-center gap-1">
      <Image
        src="/assets/logo.png"
        alt="clean and beautiful properties"
        width={90}
        height={70}
        className="object-cover"
      />
    </Link>
  )
}

export default Logo