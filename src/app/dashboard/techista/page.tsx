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
                  ¡Hola, {session.user.name}! 👋
                </h1>
                <p className="text-gray-400">
                  Techista • {session.user.points || 0} puntos disponibles
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-400">
                  {session.user.email} • {session.user.role}
                </div>
                <div className="w-10 h-10 bg-[#B87333] rounded-full flex items-center justify-center text-white font-bold">
                  {session.user.name?.charAt(0)?.toUpperCase()}
                </div>
              </div>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="bg-gradient-to-br from-[#B87333] to-[#B87333]/20 p-6 rounded-lg border border-[#B87333]/30">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold">Compras del Mes</h3>
                  <span className="text-3xl text-white font-bold">12</span>
                </div>
                <div className="text-gray-200">
                  <p className="text-sm mb-2">Total gastado</p>
                  <p className="text-2xl font-bold">$1,250</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-600 to-green-700 p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold">Pedidos Activos</h3>
                  <span className="text-2xl text-white font-bold">8</span>
                </div>
                <div className="text-green-100">
                  <p className="text-sm mb-2">En proceso</p>
                  <p className="text-2xl font-bold">3 pendientes</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold">Puntos Acumulados</h3>
                  <span className="text-2xl text-white font-bold">{session.user.points || 0}</span>
                </div>
                <div className="text-blue-100">
                  <p className="text-sm mb-2">Este mes</p>
                  <p className="text-lg">+{Math.floor((session.user.points || 0) * 0.05)} puntos</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-600 to-purple-700 p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold">Nivel</h3>
                  <span className="text-2xl text-white font-bold">Gold</span>
                </div>
                <div className="text-purple-100">
                  <p className="text-sm mb-2">Rango actual</p>
                  <p className="text-lg">2,840 - 5,000 pts</p>
                </div>
              </div>
            </div>

            {/* Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-4">📋 Últimos Pedidos</h2>
                <div className="space-y-3">
                  {[
                    { id: 'PED-001', product: 'Chapa Galvanizada 0.8mm', status: 'Entregado', date: '2024-01-15' },
                    { id: 'PED-002', product: 'Perfil de Aluminio', status: 'En proceso', date: '2024-01-18' },
                    { id: 'PED-003', product: 'Chapa Pintada 1.2mm', status: 'Pendiente', date: '2024-01-20' }
                  ].map((order) => (
                    <div key={order.id} className="bg-gray-700 rounded p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-white font-medium">{order.product}</p>
                          <p className="text-gray-400 text-sm">{order.date}</p>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          order.status === 'Entregado' ? 'bg-green-600 text-white' :
                          order.status === 'En proceso' ? 'bg-yellow-600 text-white' :
                          'bg-gray-600 text-white'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-4">🎁 Beneficios Canjeables</h2>
                <div className="space-y-3">
                  {[
                    { points: 500, reward: 'Descuento 5% en próxima compra', icon: '🏷️' },
                    { points: 1000, reward: 'Kit de herramientas exclusivo', icon: '🔧' },
                    { points: 2000, reward: 'Capacitación técnica avanzada', icon: '🎓' }
                  ].map((benefit) => (
                    <div key={benefit.points} className="bg-gray-700 rounded-lg p-4 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{benefit.icon}</span>
                        <div>
                          <p className="text-white font-medium">{benefit.reward}</p>
                          <p className="text-[#B87333] font-bold">{benefit.points} pts</p>
                        </div>
                      </div>
                      <button className="bg-[#B87333] hover:bg-[#B87333]/80 text-white px-4 py-2 rounded-lg transition-colors">
                        Canjear
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-4">🔥 Ofertas Activas</h2>
                <div className="space-y-3">
                  {[
                    { title: 'Flash Sale -20%', desc: 'En chapa galvanizada', expires: '2 días' },
                    { title: 'Compra mínima $500', desc: 'Envío gratis', expires: '1 semana' },
                    { title: 'Nuevo producto tech', desc: 'Acceso anticipado', expires: '3 días' }
                  ].map((offer, index) => (
                    <div key={index} className={`rounded-lg p-4 border ${
                      index === 0 ? 'border-red-600 bg-red-900/20' :
                      index === 1 ? 'border-green-600 bg-green-900/20' :
                      'border-gray-600 bg-gray-900/20'
                    }`}>
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-white font-semibold">{offer.title}</h4>
                        <span className="text-xs bg-gray-700 px-2 py-1 rounded text-gray-400">
                          {offer.expires}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm">{offer.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
