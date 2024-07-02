'use client'
import { Copy, ExternalLink } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { toast } from 'sonner'

const ForumLinks = ({ slug }: { slug: string }) => {
  const link = `${process.env.NEXT_PUBLIC_API_URL}/f/${slug}`

  const handleCopy = () => {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        toast('Link copied to clipboard!')
      })
      .catch((err) => {
        toast('Failed to copy, ' + err)
      })
  }

  return (
    <div className='px-4 py-1.5 border rounded-md bg-accent flex justify-between items-center'>
      <p className='font-medium'>{link}</p>
      <div className='flex gap-3 items-center'>
        <ForumTooltip tipContent='Copy link'>
          <Copy
            className='cursor-pointer text-foreground/70 hover:text-foreground'
            strokeWidth={2.5}
            size={18}
            onClick={handleCopy}
          />
        </ForumTooltip>
        <ForumTooltip tipContent='View Forum'>
          <ExternalLink
            className='cursor-pointer text-foreground/70 hover:text-foreground'
            strokeWidth={2.5}
            size={18}
            onClick={() => window.open(link, '_blank')}
          />
        </ForumTooltip>
      </div>
    </div>
  )
}

export default ForumLinks

function ForumTooltip({
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

export const PostLink = ({
  forumSlug,
  postSlug
}: {
  forumSlug: string
  postSlug: string
}) => {
  const link = `${process.env.NEXT_PUBLIC_API_URL}/f/${forumSlug}/p/${postSlug}`
  return (
    <ForumTooltip tipContent='View Post'>
      <ExternalLink
        className='cursor-pointer'
        strokeWidth={1.5}
        size={18}
        onClick={() => window.open(link, '_blank')}
      />
    </ForumTooltip>
  )
}
