import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/theme-toggle'
import { CreditCard, LayoutDashboard, LogOut, Rocket, User } from 'lucide-react'
import { useSession, signOut } from 'next-auth/react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from 'sonner'
import { Session } from 'next-auth'
import Link from 'next/link'

const Navbar = () => {
  const { data: session, status } = useSession()
  return (
    <nav className='flex justify-between items-center px-6 py-3 max-w-7xl mx-auto'>
      <h1 className='font-semibold text-2xl'>ₐₚₚᵣₐᵢₛₑ</h1>
      <div className='flex items-center gap-4'>
        {status === 'loading' ? (
          <ProfileSkeleton />
        ) : status === 'authenticated' ? (
          <AccountMenu session={session} />
        ) : (
          <Button variant='outline' asChild>
            <Link href='/auth/signin'>SignIn</Link>
          </Button>
        )}
        <ModeToggle />
      </div>
    </nav>
  )
}

export default Navbar

export function AccountMenu({ session }: { session: Session }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline'>
          <div className='flex items-center space-x-2'>
            <Avatar className='h-7 w-7'>
              <AvatarImage
                src={session.user?.image || ''}
                alt={session.user?.email || '@profile'}
              />
              <AvatarFallback>{session.user?.name?.slice(0, 1)}</AvatarFallback>
            </Avatar>
            <p>{session.user?.name}</p>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href='/dashboard'>
            <LayoutDashboard className='mr-2 h-4 w-4' />
            <span>Dashboard</span>
            <DropdownMenuShortcut>⇧⌘D</DropdownMenuShortcut>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() =>
              toast('Feature Coming Soon', {
                description: 'We are working hard to bring you this feature.'
              })
            }
          >
            <User className='mr-2 h-4 w-4' />
            <span>Profile</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              toast('Billing Update', {
                description:
                  'Our current features are free, but premium features will be available soon.'
              })
            }
          >
            <CreditCard className='mr-2 h-4 w-4' />
            <span>Billing</span>
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut className='mr-2 h-4 w-4' />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function ProfileSkeleton() {
  return (
    <div className='flex items-center space-x-2 py-[5px] px-3 rounded-md border border-border'>
      <Skeleton className='h-7 w-7 rounded-full' />
      <Skeleton className='h-5 w-24' />
    </div>
  )
}
