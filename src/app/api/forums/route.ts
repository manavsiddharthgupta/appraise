import prisma from '@/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'
import { Forum } from '@prisma/client'

export async function GET() {
  const session = await getServerSession(authOptions)
  const email = session?.user?.email
  if (!email) {
    return Response.json({
      ok: false,
      message: 'You are not authorized.',
      status: 401
    })
  }

  try {
    const forums = await prisma.forum.findMany({
      where: {
        user: {
          email: email
        }
      }
    })

    const count = await prisma.forum.count({
      where: {
        user: {
          email: email
        }
      }
    })

    return Response.json({
      ok: true,
      data: {
        forums: forums,
        totalForums: count
      },
      status: 200
    })
  } catch (error) {
    return Response.json({
      ok: false,
      message: 'An error occurred while fetching forum.',
      status: 500
    })
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  const email = session?.user?.email

  if (!email) {
    return Response.json({
      ok: false,
      message: 'You are not authorized.',
      status: 401
    })
  }

  const data: Forum = await request.json()

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: email
      },
      select: {
        id: true,
        name: true
      }
    })
    if (!user?.id) {
      return Response.json({
        ok: false,
        message: 'User not found.',
        status: 404
      })
    }

    const res = await prisma.forum.create({
      data: {
        name: data.name,
        link: data.link,
        tagline: data.tagline,
        logo: data.logo,
        userId: user?.id
      }
    })

    return Response.json({
      ok: true,
      data: { forum: res },
      status: 200
    })
  } catch (error) {
    return Response.json({
      ok: false,
      message: 'An error occurred while creating the forum.',
      status: 500
    })
  }
}
