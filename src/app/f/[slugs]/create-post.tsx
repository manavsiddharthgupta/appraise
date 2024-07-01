'use client'
import { CardContent, CardFooter } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { useState } from 'react'
import uniqueSlug from 'unique-slug'
import { Loader } from 'lucide-react'
import { Post } from '@prisma/client'
import { useRouter } from 'next/navigation'

const CreatePost = ({ forumId }: { forumId: string }) => {
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [isCreating, setStatus] = useState(false)

  const router = useRouter()

  const handleSubmission = async () => {
    if (title.length <= 3) {
      toast('Invalid Title', {
        description: 'Title should be more than 3 characters long.'
      })
      return
    }

    if (description.length <= 5) {
      toast('Invalid Description', {
        description: 'Description should be more than 5 characters long.'
      })
      return
    }

    const slug = uniqueSlug(title)
    setStatus(true)

    try {
      const response = await fetch('/api/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, description, slug, forumId })
      })

      const data: {
        ok: boolean
        data?: {
          post: Post
        }
        message?: string
        status: number
      } = await response.json()

      console.log(data)
      if (!data.ok) {
        throw new Error('Failed to create forum.')
      }

      toast('Post Created', {
        description: 'Your post has been successfully created.'
      })
      setTitle('')
      setDescription('')

      router.refresh()
    } catch (error) {
      toast('Something went wrong', {
        description: (error as Error).message
      })
    }
    setStatus(false)
  }

  return (
    <>
      <CardContent>
        <form>
          <div className='grid w-full items-center gap-4'>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='title'>Title</Label>
              <Input
                id='title'
                placeholder='Short title for your feature idea'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='description'>Description</Label>
              <Textarea
                id='description'
                placeholder='Describe your feature idea in more detail'
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button
          className='w-full'
          onClick={handleSubmission}
          disabled={isCreating}
        >
          {isCreating && <Loader size={18} className='animate-spin mr-1.5' />}
          Submit
        </Button>
      </CardFooter>
    </>
  )
}

export default CreatePost
