'use client'
import Navbar from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'

export default function Home() {
  return (
    <>
      <Navbar />
      <main className='flex flex-col items-center justify-between p-24'>
        <Button onClick={() => signOut()}>Sign Out</Button>
        <p>Appraise</p>
      </main>
    </>
  )
}
