/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // 原宿テーマカラー（ピンク-パープル-ブルーグラデーション）
      colors: {
        harajuku: {
          pink: {
            50: '#fef7ff',
            100: '#fcedf9',
            200: '#f8daf3',
            300: '#f2b8e5',
            400: '#ea85d1',
            500: '#de4fba',
            600: '#c93599',
            700: '#a7287b',
            800: '#882464',
            900: '#722454',
          },
          purple: {
            50: '#f3f0ff',
            100: '#e9e2ff',
            200: '#d6ccff',
            300: '#b8a5ff',
            400: '#9373ff',
            500: '#7c3aed',
            600: '#6d28d9',
            700: '#5b21b6',
            800: '#4c1d95',
            900: '#3f1a7a',
          },
          blue: {
            50: '#eff6ff',
            100: '#dbeafe',
            200: '#bfdbfe',
            300: '#93c5fd',
            400: '#60a5fa',
            500: '#3b82f6',
            600: '#2563eb',
            700: '#1d4ed8',
            800: '#1e40af',
            900: '#1e3a8a',
          }
        }
      },
      // グラデーション背景
      backgroundImage: {
        'harajuku-gradient': 'linear-gradient(135deg, #fcedf9 0%, #e9e2ff 50%, #dbeafe 100%)',
        'harajuku-gradient-dark': 'linear-gradient(135deg, #722454 0%, #3f1a7a 50%, #1e3a8a 100%)',
        'card-gradient': 'linear-gradient(145deg, rgba(252, 237, 249, 0.8), rgba(219, 234, 254, 0.8))',
      },
      // フォント設定
      fontFamily: {
        sans: ['Inter', 'Noto Sans JP', 'sans-serif'],
        display: ['Poppins', 'Inter', 'sans-serif'],
      },
      // アニメーション
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient': 'gradient 15s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
      },
      // シャドウ
      boxShadow: {
        'harajuku': '0 10px 25px -5px rgba(222, 79, 186, 0.1), 0 4px 6px -2px rgba(222, 79, 186, 0.05)',
        'harajuku-lg': '0 20px 40px -10px rgba(222, 79, 186, 0.15), 0 8px 16px -4px rgba(222, 79, 186, 0.1)',
      }
    },
  },
  plugins: [],
}