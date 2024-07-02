import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Label } from '@/components/ui/label'
import { ChevronUp, LinkIcon, Loader, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import prisma from '@/lib/db'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import ForumLinks, { PostLink } from './forum-link'
import { Post } from '@prisma/client'

const getForumDetails = (id: string) => {
  const forums = prisma.forum.findUnique({
    where: {
      id
    },
    select: {
      id: true,
      name: true,
      link: true,
      logo: true,
      slug: true,
      tagline: true,
      posts: {
        select: {
          id: true,
          title: true,
          description: true,
          slug: true,
          _count: {
            select: {
              comments: true,
              upvotes: true
            }
          }
        }
      }
    }
  })

  return forums
}

export default async function ForumDashboardPage({
  params
}: {
  params: { slugs: string }
}) {
  const forumDetails = await getForumDetails(params.slugs)
  if (!forumDetails) {
    notFound()
  }

  return (
    <main className='sm:px-20 px-4 sm:pt-16 pt-4 max-w-7xl mx-auto'>
      <div className='md:flex flex-row gap-16'>
        <div className='md:w-[400px] h-fit md:sticky md:top-8'>
          <Suspense
            fallback={
              <Loader size={18} className='animate-spin mx-auto my-4' />
            }
          >
            <ForumDetails
              name={forumDetails?.name}
              link={forumDetails?.link}
              logo={forumDetails?.logo}
              slug={forumDetails?.slug}
              tagline={forumDetails?.tagline}
              postCount={forumDetails?.posts.length}
            />
          </Suspense>
        </div>
        <div className='h-fit md:w-[calc(100%-464px)] mt-12 md:mt-0 w-full'>
          <ForumPosts
            posts={forumDetails?.posts}
            forumSlug={forumDetails?.slug}
          />
        </div>
      </div>
    </main>
  )
}

const ForumDetails = async ({
  name,
  tagline,
  logo,
  link,
  slug,
  postCount
}: {
  name: string
  tagline: string | null
  logo: string | null
  link: string
  slug: string
  postCount: number
}) => {
  return (
    <>
      <div className='flex gap-4 items-center'>
        <Avatar className='h-10 w-10'>
          <AvatarImage src={logo || ''} alt='@forums' />
          <AvatarFallback className='capitalize'>
            {name?.slice(0, 1)}
          </AvatarFallback>
        </Avatar>
        <h1 className='sm:text-lg font-medium truncate'>
          {tagline ? name + ' - ' + tagline : name}
        </h1>
      </div>
      <div className='flex gap-3 text-sm ml-14 mt-1'>
        <div className='flex gap-1 items-center'>
          <span className='font-medium'>{postCount}</span>
          <span className='text-muted-foreground'>Suggestions</span>
        </div>
        <div>
          <Link
            className='flex gap-1 items-center'
            href={link}
            as={link}
            target='_blank'
          >
            <LinkIcon size={12} strokeWidth={3} />
            <span className='text-muted-foreground'>Link</span>
          </Link>
        </div>
      </div>
      <div className='flex flex-col space-y-1.5 mt-12'>
        <Label>Forum Link</Label>
        <ForumLinks slug={slug} />
      </div>
    </>
  )
}

const ForumPosts = ({
  posts,
  forumSlug
}: {
  posts: {
    id: string
    slug: string
    _count: {
      comments: number
      upvotes: number
    }
    title: string
    description: string
  }[]
  forumSlug: string
}) => {
  return (
    <>
      {posts.length === 0 && (
        <p className='text-sm text-muted-foreground text-center'>
          No posts yet. Share the Forum with the world.
        </p>
      )}
      <div className='flex flex-col gap-3'>
        {posts.map((post) => (
          <ForumPost post={post} forumSlug={forumSlug} key={post.id} />
        ))}
      </div>
    </>
  )
}

const ForumPost = ({
  post,
  forumSlug
}: {
  post: {
    id: string
    slug: string
    _count: {
      comments: number
      upvotes: number
    }
    title: string
    description: string
  }
  forumSlug: string
}) => {
  return (
    <div className='block w-full p-4 border border-border rounded-xl shadow-[0_0px_0px_1px_rgba(0,0,0,0.05)]'>
      <h1 className='font-medium'>{post.title}</h1>
      <p className='text-sm text-foreground/80'>{post.description}</p>
      <div className='flex justify-end gap-6 items-center mt-1.5'>
        <PostLink forumSlug={forumSlug} postSlug={post?.slug} />
        <div className='flex items-center gap-1.5'>
          <div className='h-7 flex items-center rounded-md px-1 border border-border'>
            <ChevronUp size={16} />
          </div>
          <p className='text-sm'>{post?._count.upvotes}</p>
        </div>
        <div className='flex items-center gap-1'>
          <MessageCircle size={18} strokeWidth={1.5} />
          <p className='text-sm'>{post?._count.comments}</p>
        </div>
      </div>
    </div>
  )
}
