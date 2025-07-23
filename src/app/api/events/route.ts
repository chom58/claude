// イベント情報CRUD API
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import prisma from '@/lib/prisma'
import { authOptions } from '@/lib/auth-config'

// イベント一覧取得 (GET /api/events)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''
    const eventType = searchParams.get('eventType') || ''
    const upcoming = searchParams.get('upcoming') === 'true'

    const skip = (page - 1) * limit

    // 検索条件の構築
    const where: any = {
      isActive: true,
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { location: { contains: search, mode: 'insensitive' } },
      ]
    }

    if (eventType) {
      where.eventType = eventType
    }

    if (upcoming) {
      where.startDate = {
        gte: new Date()
      }
    }

    // データ取得
    const [events, total] = await Promise.all([
      prisma.event.findMany({
        where,
        skip,
        take: limit,
        orderBy: { startDate: 'asc' },
        include: {
          registrations: {
            where: { status: 'registered' },
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                }
              },
              company: {
                select: {
                  id: true,
                  name: true,
                  logoUrl: true,
                }
              }
            }
          },
          _count: {
            select: {
              registrations: {
                where: { status: 'registered' }
              }
            }
          }
        }
      }),
      prisma.event.count({ where })
    ])

    // 現在の参加者数を更新
    for (const event of events) {
      if (event.currentParticipants !== event._count.registrations) {
        await prisma.event.update({
          where: { id: event.id },
          data: { currentParticipants: event._count.registrations }
        })
        event.currentParticipants = event._count.registrations
      }
    }

    return NextResponse.json({
      events,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })

  } catch (error) {
    console.error('Events GET error:', error)
    return NextResponse.json(
      { error: 'データの取得に失敗しました' },
      { status: 500 }
    )
  }
}

// イベント新規作成 (POST /api/events)
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
      title,
      description,
      startDate,
      endDate,
      location,
      venue,
      maxParticipants,
      eventType,
      tags,
      imageUrl,
      price,
      currency,
      registrationDeadline
    } = data

    // バリデーション
    if (!title || title.trim().length === 0) {
      return NextResponse.json(
        { error: 'イベントタイトルは必須です' },
        { status: 400 }
      )
    }

    if (!startDate) {
      return NextResponse.json(
        { error: '開始日時は必須です' },
        { status: 400 }
      )
    }

    // 日付バリデーション
    const start = new Date(startDate)
    const end = endDate ? new Date(endDate) : null
    
    if (start < new Date()) {
      return NextResponse.json(
        { error: '開始日時は現在時刻より後に設定してください' },
        { status: 400 }
      )
    }

    if (end && end <= start) {
      return NextResponse.json(
        { error: '終了日時は開始日時より後に設定してください' },
        { status: 400 }
      )
    }

    const event = await prisma.event.create({
      data: {
        title: title.trim(),
        description,
        startDate: start,
        endDate: end,
        location,
        venue,
        maxParticipants,
        eventType: eventType || 'networking',
        tags: tags || [],
        imageUrl,
        price: price || 0,
        currency: currency || 'JPY',
        registrationDeadline: registrationDeadline ? new Date(registrationDeadline) : null,
      },
      include: {
        registrations: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              }
            },
            company: {
              select: {
                id: true,
                name: true,
                logoUrl: true,
              }
            }
          }
        }
      }
    })

    return NextResponse.json(event, { status: 201 })

  } catch (error) {
    console.error('Event POST error:', error)
    return NextResponse.json(
      { error: 'イベントの作成に失敗しました' },
      { status: 500 }
    )
  }
}