import Image from 'next/image';
import Link from 'next/link';

interface CampaignCardProps {
  img: string;
  title: string;
  subtitle: string
};

export default function CampaignCard({ img, title, subtitle }: CampaignCardProps) {
  return (
    <Link href="/campaign/downtown" className='w-full h-96 bg-card p-3 rounded-lg overflow-hidden relative group'>
      <Image src={img} alt={title} sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" fill className="object-cover group-hover:scale-105 transition-transform transform-gpu duration-300 z-0" />      <div className='w-full bg-muted/20 text-secondary backdrop-blur-lg md:translate-y-100 group-hover:translate-y-0 transition-transform transform-gpu duration-300 ease-in-out absolute bottom-0 left-0 z-2 p-3 space-y-2'>
        <h2 className='text-base font-bold truncate'>{title}</h2>
        <p className='text-sm line-clamp-2 text-ellipsis capitalize font-light'>{subtitle}</p>
      </div>
    </Link>
  )
}
