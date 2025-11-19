// SVGO 설정: Figma SVG를 최적화하고 currentColor 기반으로 통일
// - viewBox 유지, width/height 제거, fill 제거
// - 컬러를 currentColor로 교체는 SVGR 단계에서 처리
module.exports = {
  multipass: true,
  plugins: [
    { name: 'preset-default' },
    { name: 'removeViewBox', active: false },
    { name: 'removeDimensions', active: true },
    { name: 'cleanupIds', active: true },
    // 최신 svgo(v4 CLI) 경고 제거: removeScripts 사용
    // svgr 내부 svgo는 비활성화(--no-svgo)하여 충돌 방지
    { name: 'removeScripts', active: true },
    { name: 'removeStyleElement', active: true },
    { name: 'removeXMLNS', active: true }
    // 색상은 사전 normalize 단계에서 currentColor로 통일하므로 여기서 제거하지 않습니다.
  ]
}
