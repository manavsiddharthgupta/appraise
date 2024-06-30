'use client'
import React, { useState } from 'react'
import { CardContent, CardFooter } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { mutate } from 'swr'
import { Forum } from '@prisma/client'
import { Loader } from 'lucide-react'

const CreateForumForm = () => {
  const [name, setName] = useState<string>('')
  const [tagline, setTagline] = useState<string | null>(null)
  const [link, setLink] = useState('')
  const [logo, setLogo] = useState<string | null>(null) // IMP: will add later
  const [isCreating, setStatus] = useState(false)

  const validateLink = (url: string) => {
    const pattern = new RegExp(
      '^' + // start of the string
        '(https?:\\/\\/)?' + // optional protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?' + // optional port
        '(\\/[-a-z\\d%_.~+]*)*' + // path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // optional query string
        '(\\#[-a-z\\d_]*)?' + // optional fragment locator
        '$', // end of the string
      'i' // case-insensitive
    )
    return pattern.test(url)
  }

  const formReset = () => {
    setName('')
    setTagline(null)
    setLink('')
    setLogo(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    console.log('Hello')
    e.preventDefault()

    if (!name || !link) {
      toast('Missing Information', {
        description: 'Name and link are required.'
      })
      return
    }

    if (name.length < 3) {
      toast('Invalid Name', {
        description: 'Name should be at least 3 characters long.'
      })
      return
    }

    if (!validateLink(link)) {
      toast('Invalid Link', {
        description: 'The link format is invalid.'
      })
      return
    }

    setStatus(true)
    try {
      const response = await fetch('/api/forums', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, tagline, link, logo })
      })

      const data: {
        ok: boolean
        data?: {
          forum: Forum
        }
        message?: string
        status: number
      } = await response.json()

      console.log(data)
      if (!data.ok) {
        throw new Error('Failed to create forum.')
      }

      mutate('/api/forums')
      toast('Forum Created', {
        description: 'Your forum has been successfully created.'
      })
      formReset()
    } catch (error) {
      toast('Something went wrong', {
        description: (error as Error).message
      })
    }
    setStatus(false)
  }

  return (
    <>
      <CardContent>
        <form>
          <div className='grid w-full items-center gap-4'>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='startup-name'>Startup/website Name</Label>
              <Input
                id='startup-name'
                placeholder='Appraise'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='startup-desc'>Tagline</Label>
              <Input
                id='startup-desc'
                placeholder='Build what users wants'
                value={tagline || ''}
                onChange={(e) => setTagline(e.target.value)}
                required
              />
            </div>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='startup-link'>Link</Label>
              <Input
                id='startup-link'
                placeholder='appraise.in'
                value={link}
                onChange={(e) => setLink(e.target.value)}
                required
              />
            </div>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='startup-logo'>Logo</Label>
              <Input
                id='startup-logo'
                type='file'
                placeholder='Upload your startup/website logo'
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button disabled={isCreating} onClick={handleSubmit} className='w-full'>
          {isCreating && <Loader size={18} className='animate-spin mr-1.5' />}
          Create
        </Button>
      </CardFooter>
    </>
  )
}

export default CreateForumForm
