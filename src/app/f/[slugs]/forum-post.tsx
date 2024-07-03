'use client'

import { Post } from '@prisma/client'
import { ChevronUp, MessageCircle } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const ForumPost = ({
  post,
  forumSlug
}: {
  post: Post & {
    _count: {
      comments: number
      upvotes: number
    }
  }
  forumSlug: string
}) => {
  const { status } = useSession()
  const router = useRouter()

  return (
    <Link
      className='block w-full p-4 border border-border rounded-xl shadow-[0_0px_0px_1px_rgba(0,0,0,0.05)]'
      href={`/f/${forumSlug}/p/${post?.slug}`}
    >
      <h1 className='font-medium'>{post.title}</h1>
      <p className='text-sm text-foreground/80'>{post.description}</p>
      <div className='flex justify-end gap-6 items-center mt-1'>
        <div className='flex items-center gap-2'>
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
            className='h-7 flex items-center rounded-md px-1 border border-border cursor-pointer'
          >
            <ChevronUp size={16} />
          </div>
          <p className='text-sm'>{post._count.upvotes}</p>
        </div>
        <div className='flex items-center gap-1'>
          <MessageCircle size={18} strokeWidth={1.5} />
          <p className='text-sm'>{post._count.comments}</p>
        </div>
      </div>
    </Link>
  )
}

export default ForumPost
