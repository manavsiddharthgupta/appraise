import { ModeToggle } from '@/components/theme-toggle'

const Navbar = () => {
  return (
    <nav className='flex justify-between items-center px-6 py-3 max-w-7xl mx-auto'>
      <h1 className='font-semibold text-2xl'>ₐₚₚᵣₐᵢₛₑ</h1>
      <div className='flex items-center gap-2'>
        <ModeToggle />
      </div>
    </nav>
  )
}

export default Navbar
