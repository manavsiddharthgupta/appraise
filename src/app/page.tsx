import Navbar from '@/components/navbar'
import { Input } from '@/components/ui/input'

export default function Home() {
  return (
    <>
      <Navbar />
      <main className='flex flex-col items-center justify-between p-24'>
        <Input
          type='text'
          placeholder='Enter username from Instagram or Youtube'
          className='h-16 w-full max-w-xl pl-6 rounded-full border-2 border-border text-lg'
        />
      </main>
    </>
  )
}
