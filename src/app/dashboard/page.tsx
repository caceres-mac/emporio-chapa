'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

export default function DashboardPage() {
  const router = useRouter()
  const { data: session } = useSession()

  useEffect(() => {
    if (!session) {
      router.push('/login')
      return
    }

    const userRole = session.user?.role
    if (userRole === 'admin') {
      router.push('/dashboard/admin')
    } else if (userRole === 'techista') {
      router.push('/dashboard/techista')
    } else {
      router.push('/login')
    }
  }, [session, router])

  return (
    <div className="min-h-screen bg-[#111110] flex items-center justify-center">
      <div className="text-white">
        Redirigiendo al dashboard...
      </div>
    </div>
  )
}
