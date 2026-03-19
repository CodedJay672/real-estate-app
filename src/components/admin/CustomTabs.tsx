'use client';

import { useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

function CustomTabs({ tabs }: { tabs: TabsType[] }) {
  const params = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter();

  const tabLabel = params.get('tab');

  useEffect(() => {
    if (params.has('tab')) return;

    // initialize the products tab
    handleClick("products");
  }, [])

  const handleClick = (val: string) => {
    // handle same values
    if (!val || val === tabLabel) return;

    replace(`${pathname}?tab=${val}`);
  }

  return (
    <div className='w-max p-0.5 bg-light-100/50 rounded-lg flex items-center gap-1 border border-light-200'>
      {tabs.map(tab => (
        <Button key={tab.id} type="button" size="sm" variant="ghost" onClick={() => handleClick(tab.value)} className={cn('text-sm', tabLabel === tab.value ? "bg-light-50 text-dark-200" : "bg-transparent text-dark-50")}>
          {tab.label}
        </Button>
      ))}
    </div>
  )
}

export default CustomTabs