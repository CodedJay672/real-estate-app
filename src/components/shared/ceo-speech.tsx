import Image from "next/image";
import Link from "next/link";

export default function CeoSpeech({ imgUrl, name, speech }: { imgUrl?: string, name?: string, speech: string }) {
  const paragraphs = (speech ?? "").split(/\r?\n/).filter(Boolean);

  return (
    <div className="w-full md:flex gap-6">
      <div className="w-full md:w-1/5 relative rounded-lg overflow-hidden">
        <Image
          src={imgUrl ?? ""}
          alt={name ?? "Agent image"}
          sizes="(max-width: 300px) 30em, 100%"
          fill
          priority
          className="object-cover"
        />
      </div>
      <div className="flex-1 space-y-10 mt-4 md:mt-0">
        {paragraphs.map((text, idx) => (
          <p key={idx} className="leading-8 w-full md:w-4/6 text-slate-400">
            {text}
          </p>
        ))}

        <Link href="/about-us" className="w-full md:w-5/6 text-sm text-primary font-medium bg-accent text-center p-3 rounded-full">
          Learn more about us
        </Link>
      </div>
    </div>)
}
