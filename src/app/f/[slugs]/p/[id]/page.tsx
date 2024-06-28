import { ChevronUp, Dot, Undo2 } from 'lucide-react'
import { Toggle } from '@/components/ui/toggle'
import type { Metadata, ResolvingMetadata } from 'next'
import { Textarea } from '@/components/ui/textarea'
import BackBtn from '@/components/back-btn'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

type Props = {
  params: { id: string; slugs: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id
  const slug = params.slugs

  // fetch data

  // optionally access and extend (rather than replace) parent metadata

  return {
    title: id + ' | ' + slug,
    description: 'Suggest a feature that you want.'
  }
}

const PostsPage = ({ params }: { params: { id: string; slugs: string } }) => {
  return (
    <main className='sm:px-20 px-4 sm:pt-16 pt-4 max-w-7xl mx-auto'>
      <div className='flex gap-4 items-center'>
        <BackBtn variant='secondary' icon={<Undo2 size={20} />} />
        <h1 className='capitalize font-semibold text-2xl'>{params.slugs}</h1>
      </div>
      <div className='w-full sm:flex flex-row gap-10 py-8'>
        <div className='sm:w-[550px] w-full h-fit'>
          <div className='flex gap-8 py-2'>
            <Toggle
              variant='outline'
              className='flex flex-col h-16 py-1 rounded-xl'
            >
              <ChevronUp size={22} />
              <span className='text-lg'>2</span>
            </Toggle>
            <div className='flex flex-col space-y-4'>
              <div className='flex gap-2 flex-col'>
                <h2 className='capitalize font-semibold text-xl'>
                  {params.id}
                </h2>
                <p>Description ...</p>
              </div>
              <UserProfile />
            </div>
          </div>
        </div>
        <div className='sm:w-[calc(100%-550px)] w-full sm:mt-0 mt-4'>
          <Textarea id='comment' placeholder='Leave a comment' rows={2} />
          <div className='mt-10 gap-8 flex flex-col'>
            <Comment />
          </div>
        </div>
      </div>
    </main>
  )
}

export default PostsPage

const Comment = () => {
  return (
    <div className='w-full space-y-1'>
      <UserProfile />
      <p className='text-foreground/80 text-sm'>comment 1</p>
    </div>
  )
}

const UserProfile = () => {
  return (
    <div className='flex gap-2 items-center'>
      <Avatar className='h-6 w-6'>
        <AvatarImage src='' alt='@forums' />
        <AvatarFallback className='capitalize'>{'M'}</AvatarFallback>
      </Avatar>
      <div className='flex items-center'>
        <span className='text-xs text-foreground/80'>Manav</span>
        <Dot size={14} strokeWidth={3} />
        <span className='text-xs text-foreground/80'>Jun 24, 2024</span>
      </div>
    </div>
  )
}
