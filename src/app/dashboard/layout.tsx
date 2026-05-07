'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  const { data: session } = useSession()
  const router = useRouter()

  const menuItems = [
    { 
      name: 'Inicio', 
      href: '/dashboard', 
      icon: '🏠' 
    },
    { 
      name: 'Pedidos', 
      href: '/dashboard/techista', 
      icon: '📋',
      role: 'techista'
    },
    { 
      name: 'Catálogo', 
      href: '/dashboard/techista', 
      icon: '📦',
      role: 'techista'
    },
    { 
      name: 'Mis Puntos', 
      href: '/dashboard/techista', 
      icon: '⭐',
      role: 'techista'
    },
    { 
      name: 'Beneficios', 
      href: '/dashboard/techista', 
      icon: '🎁',
      role: 'techista'
    },
    { 
      name: 'Usuarios', 
      href: '/dashboard/admin', 
      icon: '👥',
      role: 'admin'
    },
    { 
      name: 'Pedidos', 
      href: '/dashboard/admin', 
      icon: '📋',
      role: 'admin'
    },
    { 
      name: 'Ventas', 
      href: '/dashboard/admin', 
      icon: '💰',
      role: 'admin'
    },
    { 
      name: 'Configuración', 
      href: '/dashboard/admin', 
      icon: '⚙️',
      role: 'admin'
    }
  ]

  const filteredMenuItems = menuItems.filter(item => 
    !item.role || item.role === session?.user?.role
  )

  return (
    <div className="min-h-screen bg-[#111110] flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 border-r border-gray-800 min-h-screen">
        <div className="p-4">
          <Link href="/dashboard" className="flex items-center space-x-3 text-white hover:bg-gray-700 p-2 rounded-lg transition-colors">
            <span className="text-2xl">⚡</span>
            <span className="font-semibold">Emporio Chapa</span>
          </Link>
          
          <div className="mt-8">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Menú Principal
            </h3>
            <nav className="space-y-2">
              {filteredMenuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-gray-700 p-3 rounded-lg transition-colors"
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-white">
              Emporio Chapa
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400">
                {session?.user?.email} ({session?.user?.role})
              </span>
              <div className="w-8 h-8 bg-[#B87333] rounded-full flex items-center justify-center text-white font-semibold">
                {session?.user?.name?.charAt(0)?.toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
