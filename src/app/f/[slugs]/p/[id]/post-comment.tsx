'use client'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Loader } from 'lucide-react'
import { Comment } from '@prisma/client'
import { UnauthenticationAlert } from '../../create-post'
import { useSession } from 'next-auth/react'

const PostComment = ({ postId }: { postId: string }) => {
  const [comment, setComment] = useState<string>('')
  const [isCreating, setStatus] = useState(false)

  const router = useRouter()
  const { status } = useSession()

  const handleSubmission = async () => {
    if (comment.length <= 5) {
      toast('Invalid Comment', {
        description: 'Comment should be more than 5 characters long.'
      })
      return
    }

    setStatus(true)
    try {
      const response = await fetch('/api/comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: comment, postId: postId })
      })

      const data: {
        ok: boolean
        data?: {
          comment: Comment
        }
        message?: string
        status: number
      } = await response.json()

      if (!data.ok) {
        throw new Error('Failed to add comment.')
      }

      toast('Comment Added', {
        description: 'Your comment has been successfully added.'
      })
      setComment('')

      router.refresh()
    } catch (error) {
      toast('Something went wrong', {
        description: (error as Error).message
      })
    }
    setStatus(false)
  }
  return (
    <div className='space-y-3'>
      <Textarea
        id='comment'
        placeholder='Leave a comment'
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={2}
      />
      {status === 'unauthenticated' && <UnauthenticationAlert />}
      <Button
        className='w-full'
        onClick={handleSubmission}
        disabled={isCreating}
      >
        {isCreating && <Loader size={18} className='animate-spin mr-1.5' />}
        Add Comment
      </Button>
    </div>
  )
}
export default PostComment
