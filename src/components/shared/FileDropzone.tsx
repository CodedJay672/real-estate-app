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
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
  )
}