import Image from 'next/image'
import Link from 'next/link'

const Logo = () => {
  return (
    <Link href="/" as="/" className="flex justify-center items-center gap-1">
      <Image
        src="/assets/logo.png"
        alt="clean and beautiful properties"
        width={70}
        height={50}
        className="object-cover"
      />
    </Link>
  )
}

export default Logo