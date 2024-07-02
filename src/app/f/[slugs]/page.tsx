import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card'
import type { Metadata, ResolvingMetadata } from 'next'
import prisma from '@/lib/db'
import { notFound } from 'next/navigation'
import CreatePost from './create-post'
import { Post } from '@prisma/client'
import { ChevronUp, MessageCircle } from 'lucide-react'
import { Toggle } from '@/components/ui/toggle'
import Link from 'next/link'

type Props = {
  params: { slugs: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

const getForumDetails = async (slug: string) => {
  const forum = await prisma.forum.findUnique({
    where: {
      slug
    },
    select: {
      name: true,
      tagline: true,
      id: true,
      posts: true
    }
  })

  return forum
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.slugs

  // fetch data
  const forumName = await prisma.forum.findUnique({
    where: {
      slug: id
    },
    select: {
      name: true,
      tagline: true
    }
  })

  // optionally access and extend (rather than replace) parent metadata

  return {
    title: 'Forum | ' + forumName?.name,
    description: forumName?.tagline || 'Suggest a feature that you want.'
  }
}

const PublicForumPage = async ({ params }: { params: { slugs: string } }) => {
  const forum = await getForumDetails(params.slugs)
  if (!forum) {
    notFound()
  }
  return (
    <main className='sm:px-20 px-4 sm:pt-16 pt-4 max-w-7xl mx-auto'>
      <h1 className='capitalize font-semibold text-2xl'>
        {forum?.tagline ? forum.name + ' - ' + forum.tagline : forum.name}
      </h1>
      <div className='md:flex flex-row gap-12 my-6'>
        <Card className='w-full md:w-[400px] h-fit md:sticky md:top-8'>
          <CardHeader>
            <CardTitle>Suggest a Feature</CardTitle>
            <CardDescription>
              Have an idea for how to improve the product? Let us know!
            </CardDescription>
          </CardHeader>
          <CreatePost forumId={forum.id} />
        </Card>

        <div className='h-fit md:w-[calc(100%-448px)] mt-12 md:mt-0 w-full'>
          {forum?.posts.length === 0 && (
            <p className='text-sm text-muted-foreground text-center'>
              No posts yet. Share the Forum with the world.
            </p>
          )}
          <div className='flex flex-col gap-3'>
            {forum?.posts.map((post) => (
              <ForumPost post={post} forumSlug={params.slugs} key={post.id} />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

export default PublicForumPage

const ForumPost = ({ post, forumSlug }: { post: Post; forumSlug: string }) => {
  return (
    <Link
      className='block w-full p-4 border border-border rounded-xl shadow-[0_0px_0px_1px_rgba(0,0,0,0.05)]'
      href={`/f/${forumSlug}/p/${post?.slug}`}
    >
      <h1 className='font-medium'>{post.title}</h1>
      <p className='text-sm text-foreground/80'>{post.description}</p>
      <div className='flex justify-end gap-6 items-center mt-1'>
        <div className='flex items-center gap-2'>
          <Toggle variant='outline' className='h-7 rounded-md px-1'>
            <ChevronUp size={16} />
          </Toggle>
          <p className='text-sm'>{post.upvote}</p>
        </div>
        <div className='flex items-center gap-1'>
          <MessageCircle size={18} strokeWidth={1.5} />
          <p className='text-sm'>{0}</p>
        </div>
      </div>
    </Link>
  )
}
