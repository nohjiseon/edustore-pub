---
title: 디자인 토큰 사용 가이드
audience: human
scope: frontend
tags: [guides, design-system, colors, typography]
version: 1.0.0
updated: 2025-09-22
---

# 디자인 토큰 사용 가이드

> 피그마 디자인 시스템과 동기화된 컬러 및 타이포그래피 토큰 사용법을 설명합니다.

## 🎨 컬러 시스템

### CSS 변수 기반 컬러 토큰

피그마에서 정의된 컬러 파운데이션이 CSS 변수로 변환되어 전역 스타일에 정의되어 있습니다.

#### Primary Colors

```scss
// 주요 브랜드 컬러
--color-primary: #11c5d4
--color-primary-secondary: #0d81e4
--color-primary-etc-1: #87dfd6
--color-primary-etc-2: #4fe6af
--color-primary-etc-3: #0c4f8f
```

#### Neutral Colors

```scss
// 중성 컬러 (블랙/화이트/그레이)
--color-neutral-black: #263238
--color-neutral-black-1: #1e2022
--color-neutral-black-2: #333333
--color-neutral-white: #ffffff

// 그레이 스케일
--color-neutral-grey-1: #53585e
--color-neutral-grey-2: #727983
--color-neutral-grey-3: #8f99a4

// 라이트 그레이
--color-neutral-l-grey-1: #c9d0da
--color-neutral-l-grey-2: #dae1e7

// 배경 그레이
--color-neutral-b-grey-1: #f5f7fa
--color-neutral-b-grey-2: #f5f8ff
```

#### Action Colors

```scss
// 액션/상태 컬러
--color-action-success: #11c5d4
--color-action-warning: #fbc02d
--color-action-error: #e53835
```

### 시맨틱 컬러 토큰

의미 기반으로 정의된 컬러 토큰들입니다.

```scss
// 배경 컬러
.component {
  background-color: var(--bg-primary); // 기본 배경
  background-color: var(--bg-secondary); // 보조 배경
  background-color: var(--bg-tertiary); // 3차 배경
}

// 텍스트 컬러
.text {
  color: var(--text-primary); // 기본 텍스트
  color: var(--text-secondary); // 보조 텍스트
  color: var(--text-tertiary); // 3차 텍스트
  color: var(--text-quaternary); // 4차 텍스트
  color: var(--text-inverse); // 반전 텍스트 (어두운 배경용)
}

// 보더 컬러
.border {
  border-color: var(--border-primary); // 기본 보더
  border-color: var(--border-secondary); // 보조 보더
}

// 인터랙티브 컬러
.interactive {
  color: var(--interactive-primary); // 기본 인터랙티브
  color: var(--interactive-secondary); // 보조 인터랙티브

  &:hover {
    color: var(--interactive-hover); // 호버 상태
  }

  &:active {
    color: var(--interactive-active); // 액티브 상태
  }
}

// 상태 컬러
.status {
  color: var(--status-success); // 성공
  color: var(--status-warning); // 경고
  color: var(--status-error); // 에러
}
```

## ✍️ 타이포그래피 시스템

### 헤드라인 (Headlines)

```scss
// SCSS 믹스인 사용법
.title {
  @include text_headline_1; // 45px, Bold
}

.subtitle {
  @include text_headline_2; // 32px, Bold
}

.section_title {
  @include text_headline_3; // 24px, SemiBold
}

.card_title {
  @include text_headline_4; // 22px, SemiBold
}
```

### 본문 텍스트 (Body Text)

#### Regular 버전

```scss
.large_text {
  @include text_body_1_regular; // 20px, Regular
}

.normal_text {
  @include text_body_2_regular; // 18px, Regular
}

.small_text {
  @include text_body_3_regular; // 16px, Regular
}

.tiny_text {
  @include text_body_4_regular; // 15px, Regular
}
```

#### Medium 버전

```scss
.large_text_emphasized {
  @include text_body_1_medium; // 18px, Medium, line-height: 28px
}

.normal_text_emphasized {
  @include text_body_2_medium; // 16px, Medium, line-height: 24px
}

.small_text_emphasized {
  @include text_body_3_medium; // 14px, Medium, line-height: 20px
}

.tiny_text_emphasized {
  @include text_body_4_medium; // 12px, Medium, line-height: 16px
}
```

### 숫자 표시용 특수 처리

```scss
.number_display {
  @include text_body_1_regular;
  @include text_numbers; // 숫자용 자간(-1%) 적용
}
```

### CSS 변수 직접 사용

믹스인 대신 CSS 변수를 직접 사용할 수도 있습니다.

```scss
.custom_text {
  font-family: var(--font-family-primary);
  font-size: var(--text-headline-2-size);
  font-weight: var(--text-headline-2-weight);
  line-height: var(--text-headline-2-line-height);
  letter-spacing: var(--letter-spacing-normal);
}
```

## 🔧 실제 사용 예시

### 컴포넌트에서의 활용

```scss
// src/components/ui/Card/Card.module.scss
.card {
  background-color: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: 8px;
  padding: 1rem;
}

.card_title {
  @include text_headline_4;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.card_content {
  @include text_body_2_regular;
  color: var(--text-secondary);
}

.card_button {
  @include text_body_3_medium;
  background-color: var(--interactive-primary);
  color: var(--text-inverse);

  &:hover {
    background-color: var(--interactive-hover);
  }

  &:active {
    background-color: var(--interactive-active);
  }
}
```

### 상태별 스타일링

```scss
// 성공 메시지
.success_message {
  @include text_body_2_medium;
  color: var(--status-success);
  background-color: var(--bg-secondary);
  border-left: 3px solid var(--status-success);
}

// 경고 메시지
.warning_message {
  @include text_body_2_medium;
  color: var(--status-warning);
  background-color: var(--bg-tertiary);
  border-left: 3px solid var(--status-warning);
}

// 에러 메시지
.error_message {
  @include text_body_2_medium;
  color: var(--status-error);
  background-color: var(--bg-secondary);
  border-left: 3px solid var(--status-error);
}
```

## 📱 반응형 대응

타이포그래피는 기본적으로 Desktop/Mobile 공통으로 사용하도록 디자인되었습니다. 필요에 따라 브레이크포인트별로 조정할 수 있습니다.

```scss
.responsive_title {
  @include text_headline_3;

  @include breakpoint_down($mobile) {
    @include text_headline_4; // 모바일에서는 더 작은 크기
  }
}
```

## ⚠️ 주의사항

### DO ✅

- 정의된 CSS 변수와 믹스인을 사용하세요
- 시맨틱 토큰(--text-primary, --bg-primary 등)을 우선 사용하세요
- 컬러 하드코딩 대신 토큰을 사용하세요

### DON'T ❌

- 임의의 색상값 하드코딩 금지
- 폰트 크기/굵기 직접 지정 금지
- 디자인 시스템 외의 색상 사용 금지

## 🔄 업데이트 프로세스

1. 피그마에서 디자인 토큰 변경
2. Figma MCP를 통해 새로운 값 가져오기
3. `src/styles/global.scss`의 CSS 변수 업데이트
4. `src/styles/_variables.scss`의 믹스인 업데이트 (필요시)
5. 변경사항 테스트 및 문서 업데이트

---

_최종 업데이트: 2025년 9월_
_버전: 1.0.0_
