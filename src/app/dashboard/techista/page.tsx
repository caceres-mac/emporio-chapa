'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function TechistaDashboardPage() {
  const router = useRouter()
  const { data: session } = useSession()

  if (!session) {
    router.push('/login')
    return null
  }

  if (session.user?.role !== 'techista') {
    router.push('/dashboard')
    return null
  }

  return (
    <div className="min-h-screen bg-[#111110] p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gray-900 border border-[#B87333]/30 rounded-lg p-6 shadow-2xl">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-[#B87333] mb-2">
              Panel Techista
            </h1>
            <div className="text-gray-400 space-y-2">
              <p>Email: {session.user.email}</p>
              <p>Rol: {session.user.role}</p>
              <p>Puntos: {session.user.points || 0}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Mis Pedidos</h2>
              <p className="text-gray-400">Ver y gestionar mis pedidos</p>
            </div>
            
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Catálogo</h2>
              <p className="text-gray-400">Explorar productos disponibles</p>
            </div>
            
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Mis Puntos</h2>
              <p className="text-gray-400">Ver y canjear puntos disponibles</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
