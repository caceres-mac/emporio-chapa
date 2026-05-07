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
    <div className="min-h-screen bg-[#111110]">
      <div className="flex">
        {/* Sidebar will be handled by layout */}
        
        {/* Main Content */}
        <div className="flex-1">
          {/* Header with user info */}
          <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Panel Administrativo 👥
                </h1>
                <p className="text-gray-400">
                  {session.user.email} • Administrador
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-400">
                  Sistema Emporio Chapa
                </div>
                <div className="w-10 h-10 bg-[#B87333] rounded-full flex items-center justify-center text-white font-bold">
                  {session.user.name?.charAt(0)?.toUpperCase()}
                </div>
              </div>
            </div>
          </div>

          {/* Admin Metrics */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-lg border border-blue-500">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold">Usuarios Registrados</h3>
                  <span className="text-3xl text-white font-bold">248</span>
                </div>
                <div className="text-blue-100">
                  <p className="text-sm mb-2">Total activos</p>
                  <p className="text-2xl font-bold">12 nuevos este mes</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-600 to-green-700 p-6 rounded-lg border border-green-500">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold">Pedidos del Mes</h3>
                  <span className="text-3xl text-white font-bold">156</span>
                </div>
                <div className="text-green-100">
                  <p className="text-sm mb-2">Total procesados</p>
                  <p className="text-2xl font-bold">+23% vs mes anterior</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-600 to-purple-700 p-6 rounded-lg border border-purple-500">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold">Ventas Totales</h3>
                  <span className="text-3xl text-white font-bold">$48,750</span>
                </div>
                <div className="text-purple-100">
                  <p className="text-sm mb-2">Ingresos del mes</p>
                  <p className="text-2xl font-bold">+15% crecimiento</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-600 to-orange-700 p-6 rounded-lg border border-orange-500">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold">Puntos Emitidos</h3>
                  <span className="text-3xl text-white font-bold">3,420</span>
                </div>
                <div className="text-orange-100">
                  <p className="text-sm mb-2">Recompensas entregadas</p>
                  <p className="text-2xl font-bold">A techistas leales</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Acciones Rápidas</h2>
                <div className="space-y-3">
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition-colors">
                    👥 Ver Todos los Usuarios
                  </button>
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg transition-colors">
                    🎁 Crear Promoción
                  </button>
                  <button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg transition-colors">
                    📊 Generar Reporte
                  </button>
                </div>
              </div>

              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Configuración</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Modo Mantenimiento</span>
                    <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors">
                      Activar
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Notificaciones Push</span>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors">
                      Activar
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Backup Automático</span>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors">
                      Configurar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
