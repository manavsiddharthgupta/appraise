import { getServerSession } from 'next-auth'
import { authOptions } from '@/utils/authoption'
import { Comment } from '@prisma/client'
import { db } from '@/lib/db'

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  const email = session?.user?.email
  let userId: string | null = null
  if (email) {
    const user = await db.user.findFirst({
      where: {
        email: email
      },
      select: {
        id: true
      }
    })
    userId = user?.id ?? null
  }
  const data: Comment = await request.json()

  try {
    const res = await db.comment.create({
      data: {
        content: data.content,
        postId: data.postId,
        userId: userId
      }
    })

    return Response.json({
      ok: true,
      data: { comment: res },
      status: 200
    })
  } catch (error) {
    return Response.json({
      ok: false,
      message: 'An error occurred while creating the comment.',
      status: 500
    })
  }
}
