import { Post } from '@prisma/client'

export async function POST(request: Request) {
  const data: Post = await request.json()

  try {
    const res = await prisma.post.create({
      data: {
        title: data.title,
        description: data.description,
        slug: data.slug,
        forumId: data.forumId
      }
    })

    return Response.json({
      ok: true,
      data: { post: res },
      status: 200
    })
  } catch (error) {
    return Response.json({
      ok: false,
      message: 'An error occurred while creating the post.',
      status: 500
    })
  }
}
