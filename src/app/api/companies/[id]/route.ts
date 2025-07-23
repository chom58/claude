// 個別会社情報CRUD API
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import prisma from '@/lib/prisma'
import { authOptions } from '@/lib/auth-config'

// 会社詳細取得 (GET /api/companies/[id])
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const company = await prisma.company.findUnique({
      where: { 
        id: params.id,
        isActive: true 
      },
      include: {
        members: {
          where: { isActive: true },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
              }
            }
          },
          orderBy: { joinedAt: 'asc' }
        },
        eventRegistrations: {
          include: {
            event: {
              select: {
                id: true,
                title: true,
                startDate: true,
                eventType: true,
              }
            }
          },
          orderBy: { registeredAt: 'desc' },
          take: 5
        }
      }
    })

    if (!company) {
      return NextResponse.json(
        { error: '会社が見つかりません' },
        { status: 404 }
      )
    }

    return NextResponse.json(company)

  } catch (error) {
    console.error('Company GET error:', error)
    return NextResponse.json(
      { error: 'データの取得に失敗しました' },
      { status: 500 }
    )
  }
}

// 会社情報更新 (PUT /api/companies/[id])
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: '認証が必要です' },
        { status: 401 }
      )
    }

    // 権限チェック（会社のメンバーかつ管理者権限）
    const memberCheck = await prisma.companyMember.findFirst({
      where: {
        companyId: params.id,
        userId: session.user.id,
        role: { in: ['admin', 'manager'] },
        isActive: true
      }
    })

    if (!memberCheck) {
      return NextResponse.json(
        { error: '編集権限がありません' },
        { status: 403 }
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

    const updatedCompany = await prisma.company.update({
      where: { id: params.id },
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
      },
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
        }
      }
    })

    return NextResponse.json(updatedCompany)

  } catch (error) {
    console.error('Company PUT error:', error)
    return NextResponse.json(
      { error: '会社情報の更新に失敗しました' },
      { status: 500 }
    )
  }
}

// 会社削除 (DELETE /api/companies/[id])
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: '認証が必要です' },
        { status: 401 }
      )
    }

    // 権限チェック（会社の管理者のみ）
    const memberCheck = await prisma.companyMember.findFirst({
      where: {
        companyId: params.id,
        userId: session.user.id,
        role: 'admin',
        isActive: true
      }
    })

    if (!memberCheck) {
      return NextResponse.json(
        { error: '削除権限がありません' },
        { status: 403 }
      )
    }

    // 論理削除（isActiveをfalseに）
    await prisma.company.update({
      where: { id: params.id },
      data: { isActive: false }
    })

    return NextResponse.json({ message: '会社を削除しました' })

  } catch (error) {
    console.error('Company DELETE error:', error)
    return NextResponse.json(
      { error: '会社の削除に失敗しました' },
      { status: 500 }
    )
  }
}