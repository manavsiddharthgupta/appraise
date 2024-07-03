'use client'

import { ChevronUp } from 'lucide-react'
import { toast } from 'sonner'

const UpvoteUi = ({ upvotes }: { upvotes: number }) => {
  return (
    <div
      onClick={(e) => {
        e.preventDefault()
        toast('Feature Coming Soon', {
          description: 'We are working hard to bring you this feature.'
        })
      }}
      className='justify-center items-center rounded-xl px-3 flex flex-col h-16 border border-border cursor-pointer'
    >
      <ChevronUp size={22} />
      <span className='text-lg'>{upvotes}</span>
    </div>
  )
}

export default UpvoteUi
