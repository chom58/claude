// 個別参加登録API
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import prisma from '@/lib/prisma'
import { authOptions } from '@/lib/auth-config'

// 参加登録削除/キャンセル (DELETE /api/registrations/[id])
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

    // 参加登録の存在と権限チェック
    const registration = await prisma.eventRegistration.findUnique({
      where: { id: params.id },
      include: {
        event: true
      }
    })

    if (!registration) {
      return NextResponse.json(
        { error: '参加登録が見つかりません' },
        { status: 404 }
      )
    }

    if (registration.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'この参加登録をキャンセルする権限がありません' },
        { status: 403 }
      )
    }

    // イベント開始時刻の24時間前以降はキャンセル不可
    const eventStart = new Date(registration.event.startDate)
    const now = new Date()
    const timeDiff = eventStart.getTime() - now.getTime()
    const hoursDiff = timeDiff / (1000 * 3600)

    if (hoursDiff < 24) {
      return NextResponse.json(
        { error: 'イベント開始24時間前以降はキャンセルできません' },
        { status: 400 }
      )
    }

    // 参加登録を削除（物理削除）
    await prisma.eventRegistration.delete({
      where: { id: params.id }
    })

    // イベントの現在参加者数を更新
    await prisma.event.update({
      where: { id: registration.eventId },
      data: {
        currentParticipants: {
          decrement: 1
        }
      }
    })

    return NextResponse.json({ message: '参加登録をキャンセルしました' })

  } catch (error) {
    console.error('Registration DELETE error:', error)
    return NextResponse.json(
      { error: '参加登録のキャンセルに失敗しました' },
      { status: 500 }
    )
  }
}

// 参加登録状態更新 (PUT /api/registrations/[id])
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

    const { status, notes } = await request.json()

    // 参加登録の存在と権限チェック
    const registration = await prisma.eventRegistration.findUnique({
      where: { id: params.id }
    })

    if (!registration) {
      return NextResponse.json(
        { error: '参加登録が見つかりません' },
        { status: 404 }
      )
    }

    if (registration.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'この参加登録を編集する権限がありません' },
        { status: 403 }
      )
    }

    // 有効なステータスチェック
    const validStatuses = ['registered', 'attended', 'cancelled', 'no-show']
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json(
        { error: '無効なステータスです' },
        { status: 400 }
      )
    }

    const updatedRegistration = await prisma.eventRegistration.update({
      where: { id: params.id },
      data: {
        ...(status && { status }),
        ...(notes !== undefined && { notes }),
      },
      include: {
        event: {
          select: {
            id: true,
            title: true,
            startDate: true,
          }
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        },
        company: {
          select: {
            id: true,
            name: true,
          }
        }
      }
    })

    return NextResponse.json(updatedRegistration)

  } catch (error) {
    console.error('Registration PUT error:', error)
    return NextResponse.json(
      { error: '参加登録の更新に失敗しました' },
      { status: 500 }
    )
  }
}