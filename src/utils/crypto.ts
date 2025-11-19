/**
 * AES 복호화 유틸리티
 * Java 백엔드와 호환되는 AES/CBC/PKCS5Padding 복호화
 *
 * Java 코드와 동일한 방식:
 * - SECRET_KEY를 SHA-256 해시하여 32바이트 키 생성
 * - IV는 키의 처음 16바이트 사용
 * - Base64 디코딩
 * - AES/CBC/PKCS5Padding 복호화 (JavaScript에서는 PKCS7)
 * - UTF-8 문자열 변환
 */

// @ts-ignore - crypto-js 타입 정의 이슈
// eslint-disable-next-line import/no-unresolved
import CryptoJS from 'crypto-js'

// SECRET_KEY는 환경변수에서 가져오거나 백엔드와 동일한 값 사용
const SECRET_KEY =
  process.env.NEXT_PUBLIC_AES_SECRET_KEY || 'YourSecretKey32BytesLongForAES!'

/**
 * AES 복호화 (Java 백엔드와 호환)
 * @param encryptedText Base64 인코딩된 암호화 문자열
 * @param secretKey 암호화 키 (선택사항, 기본값은 SECRET_KEY)
 * @return 복호화된 원본 텍스트
 */
export function decryptAESSync(
  encryptedText: string,
  secretKey?: string
): string {
  try {
    console.log(encryptedText)
    const key = secretKey || SECRET_KEY

    // 키 생성 (SHA-256 해시로 32바이트) - Java의 getKeyBytes()와 동일
    const keyBytes = CryptoJS.SHA256(key)

    // IV 생성 (키의 처음 16바이트 사용) - Java 코드와 동일
    // WordArray에서 처음 4개 words (4 * 4 = 16 bytes)를 사용
    const iv = CryptoJS.lib.WordArray.create(keyBytes.words.slice(0, 4))

    // AES 복호화 (CBC 모드, PKCS7 패딩)
    // crypto-js는 Base64 문자열을 직접 받아서 처리합니다
    // Java의 Cipher.getInstance("AES/CBC/PKCS5Padding")와 동일
    const decrypted = CryptoJS.AES.decrypt(encryptedText, keyBytes, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7 // PKCS5Padding과 동일
    })

    // UTF-8 문자열로 변환 - Java의 new String(decrypted, StandardCharsets.UTF_8)와 동일
    const decryptedText = decrypted.toString(CryptoJS.enc.Utf8)

    if (!decryptedText) {
      throw new Error('복호화 결과가 비어있습니다.')
    }

    return decryptedText
  } catch (error) {
    console.error('복호화 실패:', error)
    throw new Error('복호화 처리 중 오류가 발생했습니다.')
  }
}
