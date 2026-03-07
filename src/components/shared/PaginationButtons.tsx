'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';

interface PaginationButtonsProps {
  pagination?: { name: string; id: string };
  hasNext: boolean;
}

const PaginationButtons: React.FC<PaginationButtonsProps> = ({ pagination, hasNext }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleNext = () => {
    if (hasNext && pagination) {
      const params = new URLSearchParams(searchParams);
      params.set('cursorName', pagination.name);
      params.set('cursorId', pagination.id);
      router.push(`?${params.toString()}`);
    }
  };

  const handlePrev = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('cursorName');
    params.delete('cursorId');
    router.push(`?${params.toString()}`);
  };

  return (
    <div className='w-full p-3 flex-center gap-2 mt-24'>
      <Button type="button" variant="outline" onClick={handlePrev} className='w-36 bg-light-50 hover:bg-light-100 cursor-pointer flex items-center gap-1'><ChevronLeft size={16} /> Previous</Button>
      <Button type="button" variant="outline" onClick={handleNext} className='w-36 bg-light-50 hover:bg-light-100 cursor-pointer flex items-center gap-1'>Next <ChevronRight size={16} /></Button>
    </div>
  );
};

export default PaginationButtons;