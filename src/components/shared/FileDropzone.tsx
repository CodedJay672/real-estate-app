"use client";

import React, { Dispatch, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

export default function FileDropzone({ onFileChangeAction, setImgUrlAction }: { onFileChangeAction: Dispatch<File>, setImgUrlAction: Dispatch<string> }) {
  const onDrop = useCallback((acceptedFiles: File[]) => {

  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p className='text-sm md:text-base text-light-200'>Drag 'n' drop some files here
            <span className='text-green-500 bg-green-50 px-2 rounded-full block w-max mx-auto cursor-pointer select-none'>or click to select</span>
          </p>
      }
    </div>
  )
}