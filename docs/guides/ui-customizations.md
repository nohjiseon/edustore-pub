---
title: Next.js 템플릿 커스터마이징 가이드
audience: human
scope: frontend
tags: [guides, styling]
version: 2.1.0
updated: 2025-09-22
---

# Next.js 템플릿 커스터마이징 가이드

> 단일 소스 안내: 이 문서는 [Single-Source Index](../conventions/single-source-index.md)의 '스타일/테마' 권위 문서입니다. 중복 섹션은 요약으로 유지하고, 상세 규칙은 본문을 기준으로 합니다.

## 🎯 커스터마이징 원칙

- 컴포넌트 재사용성: 공통 컴포넌트는 `src/components/`에서 관리합니다.
- 스타일 일관성: CSS Modules + SCSS로 스타일을 모듈 스코프로 격리합니다.
- 타입 안전성: props는 명시적 타입으로 정의합니다.
- 확장성: 변형(variant/size) 패턴과 토큰을 우선 사용합니다.

> 주의: 기존 패턴과 일관성을 유지하고, 핵심 UI의 시각 변경에는 스토리/시각 테스트를 동반합니다.

---

## 🎨 스타일링 시스템

### CSS Modules + SCSS 핵심 규칙

- 클래스 네이밍은 snake_case, 변형은 별도 클래스(`.button_primary`, `.size_large`)로 분리합니다.
- 중첩은 3단계 이내로 제한하고, 전역 셀렉터/태그 선택자 사용을 지양합니다.
- 토큰(색상/spacing/타이포)은 전역 CSS 변수에서만 참조합니다.
- 인라인 스타일과 `!important`는 예외적 상황에서만 사용합니다.
- 상태/변형 조합은 `cn()` 유틸로 병합합니다.

간단 예시(개념 표시용)

```scss
/* src/components/ui/Button/Button.module.scss */
.button {
  display: inline-flex;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: var(--radius-md);
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
.button_primary {
  background: var(--color-primary-500);
  color: #fff;
}
.size_large {
  padding: 0.75rem 1.25rem;
  font-size: var(--text-lg);
}
```

### 전역 스타일 토큰(요약)

```scss
/* src/styles/global.scss */
:root {
  --color-primary-500: #3b82f6;
  --color-gray-900: #111827;
  --spacing-2: 0.5rem;
  --radius-md: 0.375rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
}
```

#### Figma MCP 동기화 규칙

- Figma MCP로 데이터를 요청할 때는 사용자가 메타데이터 제외를 명시하지 않는 이상 **항상 `metadata` 응답을 함께 가져옵니다**. 정보량이 많아 스크린샷을 병행하더라도 메타데이터는 필수로 수집해 보관하세요.
- Figma MCP를 통해 동기화된 "간격/높이/너비" 값은 **rem 단위**로 작성하며 해당 컴포넌트 SCSS에 기록합니다 (기본값: 16px = 1rem).
- 변수화하지 않고 직접 값을 하드코딩합니다.
- 예시(권장):
  ```scss
  /* src/components/layout/Header/Header.module.scss */
  .header {
    height: 4rem;
  }
  ```
- 비권장(금지):
  ```scss
  .header {
    height: var(--header-height); // 변수화 금지
    height: 64px; // px 단위 사용 금지
    height: 4rem;
  }
  ```

### 테마(다크모드) 개념

```scss
:root {
  --bg: #ffffff;
  --fg: #0a0a0a;
}
[data-theme='dark'] {
  --bg: #0a0a0a;
  --fg: #fafafa;
}
body {
  background: var(--bg);
  color: var(--fg);
}
```

앱 레벨에서 `document.documentElement`의 `data-theme` 속성만 전환하면 됩니다(Provider 구현 상세는 생략).

### className 병합 유틸리티(요약)

```ts
// src/lib/utils.ts
import { clsx, type ClassValue } from 'clsx'
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}
// 사용: <button className={cn(styles.button, styles.button_primary)} />
```

---

## 🧩 컴포넌트 구조(요약)

- 스타일 파일은 컴포넌트와 같은 폴더의 `*.module.scss`로 배치합니다.
- 변형(variant/size)은 모듈 클래스 조합으로 처리하고, props → 클래스 매핑은 컴포넌트에서 수행합니다.
- 배럴 익스포트는 필요 시 `index.ts`에서만 노출합니다(예시 코드는 생략).

## 🪟 모달 구현 패턴

- 새 모달은 `src/components/ui/Dialog/Dialog.tsx`에서 export하는 `Dialog`, `DialogTrigger`, `DialogContent` 등을 조합해 구성합니다.
- 오버레이/컨텐츠 스타일은 기본 제공 CSS Module(`Dialog.module.scss`)을 우선 사용하고, 추가 커스텀은 `className` 또는 `overlayStyle` props로 확장합니다.
- 열림/닫힘 제어는 `src/hooks/useModal.ts`의 `useModal()` 훅을 통해 제공합니다. `openModal`, `closeModal`, `closeLast`, `closeAll` 시그니처를 그대로 사용합니다.
- 전역 모달 스택을 사용하는 경우 `useModal().openModal({ component, props })` 패턴을 유지해 중첩 동작과 애니메이션 일관성을 확보합니다.
- 특수한 모달을 만들어야 한다면 기본 `Dialog` 내부에 전용 UI 컴포넌트를 배치하되, 루트 구조(`<Dialog><DialogContent>...</DialogContent></Dialog>`)는 변경하지 않습니다.

