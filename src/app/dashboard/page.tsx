import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { MessageCircle } from 'lucide-react'

const Dashboard = () => {
  return (
    <main className='sm:px-20 px-4 sm:py-16 py-4 max-w-7xl mx-auto'>
      <div className='w-full sm:flex flex-row gap-10'>
        <Card className='sm:w-[350px] w-full h-fit'>
          <CardHeader>
            <CardTitle>Create New Forum</CardTitle>
            <CardDescription>Build what users really want.</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className='grid w-full items-center gap-4'>
                <div className='flex flex-col space-y-1.5'>
                  <Label htmlFor='startup-name'>Startup/website Name</Label>
                  <Input
                    id='startup-name'
                    placeholder='Name of your startup/website'
                  />
                </div>
                <div className='flex flex-col space-y-1.5'>
                  <Label htmlFor='startup-link'>Link</Label>
                  <Input
                    id='startup-link'
                    placeholder='Link your startup/website'
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
            <Button className='w-full'>Create</Button>
          </CardFooter>
        </Card>
        <div className='sm:w-[calc(100%-360px)] w-full sm:mt-0 mt-4'>
          <h1 className='text-lg font-semibold'>2 Forums</h1>
          <div className='w-full lg:flex lg:flex-wrap flex-row justify-between gap-3 py-3'>
            <ForumTitle>Ence - ai powered software</ForumTitle>
            <ForumTitle>Sendo</ForumTitle>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Dashboard

const ForumTitle = ({ children }: { children: string }) => {
  return (
    <div className='lg:w-[49%] w-full border py-2.5 px-4 rounded-md lg:mb-0 mb-2 hover:bg-accent hover:text-accent-foreground cursor-pointer'>
      <h2>{children}</h2>
      <div className='flex justify-end mt-1 gap-1 items-center'>
        <MessageCircle size={18} strokeWidth={1.5} />
        <p className='text-sm'>0</p>
      </div>
    </div>
  )
}
