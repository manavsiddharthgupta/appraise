'use client'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const BackBtn = ({
  variant,
  icon
}: {
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
    | null
    | undefined
  icon: React.ReactNode
}) => {
  const router = useRouter()
  return (
    <Button
      onClick={() => {
        router.back()
      }}
      variant={variant}
    >
      {icon}
    </Button>
  )
}

export default BackBtn
