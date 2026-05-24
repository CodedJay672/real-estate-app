"use client";

import { Loader, X } from 'lucide-react';
import { Dispatch, useCallback, useState } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';
import { Image } from '@imagekit/next';


import { toast } from '@/hooks/use-toast';
import config from '@/lib/config';
import { Button } from '../ui/button';
import { useProductProvider } from '../providers/StoreProvider';

const MAX_SIZE = 2 * 1024 * 1024; // 2MB

export default function FileDropzone({ onFileChangeAction, onRemoveAction, imgUrl }: { onFileChangeAction: Dispatch<File>; imgUrl: string; onRemoveAction: () => void }) {
  // global product store
  const { isUploading, isDeleting } = useProductProvider((state) => state)

  // function to execute on drop
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) {
      return;
    }

    const file = acceptedFiles[0];

    if (file.size > MAX_SIZE) {
      toast({
        title: 'File too large',
        description: `Maximum size is 1MB. ${file.name} is ${(file.size / 1024 / 1024).toFixed(2)}MB`,
        variant: 'destructive',
      });
      return;
    }

    // set file and preview url
    onFileChangeAction(file);
  }, [])

  const onDropRejected = useCallback((fileRejections: FileRejection[]) => {
    fileRejections.forEach(({ file, errors }) => {
      errors.forEach((e) => {
        if (e.code === 'file-too-large') {
          toast({
            title: 'File too large',
            description: `Maximum size is 1MB. ${file.name} is ${(file.size / 1024 / 1024).toFixed(2)}MB`,
            variant: 'destructive',
          });
        } else if (e.code === 'file-invalid-type') {
          toast({
            title: 'Invalid file type',
            description: `Only JPEG, JPG and PNG images are allowed.`,
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Cannot add file',
            description: e.message || 'Unknown error',
            variant: 'destructive',
          });
        }
      });
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxSize: MAX_SIZE// 2MB max
  })

  return (
    <section className="size-full flex-center flex-col border border-border rounded-lg bg-light-100/10 relative">
      {imgUrl ?
        <>
          <Button type='button' variant="ghost" size="sm" disabled={isDeleting} onClick={onRemoveAction} className='size-8 md:size-12 text-xs text-light-200 cursor-pointer absolute max-sm:right-2 max-sm:top-2 z-2 bg-dark-50 md:bg-dark-50/50 hover:bg-dark-200 hover:text-light-100 disabled:bg-seconday-light-50 rounded-full'>
            {isDeleting ? <Loader size={44} className='animate-spin text-light-50' /> : <X size={28} />}
          </Button>

          <Image urlEndpoint={config.env.imagekit.urlEndpoint} src={imgUrl} alt='product img' sizes='(min-width: 360px) 100%' fill priority className='object-cover' />

        </>
        :
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {
            isDragActive ?
              <p>Drop the file here ...</p> :
              isUploading ?
                <Loader size={32} className='animate-spin text-dark-50' /> :
                <p className='size-full text-sm md:text-base text-light-200'>
                  Drag 'n' drop a file here
                  <span className='text-dark-50 bg-light-200/20 px-2 rounded-full block w-max mx-auto cursor-pointer select-none'>or click to select</span>

                </p>

          }

        </div>
      }
    </section>
  )
}