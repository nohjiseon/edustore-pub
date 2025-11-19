import localFont from 'next/font/local'

// Pretendard: 로컬 woff2 파일을 next/font/local로 등록
// 경로는 이 파일 기준 상대경로 사용(alias 미사용)
export const Pretendard = localFont({
  src: [
    {
      path: '../assets/fonts/Pretendard/Pretendard-Thin.woff2',
      weight: '100',
      style: 'normal'
    },
    {
      path: '../assets/fonts/Pretendard/Pretendard-ExtraLight.woff2',
      weight: '200',
      style: 'normal'
    },
    {
      path: '../assets/fonts/Pretendard/Pretendard-Light.woff2',
      weight: '300',
      style: 'normal'
    },
    {
      path: '../assets/fonts/Pretendard/Pretendard-Regular.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../assets/fonts/Pretendard/Pretendard-Medium.woff2',
      weight: '500',
      style: 'normal'
    },
    {
      path: '../assets/fonts/Pretendard/Pretendard-SemiBold.woff2',
      weight: '600',
      style: 'normal'
    },
    {
      path: '../assets/fonts/Pretendard/Pretendard-Bold.woff2',
      weight: '700',
      style: 'normal'
    },
    {
      path: '../assets/fonts/Pretendard/Pretendard-ExtraBold.woff2',
      weight: '800',
      style: 'normal'
    },
    {
      path: '../assets/fonts/Pretendard/Pretendard-Black.woff2',
      weight: '900',
      style: 'normal'
    }
  ],
  variable: '--font-pretendard',
  preload: true,
  display: 'swap'
})
