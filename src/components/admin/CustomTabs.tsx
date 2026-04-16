'use client';

import { useSearchParams } from 'next/navigation';

import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import useSearch from '@/hooks/useSearch';

function CustomTabs({ tabs }: { tabs: TabsType[] }) {
  const params = useSearchParams()
  const { handleSearch } = useSearch()

  const tabLabel = params.get('tab') || "";


  return (
    <div className='w-max p-0.5 bg-light-100/50 rounded-lg flex items-center gap-1 border border-light-200'>
      {tabs.map(tab => (
        <Button key={tab.id} type="button" size="sm" variant="ghost" onClick={() => handleSearch({ tab: tab.value })} className={cn('text-xs h-6', tabLabel === tab.value ? "bg-light-50 hover:bg-light-50 text-dark-200" : "bg-transparent text-dark-50")}>
          {tab.label}
        </Button>
      ))}
    </div>
  )
}

export default CustomTabs