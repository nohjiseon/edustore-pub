import { NextRequest, NextResponse } from 'next/server'

// const BACKEND_URL = process.env.BACKEND_API_URL || 'http://52.78.34.73' // 실제 백엔드 서버
// const BACKEND_URL = process.env.BACKEND_API_URL || 'http://3.35.211.59' // 운영 백엔드 서버
// const BACKEND_URL = process.env.BACKEND_API_URL || 'http://127.0.0.1' // 로컬 백엔드 서버
const BACKEND_URL = process.env.BACKEND_API_URL || 'http://52.78.34.73'
// const BACKEND_URL = process.env.BACKEND_API_URL || 'http://127.0.0.1'

// 더미 데이터 모드 확인
const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true'

/**
 * API 프록시 핸들러
 * /api/* 요청을 백엔드로 전달하고 상세 로그 출력
 * 더미 데이터 모드일 때는 실제 서버로 요청하지 않음
 */
async function handleRequest(request: NextRequest, method: string) {
  // 더미 데이터 모드일 때는 프록시를 통해 실제 서버로 요청하지 않음
  // (클라이언트의 axios가 모크 핸들러를 사용하므로 여기서는 경고만 표시)
  if (USE_MOCK_DATA) {
    console.log('\n========================================')
    console.log('⚠️  [MOCK MODE] 프록시 요청 차단')
    console.log('========================================')
    console.log('📍 Method:', method)
    console.log('📍 Original URL:', request.nextUrl.pathname)
    console.log('📍 Path:', request.nextUrl.pathname.replace('/api/', ''))
    console.log('⚠️  더미 데이터 모드가 활성화되어 있습니다.')
    console.log('📍 클라이언트의 axios가 모크 핸들러를 사용합니다.')
    console.log('========================================\n')

    return NextResponse.json(
      {
        error: 'MOCK_MODE_ACTIVE',
        message:
          '더미 데이터 모드가 활성화되어 있어 실제 서버로 요청하지 않습니다.',
        path: request.nextUrl.pathname.replace('/api/', '')
      },
      { status: 200 } // 200으로 반환하여 클라이언트가 모크 핸들러를 사용하도록 함
    )
  }

  // URL 파싱
  const path = request.nextUrl.pathname.replace('/api/', '')
  const searchParams = request.nextUrl.searchParams.toString()
  const targetUrl = `${BACKEND_URL}/${path}${
    searchParams ? `?${searchParams}` : ''
  }`

  console.log('\n========================================')
  console.log('🔄 [Next.js Proxy] 요청 시작')
  console.log('========================================')
  console.log('📍 Method:', method)
  console.log('📍 Original URL:', request.nextUrl.pathname)
  console.log('📍 Target URL:', targetUrl)
  console.log('📍 Query Params:', searchParams || '(없음)')

  try {
    // 요청 헤더 복사
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }

    // Cookie 헤더 복사
    const cookieHeader = request.headers.get('cookie')
    if (cookieHeader) {
      headers['Cookie'] = cookieHeader
      console.log('🍪 Cookie:', cookieHeader.substring(0, 50) + '...')
    }

    // 요청 바디 읽기
    let body = null
    if (method !== 'GET' && method !== 'HEAD') {
      try {
        const text = await request.text()
        if (text) {
          body = text
          console.log('📦 Request Body:', JSON.parse(text))
        }
      } catch (e) {
        console.log('⚠️  Request Body 파싱 실패:', e)
      }
    }

    console.log('⏳ 백엔드 요청 전송 중...')

    // 백엔드로 요청 전달
    const fetchOptions: RequestInit = {
      method,
      headers,
      ...(body && { body })
    }

    const response = await fetch(targetUrl, fetchOptions)

    console.log('✅ 백엔드 응답 수신')
    console.log('📊 Status:', response.status, response.statusText)
    console.log('📊 Headers:', Object.fromEntries(response.headers.entries()))

    // 응답 바디 읽기
    const responseText = await response.text()
    let responseData

    try {
      responseData = JSON.parse(responseText)
      console.log('📦 Response Body:', responseData)
    } catch (e) {
      console.log('📦 Response Body (raw):', responseText.substring(0, 200))
      responseData = responseText
    }

    console.log('========================================\n')

    // 응답 헤더 복사
    const responseHeaders = new Headers()
    response.headers.forEach((value, key) => {
      // CORS 관련 헤더는 제외 (Next.js가 처리)
      if (!key.toLowerCase().startsWith('access-control-')) {
        responseHeaders.set(key, value)
      }
    })

    // 클라이언트로 응답 전달
    return new NextResponse(responseText, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders
    })
  } catch (error: any) {
    console.error('========================================')
    console.error('❌ [Next.js Proxy] 에러 발생')
    console.error('========================================')
    console.error('🚨 Error Type:', error.constructor.name)
    console.error('🚨 Error Message:', error.message)
    console.error('🚨 Error Stack:', error.stack)
    console.error('🚨 Target URL:', targetUrl)
    console.error('========================================\n')

    return NextResponse.json(
      {
        error: '백엔드 서버 연결 실패',
        message: error.message,
        targetUrl,
        details:
          process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 502 } // Bad Gateway
    )
  }
}

export async function GET(request: NextRequest) {
  return handleRequest(request, 'GET')
}

export async function POST(request: NextRequest) {
  return handleRequest(request, 'POST')
}

export async function PUT(request: NextRequest) {
  return handleRequest(request, 'PUT')
}

export async function PATCH(request: NextRequest) {
  return handleRequest(request, 'PATCH')
}

export async function DELETE(request: NextRequest) {
  return handleRequest(request, 'DELETE')
}
