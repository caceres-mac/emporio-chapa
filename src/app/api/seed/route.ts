import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL || "file:./dev.db"
})

export async function GET() {
  try {
    const password = await bcrypt.hash('123456', 10)

    await prisma.user.upsert({
      where: { email: 'techista@emporio.com' },
      update: {},
      create: {
        email: 'techista@emporio.com',
        password,
        name: 'Martín García',
        role: 'techista',
        points: 2840,
      },
    })

    await prisma.user.upsert({
      where: { email: 'admin@emporio.com' },
      update: {},
      create: {
        email: 'admin@emporio.com',
        password,
        name: 'Admin Emporio',
        role: 'admin',
        points: 0,
      },
    })

    return NextResponse.json({ ok: true, message: 'Usuarios creados correctamente' })
  } catch (error) {
    return NextResponse.json({ ok: false, error: String(error) }, { status: 500 })
  }
}
