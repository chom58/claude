// イベント参加登録CRUD API
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import prisma from '@/lib/prisma'
import { authOptions } from '@/lib/auth-config'

// 参加登録作成 (POST /api/registrations)
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { 
      eventId, 
      companyId,
      guestName, 
      guestEmail, 
      guestPhone, 
      guestCompany,
      notes 
    } = data

    if (!eventId) {
      return NextResponse.json(
        { error: 'イベントIDは必須です' },
        { status: 400 }
      )
    }

    // イベント存在チェック
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: {
        _count: {
          select: {
            registrations: {
              where: { status: 'registered' }
            }
          }
        }
      }
    })

    if (!event || !event.isActive) {
      return NextResponse.json(
        { error: 'イベントが見つかりません' },
        { status: 404 }
      )
    }

    // 申し込み期限チェック
    if (event.registrationDeadline && new Date() > event.registrationDeadline) {
      return NextResponse.json(
        { error: '申し込み期限を過ぎています' },
        { status: 400 }
      )
    }

    // 定員チェック
    if (event.maxParticipants && event._count.registrations >= event.maxParticipants) {
      return NextResponse.json(
        { error: 'このイベントは満員です' },
        { status: 400 }
      )
    }

    const session = await getServerSession(authOptions)
    let registrationData: any = {
      eventId,
      notes,
    }

    if (session?.user?.id) {
      // ログインユーザーの場合
      registrationData.userId = session.user.id
      registrationData.companyId = companyId || null

      // 重複チェック（ログインユーザー）
      const existingRegistration = await prisma.eventRegistration.findUnique({
        where: {
          eventId_userId: {
            eventId,
            userId: session.user.id
          }
        }
      })

      if (existingRegistration) {
        return NextResponse.json(
          { error: '既にこのイベントに登録されています' },
          { status: 409 }
        )
      }
    } else {
      // ゲストユーザーの場合
      if (!guestName || !guestEmail) {
        return NextResponse.json(
          { error: 'お名前とメールアドレスは必須です' },
          { status: 400 }
        )
      }

      // メールアドレス形式チェック
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(guestEmail)) {
        return NextResponse.json(
          { error: '有効なメールアドレスを入力してください' },
          { status: 400 }
        )
      }

      // 重複チェック（ゲストユーザー）
      const existingRegistration = await prisma.eventRegistration.findUnique({
        where: {
          eventId_guestEmail: {
            eventId,
            guestEmail
          }
        }
      })

      if (existingRegistration) {
        return NextResponse.json(
          { error: '既にこのメールアドレスで登録されています' },
          { status: 409 }
        )
      }

      registrationData.guestName = guestName
      registrationData.guestEmail = guestEmail
      registrationData.guestPhone = guestPhone
      registrationData.guestCompany = guestCompany
    }

    // 参加登録作成
    const registration = await prisma.eventRegistration.create({
      data: registrationData,
      include: {
        event: {
          select: {
            id: true,
            title: true,
            startDate: true,
            location: true,
          }
        },
        user: session?.user?.id ? {
          select: {
            id: true,
            name: true,
            email: true,
          }
        } : false,
        company: companyId ? {
          select: {
            id: true,
            name: true,
          }
        } : false,
      }
    })

    // イベントの現在参加者数を更新
    await prisma.event.update({
      where: { id: eventId },
      data: {
        currentParticipants: {
          increment: 1
        }
      }
    })

    return NextResponse.json(registration, { status: 201 })

  } catch (error) {
    console.error('Registration POST error:', error)
    return NextResponse.json(
      { error: '参加登録に失敗しました' },
      { status: 500 }
    )
  }
}

// 自分の参加登録一覧取得 (GET /api/registrations)
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: '認証が必要です' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') || 'registered'
    const upcoming = searchParams.get('upcoming') === 'true'

    const where: any = {
      userId: session.user.id,
      status,
    }

    if (upcoming) {
      where.event = {
        startDate: {
          gte: new Date()
        }
      }
    }

    const registrations = await prisma.eventRegistration.findMany({
      where,
      include: {
        event: {
          select: {
            id: true,
            title: true,
            description: true,
            startDate: true,
            endDate: true,
            location: true,
            venue: true,
            eventType: true,
            imageUrl: true,
          }
        },
        company: {
          select: {
            id: true,
            name: true,
            logoUrl: true,
          }
        }
      },
      orderBy: {
        event: {
          startDate: 'asc'
        }
      }
    })

    return NextResponse.json(registrations)

  } catch (error) {
    console.error('Registrations GET error:', error)
    return NextResponse.json(
      { error: 'データの取得に失敗しました' },
      { status: 500 }
    )
  }
}