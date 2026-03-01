import { LoaderIcon } from 'lucide-react'

const LoadingSpinner = () => {
  return (
    <div className='w-full h-screen flex-center gap-2'>
      <LoaderIcon className="size-10 animate-spin text-seconday-light-50" />
      <p className="text-base text-primary">Loading, please wait...</p>
    </div>
  )
}

export default LoadingSpinner