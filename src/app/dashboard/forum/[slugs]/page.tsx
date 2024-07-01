import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Label } from '@/components/ui/label'
import { LinkIcon, Loader } from 'lucide-react'
import Link from 'next/link'
import prisma from '@/lib/db'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import ForumLinks from './forum-link'

const getForumDetails = (id: string) => {
  const forums = prisma.forum.findFirst({
    where: {
      id
    }
  })

  return forums
}

export default async function ForumDashboardPage({
  params
}: {
  params: { slugs: string }
}) {
  return (
    <main className='sm:px-20 px-4 sm:pt-16 pt-4 max-w-7xl mx-auto'>
      <div className='md:flex flex-row gap-12'>
        <div className='md:w-[400px] h-fit md:sticky md:top-8'>
          <Suspense
            fallback={
              <Loader size={18} className='animate-spin mx-auto my-4' />
            }
          >
            <ForumDetails id={params.slugs} />
          </Suspense>
        </div>
        <div className='h-fit md:w-[calc(100%-448px)] mt-12 md:mt-0 w-full'>
          <ForumPosts />
        </div>
      </div>
    </main>
  )
}

const ForumDetails = async ({ id }: { id: string }) => {
  const forumDetails = await getForumDetails(id)
  if (!forumDetails) {
    notFound()
  }

  return (
    <>
      <div className='flex gap-4 items-center'>
        <Avatar className='h-10 w-10'>
          <AvatarImage src={forumDetails?.logo || ''} alt='@forums' />
          <AvatarFallback className='capitalize'>
            {forumDetails?.name?.slice(0, 1)}
          </AvatarFallback>
        </Avatar>
        <h1 className='sm:text-lg font-medium truncate'>
          {forumDetails?.tagline
            ? forumDetails.name + ' - ' + forumDetails.tagline
            : forumDetails.name}
        </h1>
      </div>
      <div className='flex gap-3 text-sm ml-14 mt-1'>
        <div className='flex gap-1 items-center'>
          <span className='font-medium'>0</span>
          <span className='text-muted-foreground'>Suggestions</span>
        </div>
        <div>
          <Link
            className='flex gap-1 items-center'
            href={forumDetails.link}
            as={forumDetails.link}
            target='_blank'
          >
            <LinkIcon size={12} strokeWidth={3} />
            <span className='text-muted-foreground'>Link</span>
          </Link>
        </div>
      </div>
      <div className='flex flex-col space-y-1.5 mt-12'>
        <Label>Forum Link</Label>
        <ForumLinks slug={forumDetails?.slug} />
      </div>
    </>
  )
}

const ForumPosts = () => {
  return (
    <>
      <p className='text-sm text-muted-foreground text-center'>
        No posts yet. Share your Forum with the world.
      </p>
      {/* <div className='block w-full p-6 border border-border rounded-xl shadow-[0_0px_0px_1px_rgba(0,0,0,0.05)]'></div> */}
    </>
  )
}
