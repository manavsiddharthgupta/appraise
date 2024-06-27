import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'

import { Label } from '@/components/ui/label'
import { Copy, ExternalLink, LinkIcon } from 'lucide-react'
import Link from 'next/link'

export default function ForumDashboardPage({
  params
}: {
  params: { slugs: string }
}) {
  return (
    <main className='sm:px-20 px-4 sm:pt-16 pt-4 max-w-7xl mx-auto'>
      <div className='md:flex flex-row gap-12'>
        <div className='md:w-[400px] h-fit md:sticky md:top-8'>
          <div className='flex gap-4 items-center'>
            <Avatar className='h-10 w-10'>
              <AvatarImage src='' alt='@forums' />
              <AvatarFallback className='capitalize'>
                {params.slugs.slice(0, 1)}
              </AvatarFallback>
            </Avatar>
            <h1 className='sm:text-lg font-medium truncate'>
              Ence - streamline invoicing process
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
                href='https://ence.in'
                as='https://ence.in'
                target='_blank'
              >
                <LinkIcon size={12} strokeWidth={3} />
                <span className='text-muted-foreground'>Link</span>
              </Link>
            </div>
          </div>
          <div className='flex flex-col space-y-1.5 mt-12'>
            <Label>Forum Link</Label>
            <div className='px-4 py-1.5 border rounded-md bg-accent flex justify-between items-center'>
              <p className='font-medium'>http://localhost:3000/f/ence</p>
              <div className='flex gap-3 items-center'>
                <ForumTooltip tipContent='Copy link'>
                  <Copy
                    className='cursor-pointer text-foreground/70 hover:text-foreground'
                    strokeWidth={2.5}
                    size={18}
                  />
                </ForumTooltip>
                <ForumTooltip tipContent='View Forum'>
                  <ExternalLink
                    className='cursor-pointer text-foreground/70 hover:text-foreground'
                    strokeWidth={2.5}
                    size={18}
                  />
                </ForumTooltip>
              </div>
            </div>
          </div>
        </div>
        <div className='h-fit md:w-[calc(100%-448px)] mt-12 md:mt-0 w-full'>
          <p className='text-sm text-muted-foreground text-center'>
            No posts yet. Share your Forum with the world.
          </p>
          {/* <div className='block w-full p-6 border border-border rounded-xl shadow-[0_0px_0px_1px_rgba(0,0,0,0.05)]'></div> */}
        </div>
      </div>
    </main>
  )
}

export function ForumTooltip({
  children,
  tipContent
}: {
  children: React.ReactNode
  tipContent: string
}) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
          <p>{tipContent}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
