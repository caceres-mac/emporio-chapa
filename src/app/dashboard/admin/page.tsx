'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function AdminDashboardPage() {
  const router = useRouter()
  const { data: session } = useSession()

  if (!session) {
    router.push('/login')
    return null
  }

  if (session.user?.role !== 'admin') {
    router.push('/dashboard')
    return null
  }

  return (
    <div className="min-h-screen bg-[#111110] p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gray-900 border border-[#B87333]/30 rounded-lg p-6 shadow-2xl">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-[#B87333] mb-2">
              Panel Admin
            </h1>
            <div className="text-gray-400">
              <p>Email: {session.user.email}</p>
              <p>Rol: {session.user.role}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Usuarios</h2>
              <p className="text-gray-400">Gestionar usuarios del sistema</p>
            </div>
            
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Pedidos</h2>
              <p className="text-gray-400">Ver y gestionar pedidos</p>
            </div>
            
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Configuración</h2>
              <p className="text-gray-400">Configuración general del sistema</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
