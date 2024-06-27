import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'forums | appraise',
  description: 'Build what users really want.'
}

export default function ForumsLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
