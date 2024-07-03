import { Dot, Undo2 } from 'lucide-react'
import type { Metadata, ResolvingMetadata } from 'next'
import BackBtn from '@/components/back-btn'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { notFound } from 'next/navigation'
import prisma from '@/lib/db'
import PostComment from './post-comment'
import UpvoteUi from './upvote'

type Props = {
  params: { id: string; slugs: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

const getPostDetails = async (slug: string) => {
  const post = await prisma.post.findUnique({
    where: {
      slug
    },
    select: {
      id: true,
      title: true,
      description: true,
      createdAt: true,
      slug: true,
      _count: {
        select: {
          upvotes: true
        }
      },
      user: {
        select: {
          name: true,
          image: true
        }
      },
      comments: {
        select: {
          content: true,
          id: true,
          createdAt: true,
          user: {
            select: {
              name: true,
              image: true
            }
          }
        }
      },
      forum: {
        select: {
          name: true,
          tagline: true
        }
      }
    }
  })
  return post
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id
  // fetch data

  const postName = await prisma.post.findUnique({
    where: {
      slug: id
    },
    select: {
      title: true,
      forum: {
        select: {
          name: true
        }
      }
    }
  })

  // optionally access and extend (rather than replace) parent metadata

  return {
    title: postName?.title + ' | ' + postName?.forum?.name,
    description: 'Suggest a feature that you want.'
  }
}

const PostsPage = async ({
  params
}: {
  params: { id: string; slugs: string }
}) => {
  const post = await getPostDetails(params?.id)
  if (!post) {
    notFound()
  }
  return (
    <main className='sm:px-20 px-4 sm:pt-16 pt-4 max-w-7xl mx-auto'>
      <div className='flex gap-4 items-center'>
        <BackBtn variant='secondary' icon={<Undo2 size={20} />} />
        <h1 className='capitalize font-semibold text-2xl'>
          {post?.forum?.name}
        </h1>
      </div>
      <div className='w-full sm:flex flex-row gap-10 py-8'>
        <div className='sm:w-[510px] w-full h-fit'>
          <div className='flex gap-8 py-2'>
            <UpvoteUi upvotes={post?._count.upvotes} />
            <div className='flex flex-col space-y-4'>
              <div className='flex gap-2 flex-col'>
                <h2 className='capitalize font-semibold text-xl'>
                  {post?.title}
                </h2>
                <p>{post?.description}</p>
              </div>
              <UserProfile
                userImage={post?.user?.image}
                userName={post?.user?.name}
                dateCreated={post?.createdAt}
              />
            </div>
          </div>
        </div>
        <div className='sm:w-[calc(100%-550px)] w-full sm:mt-0 mt-4'>
          <PostComment postId={post?.id} />
          {post?.comments.length === 0 && (
            <p className='text-sm mt-10 text-muted-foreground mx-auto'>
              No comment yet.
            </p>
          )}
          <div className='mt-10 gap-8 flex flex-col'>
            {post?.comments.map((comment) => {
              return (
                <Comment
                  content={comment?.content}
                  createdAt={comment?.createdAt}
                  user={comment?.user}
                  key={comment.id}
                />
              )
            })}
          </div>
        </div>
      </div>
    </main>
  )
}

export default PostsPage

const Comment = ({
  content,
  createdAt,
  user
}: {
  createdAt: Date
  user: {
    name: string | null
    image: string | null
  } | null
  content: string
}) => {
  return (
    <div className='w-full space-y-1'>
      <UserProfile
        dateCreated={createdAt}
        userImage={user?.image}
        userName={user?.name}
      />
      <p className='text-foreground/80 text-sm'>{content}</p>
    </div>
  )
}

const UserProfile = ({
  userName,
  userImage,
  dateCreated
}: {
  userName?: string | null
  userImage?: string | null | undefined
  dateCreated: Date
}) => {
  return (
    <div className='flex gap-2 items-center'>
      <Avatar className='h-6 w-6'>
        <AvatarImage src={userImage || ''} alt='@forums' />
        <AvatarFallback className='capitalize'>{'A'}</AvatarFallback>
      </Avatar>
      <div className='flex items-center'>
        <span className='text-xs text-foreground/80'>
          {userName || 'Anonymous'}
        </span>
        <Dot size={14} strokeWidth={3} />
        <span className='text-xs text-foreground/80'>
          {formatDate(dateCreated)}
        </span>
      </div>
    </div>
  )
}

function formatDate(date: Date) {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]
  const day = date.getDate()
  const month = months[date.getMonth()]
  const year = date.getFullYear()
  return `${month} ${day}, ${year}`
}
