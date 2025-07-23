// 個別イベント情報CRUD API
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import prisma from '@/lib/prisma'
import { authOptions } from '@/lib/auth-config'

// イベント詳細取得 (GET /api/events/[id])
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const event = await prisma.event.findUnique({
      where: { 
        id: params.id,
        isActive: true 
      },
      include: {
        registrations: {
          where: { status: { not: 'cancelled' } },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
              }
            },
            company: {
              select: {
                id: true,
                name: true,
                logoUrl: true,
                website: true,
              }
            }
          },
          orderBy: { registeredAt: 'asc' }
        }
      }
    })

    if (!event) {
      return NextResponse.json(
        { error: 'イベントが見つかりません' },
        { status: 404 }
      )
    }

    // 現在の参加者数を更新
    const registeredCount = event.registrations.filter(r => r.status === 'registered').length
    if (event.currentParticipants !== registeredCount) {
      await prisma.event.update({
        where: { id: params.id },
        data: { currentParticipants: registeredCount }
      })
      event.currentParticipants = registeredCount
    }

    return NextResponse.json(event)

  } catch (error) {
    console.error('Event GET error:', error)
    return NextResponse.json(
      { error: 'データの取得に失敗しました' },
      { status: 500 }
    )
  }
}

// イベント情報更新 (PUT /api/events/[id])
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
    
    if (end && end <= start) {
      return NextResponse.json(
        { error: '終了日時は開始日時より後に設定してください' },
        { status: 400 }
      )
    }

    const updatedEvent = await prisma.event.update({
      where: { id: params.id },
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

    return NextResponse.json(updatedEvent)

  } catch (error) {
    console.error('Event PUT error:', error)
    return NextResponse.json(
      { error: 'イベント情報の更新に失敗しました' },
      { status: 500 }
    )
  }
}

// イベント削除 (DELETE /api/events/[id])
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

    // 論理削除（isActiveをfalseに）
    await prisma.event.update({
      where: { id: params.id },
      data: { isActive: false }
    })

    return NextResponse.json({ message: 'イベントを削除しました' })

  } catch (error) {
    console.error('Event DELETE error:', error)
    return NextResponse.json(
      { error: 'イベントの削除に失敗しました' },
      { status: 500 }
    )
  }
}