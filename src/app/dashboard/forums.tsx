'use client'
import useSWR from 'swr'
import { MessageCircle } from 'lucide-react'
import { Forum } from '@prisma/client'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'

type Forum_c = {
  _count: {
    posts: number
  }
} & Forum

const fetcher = (url: string | URL | Request) =>
  fetch(url).then((r) => r.json())

const Forums = () => {
  const { data, error, isLoading } = useSWR('/api/forums', fetcher)
  const response: {
    data?: {
      forums: Forum_c[]
      totalForums: number
    }
    message?: string
    status: number
    ok: boolean
  } = data

  if (isLoading) {
    return (
      <OuterCard>
        <ForumsSkeleton />
      </OuterCard>
    )
  }

  if (error) {
    return (
      <OuterCard>
        <p className='text-red-500 text-sm'>
          Failed to load forums. Please try again later.
        </p>
      </OuterCard>
    )
  }

  if (response.status !== 200) {
    return (
      <OuterCard>
        <p className='text-red-500 text-sm'>{response.message}</p>
      </OuterCard>
    )
  }

  return (
    <OuterCard>
      <h1 className='text-lg font-semibold'>
        {response?.data?.totalForums} Forums
      </h1>
      {response?.data?.totalForums === 0 ? (
        <p className='py-3 text-muted-foreground text-sm'>
          No available forums, please create one.
        </p>
      ) : (
        <div className='w-full lg:flex lg:flex-wrap flex-row justify-between gap-3 py-3'>
          {response?.data?.forums.map((forum) => (
            <ForumCard
              key={forum.id}
              id={forum.id}
              name={forum.name}
              postsCount={forum._count.posts}
              tagline={forum.tagline}
            />
          ))}
        </div>
      )}
    </OuterCard>
  )
}

export default Forums

const ForumsSkeleton = () => {
  return (
    <>
      <Skeleton className='h-7 w-20' />
      <div className='w-full lg:flex lg:flex-wrap flex-row justify-between gap-3 py-3'>
        <ForumCardSkeleton />
        <ForumCardSkeleton />
        <ForumCardSkeleton />
      </div>
    </>
  )
}

const ForumCardSkeleton = () => {
  return (
    <div className='lg:w-[49%] w-full rounded-md lg:mb-0 mb-2'>
      <Skeleton className='h-[70px] w-full' />
    </div>
  )
}

const ForumCard = ({
  id,
  name,
  tagline,
  postsCount
}: {
  id: string
  name: string
  tagline: string | null
  postsCount: number
}) => {
  return (
    <Link
      className='block lg:w-[49%] w-full border py-2.5 px-4 rounded-md lg:mb-0 mb-2 hover:bg-accent hover:text-accent-foreground cursor-pointer'
      href={`dashboard/forum/${id}`}
    >
      <h2>{tagline ? name + ' - ' + tagline : name}</h2>
      <div className='flex justify-end mt-1 gap-1 items-center'>
        <MessageCircle size={18} strokeWidth={1.5} />
        <p className='text-sm'>{postsCount}</p>
      </div>
    </Link>
  )
}

const OuterCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='sm:w-[calc(100%-360px)] w-full sm:mt-0 mt-4'>
      {children}
    </div>
  )
}
