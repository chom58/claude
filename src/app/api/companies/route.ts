// 会社情報CRUD API
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import prisma from '@/lib/prisma'
import { authOptions } from '@/lib/auth-config'

// 会社一覧取得 (GET /api/companies)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''
    const specialty = searchParams.get('specialty') || ''

    const skip = (page - 1) * limit

    // 検索条件の構築
    const where: any = {
      isActive: true,
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ]
    }

    if (specialty) {
      where.specialties = {
        has: specialty
      }
    }

    // データ取得
    const [companies, total] = await Promise.all([
      prisma.company.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          members: {
            where: { isActive: true },
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                }
              }
            }
          },
          _count: {
            select: {
              members: {
                where: { isActive: true }
              }
            }
          }
        }
      }),
      prisma.company.count({ where })
    ])

    return NextResponse.json({
      companies,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })

  } catch (error) {
    console.error('Companies GET error:', error)
    return NextResponse.json(
      { error: 'データの取得に失敗しました' },
      { status: 500 }
    )
  }
}

// 会社新規作成 (POST /api/companies)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: '認証が必要です' },
        { status: 401 }
      )
    }

    const data = await request.json()
    const {
      name,
      description,
      website,
      email,
      phone,
      address,
      logoUrl,
      foundedYear,
      employeeCount,
      specialties,
      services
    } = data

    // バリデーション
    if (!name || name.trim().length === 0) {
      return NextResponse.json(
        { error: '会社名は必須です' },
        { status: 400 }
      )
    }

    // 会社作成
    const company = await prisma.company.create({
      data: {
        name: name.trim(),
        description,
        website,
        email,
        phone,
        address,
        logoUrl,
        foundedYear,
        employeeCount,
        specialties: specialties || [],
        services: services || [],
        members: {
          create: {
            userId: session.user.id,
            role: 'admin',
            position: '代表'
          }
        }
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              }
            }
          }
        }
      }
    })

    return NextResponse.json(company, { status: 201 })

  } catch (error) {
    console.error('Company POST error:', error)
    return NextResponse.json(
      { error: '会社の作成に失敗しました' },
      { status: 500 }
    )
  }
}