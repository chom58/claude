// サインインページ
import SignInForm from '@/components/auth/SignInForm'

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-12 px-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            原宿デザイン会社交流会
          </h1>
          <p className="text-gray-600">
            アカウントにログインしてイベントに参加しましょう
          </p>
        </div>
        <SignInForm />
      </div>
    </div>
  )
}