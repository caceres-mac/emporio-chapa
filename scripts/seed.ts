import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'

const adapter = new PrismaBetterSqlite3({
  url: 'file:./dev.db'
})

const prisma = new PrismaClient({
  adapter
})

async function main() {
  const password = await bcrypt.hash('123456', 10)
  
  await prisma.user.createMany({
    data: [
      {
        email: 'techista@emporio.com',
        password,
        name: 'Martín García',
        role: 'techista',
        points: 2840,
      },
      {
        email: 'admin@emporio.com',
        password,
        name: 'Admin Emporio',
        role: 'admin',
        points: 0,
      },
    ]
  })
  console.log('Usuarios creados correctamente')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
