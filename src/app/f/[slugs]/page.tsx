import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card'
import type { Metadata, ResolvingMetadata } from 'next'
import { db } from '@/lib/db'
import { notFound } from 'next/navigation'
import CreatePost from './create-post'
import ForumPost from './forum-post'

type Props = {
  params: { slugs: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

const getForumDetails = async (slug: string) => {
  const forum = await db.forum.findUnique({
    where: {
      slug
    },
    select: {
      name: true,
      tagline: true,
      id: true,
      posts: {
        include: {
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

  return forum
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.slugs

  // fetch data
  const forumName = await db.forum.findUnique({
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
