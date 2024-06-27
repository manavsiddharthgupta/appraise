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
import { Textarea } from '@/components/ui/textarea'
import type { Metadata, ResolvingMetadata } from 'next'

type Props = {
  params: { slugs: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.slugs

  // fetch data

  // optionally access and extend (rather than replace) parent metadata

  return {
    title: 'Forum | ' + id,
    description: 'Suggest a feature that you want.'
  }
}

const PublicForumPage = ({ params }: { params: { slugs: string } }) => {
  return (
    <main className='sm:px-20 px-4 sm:pt-16 pt-4 max-w-7xl mx-auto'>
      <h1 className='capitalize font-semibold text-2xl'>{params.slugs}</h1>
      <div className='md:flex flex-row gap-12 my-6'>
        <Card className='w-full md:w-[400px] h-fit md:sticky md:top-8'>
          <CardHeader>
            <CardTitle>Suggest a Feature</CardTitle>
            <CardDescription>
              Have an idea for how to improve the product? Let us know!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className='grid w-full items-center gap-4'>
                <div className='flex flex-col space-y-1.5'>
                  <Label htmlFor='title'>Title</Label>
                  <Input
                    id='title'
                    placeholder='Short title for your feature idea'
                  />
                </div>
                <div className='flex flex-col space-y-1.5'>
                  <Label htmlFor='description'>Description</Label>
                  <Textarea
                    id='description'
                    placeholder='Describe your feature idea in more detail'
                    rows={3}
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button className='w-full'>Submit</Button>
          </CardFooter>
        </Card>

        <div className='h-fit md:w-[calc(100%-448px)] mt-12 md:mt-0 w-full'>
          <p className='text-sm text-muted-foreground text-center'>
            No posts yet. Share the Forum with the world.
          </p>
          {/* <div className='block w-full p-6 border border-border rounded-xl shadow-[0_0px_0px_1px_rgba(0,0,0,0.05)]'></div> */}
        </div>
      </div>
    </main>
  )
}

export default PublicForumPage
