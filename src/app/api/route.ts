export const dynamic = 'force-dynamic'
export async function GET(request: Request) {
  console.log('sdh----------y')
  let channelId = 'UCX6OQ3DkcsbYNE6H8uQQuVA'
  const url = 'https://youtubeanalytics.googleapis.com/v2/reports'
  const res = await fetch(url)
  const data = await res.json()

  return Response.json({
    ok: true,
    data: data,
    status: 201
  })
}
