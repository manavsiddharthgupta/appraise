import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card'
import Forums from './forums'
import CreateForumForm from './create-forum'

const Dashboard = () => {
  return (
    <main className='sm:px-20 px-4 sm:pt-16 pt-4 max-w-7xl mx-auto'>
      <div className='w-full sm:flex flex-row gap-10'>
        <Card className='sm:w-[350px] w-full h-fit'>
          <CardHeader>
            <CardTitle>Create New Forum</CardTitle>
            <CardDescription>Build what users really want.</CardDescription>
          </CardHeader>
          <CreateForumForm />
        </Card>
        <Forums />
      </div>
    </main>
  )
}

export default Dashboard
