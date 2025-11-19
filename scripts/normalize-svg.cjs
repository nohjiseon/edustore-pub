#!/usr/bin/env node
/*
 * Figma SVG 정규화 스크립트
 * - 원본 SVG의 색상 정보를 그대로 보존
 * - 필요한 경우 공백/포매팅 정규화만 수행
 */
const fs = require('fs')
const path = require('path')

const RAW_DIR = path.resolve(process.cwd(), 'src/icons/raw')

if (!fs.existsSync(RAW_DIR)) process.exit(0)

const files = fs.readdirSync(RAW_DIR).filter((f) => f.endsWith('.svg'))

for (const file of files) {
  const p = path.join(RAW_DIR, file)
  const src = fs.readFileSync(p, 'utf8')

  // 원본 색상 보존: 색상 치환 로직 제거
  // 필요시 다른 정규화 작업만 수행 (현재는 원본 유지)
  let out = src

  if (out !== src) {
    fs.writeFileSync(p, out, 'utf8')
    console.log(`[icons] normalized: ${file}`)
  }
}
