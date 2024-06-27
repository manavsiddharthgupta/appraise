import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'dashboard | appraise',
  description: 'Create forums for your startups or websites'
}

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
