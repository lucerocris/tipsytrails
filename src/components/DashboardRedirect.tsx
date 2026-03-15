import { redirect } from 'next/navigation'

export function DashboardRedirect() {
  redirect('/admin/command-center')
}