간단 예시

```tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/Dialog'
import { useModal } from '@/hooks/useModal'

export const ExampleModal = () => {
  const { closeModal } = useModal()

  return (
    <Dialog>
      <DialogTrigger>열기</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>예시 모달</DialogTitle>
        </DialogHeader>
        {/* 모달 콘텐츠 */}
        <button onClick={closeModal}>닫기</button>
      </DialogContent>
    </Dialog>
  )
}
```

## 📱 반응형 가이드(요약)

- 모바일 퍼스트로 작성하고, 공용 브레이크포인트 믹스인만 사용합니다(믹스인 정의는 공용 스타일에 위치).
- 간단 예: `@include responsive('md') { ... }` 형태로 필요한 구간만 확장합니다.

---

## 📐 SCSS 속성 작성 순서

스타일 속성은 다음 순서로 작성하여 일관성과 가독성을 확보합니다:

### 속성 작성 순서

1. **@include 믹스인** (타이포그래피, 유틸리티 등)
2. **Display 관련** (display, visibility 등)
3. **Position 관련** (position, top, right, bottom, left, z-index 등)
4. **Flex/Grid 레이아웃** (flex-direction, justify-content, align-items, gap 등)
5. **크기 (Width/Height)** (width, height, min-_, max-_ 등)
6. **간격 (Spacing)** (margin, padding 등)
7. **색상/배경/테두리** (color, background, border 등)
8. **폰트/텍스트** (font-_, line-height, text-_ 등)
9. **전환/애니메이션** (transition, animation 등)
10. **기타 속성** (cursor, overflow, opacity 등)

### 반응형 작업 패턴

- **모바일 우선**: 기본 스타일은 모바일 기준으로 작성
- **클래스 내부 반응형**: 각 클래스 내부에서 `@include breakpoint_down/up` 사용
- **별도 미디어쿼리 금지**: 클래스 외부에 별도 `@media` 블록 작성 금지

### 디자인 시스템 토큰 활용

- **색상**: `var(--color-*)` 토큰 사용
- **타이포그래피**: `@include text($scale, $weight)`, `@include headline($level)` 믹스인 사용
- **그림자**: `var(--shadow-sm/md/lg)` 토큰 사용
- **간격**: 하드코딩 대신 디자인 시스템 토큰 우선 (Figma MCP 동기화 값 제외)

### 예시 코드

```scss
.card {
  // 1. 믹스인
  @include text(3, regular);

  // 2. Display
  display: flex;

  // 3. Position
  position: relative;

  // 4. Flex 레이아웃
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: 1rem;

  // 5. 크기
  width: 100%;
  height: auto;

  // 6. 간격
  padding: 1.5rem;
  margin-bottom: 1rem;

  // 7. 색상/배경/테두리
  background-color: var(--color-neutral-white);
  border: 1px solid var(--border-secondary);

  // 8. 폰트/텍스트 (믹스인으로 처리하지 않은 경우)
  color: var(--text-primary);

  // 9. 전환
  transition: all 0.2s ease;

  // 10. 기타
  border-radius: 0.75rem;
  box-shadow: var(--shadow-sm);
  cursor: pointer;

  // 반응형 (클래스 내부에 작성)
  @include breakpoint_down(md) {
    padding: 1rem;
    gap: 0.75rem;
  }

  // 중첩 요소
  .card_header {
    @include headline(4);
    color: var(--text-primary);
  }
}
```

### 사용 가능한 믹스인 (mixin.scss)

```scss
// 반응형 브레이크포인트
@include breakpoint_down(md) // 1280px 이하
  @include breakpoint_down(sm) // 768px 이하
  @include breakpoint_up($size) // 지정 크기 이상
  @include breakpoint_between($min, $max) // 범위 지정
  // 타이포그래피 (global.scss)
  @include text(1-4, regular|medium) // 본문 스타일
  @include headline(1-4); // 제목 스타일
```

---

## ⚠️ 주의사항 및 베스트 프랙티스

- 모듈 스코프 유지: 전역 클래스를 오염시키지 않습니다.
- 토큰 우선: 임의 색상/크기 하드코딩을 지양하고 변수로만 참조합니다.
- 접근성: 포커스 가능한 요소에 가시적 포커스 스타일을 제공하고, 대비는 WCAG AA 이상을 준수합니다.
- 성능: 불필요한 중복 선언/깊은 중첩을 피하고, 재사용 가능한 유틸 클래스를 추출합니다.

---

## 🧷 아이콘 사용 참고

- 로컬 SVG → `yarn icons:build` 파이프라인을 통해 컴포넌트로 생성합니다.
- 앱 코드에서는 `<Icon name="..." />`만 사용합니다(직접 `lucide-react`/`.svg` 임포트 금지).
- 자세한 워크플로우: `docs/guides/icon-usage.md`

## 🔔 알림 (Toast Notification) 사용

- 사용자 알림이 필요한 경우 시스템 `alert()` 대신 `sonner` 라이브러리의 `toast()` 함수를 사용합니다.
- `import { toast } from 'sonner'`로 불러온 후 `toast.success()`, `toast.error()`, `toast.info()` 등으로 알림을 표시합니다.

_버전: 2.1.0 · 마지막 업데이트: 2025-09-22_
