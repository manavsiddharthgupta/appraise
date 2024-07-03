'use client'

import { ChevronUp } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

const UpvoteUi = ({ upvotes }: { upvotes: number }) => {
  const { status } = useSession()
  const router = useRouter()

  return (
    <div
      onClick={(e) => {
        e.preventDefault()
        if (status === 'unauthenticated') {
          toast('Post cannot get upvotes', {
            description: 'You are not logged in.',
            action: {
              label: 'Log in',
              onClick: () => router.push('/auth/signin')
            }
          })
          return
        }
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
