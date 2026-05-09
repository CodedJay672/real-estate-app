import Image from "next/image";

export default function CeoSpeech({ imgUrl, name, speech }: { imgUrl?: string, name?: string, speech: string }) {
  return (
    <div className="w-full md:flex gap-6">
      <div className="w-full md:w-1/5 h-48 relative rounded-lg overflow-hidden">
        <Image
          src={imgUrl ?? ""}
          alt={name ?? "Agent image"}
          sizes="(max-width: 300px) 30em, 100%"
          fill
          priority
          className="object-cover"
        />
      </div>
      <div className="flex-1 space-y-2 mt-4 md:mt-0">
        <p className="text-slate-700 dark:text-slate-300">{speech}</p>
      </div>
    </div>)
}
