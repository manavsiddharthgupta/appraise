import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { MoveRight } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  const users = [
    {
      url: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
      alt: '@shadcn'
    },
    {
      url: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
      alt: '@shadcn2'
    },
    {
      url: 'https://i.pravatar.cc/150?u=a04258a2462d826712d',
      alt: '@shadcn3'
    },
    {
      url: 'https://i.pravatar.cc/150?u=a04258114e29026708c',
      alt: '@shadcn4-1'
    }
  ]
  return (
    <main className='flex items-center justify-center md:h-[calc(100vh-140px)] h-fit md:pb-0 pb-12'>
      <div className='flex flex-col items-center justify-between gap-5 my-6'>
        <h1 className='text-5xl max-w-2xl text-center font-bold'>
          Build better products with user feedback
        </h1>
        <p className='max-w-lg text-center'>
          Discover, review, and discuss the latest startups, websites, and web
          apps. Share your insights, suggest features, and engage with a
          community of tech enthusiasts and entrepreneurs.
        </p>
        <div className='flex gap-4 items-center'>
          <div className='flex items-center -space-x-1 [&>span]:ring-4 [&>span]:ring-background'>
            {users.map((user) => {
              return (
                <Avatar className='w-7 h-7' key={user.url}>
                  <AvatarImage src={user.url} alt={user.url} />
                  <AvatarFallback>{user.alt}</AvatarFallback>
                </Avatar>
              )
            })}
          </div>
          <p className='text-xs text-foreground/60'>
            300+ entrepreneurs already uses.
          </p>
        </div>
        <Link href='/dashboard'>
          <Button>
            Get Started
            <MoveRight className='ml-1.5' />
          </Button>
        </Link>
      </div>
      <div className='bg-accent-foreground w-full h-12 rounded-t-3xl fixed left-1/2 -translate-x-1/2 bottom-0'></div>
    </main>
  )
}
