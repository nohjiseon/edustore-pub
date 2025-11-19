---
title: 프론트엔드 아키텍처 개요
audience: human
scope: frontend
tags: [architecture, overview]
version: 1.0.0
updated: 2025-09-18
---

# 프론트엔드 아키텍처 개요

> 대상: 프로젝트 아키텍처를 빠르게 이해해야 하는 프론트엔드 개발자. 상세 규칙은 단일 소스 문서를 링크로 연결하고, 이 문서는 전반적인 구조와 의도만 간결하게 요약합니다.

## 전체 구조

- **프레임워크**: Next.js 15 App Router 기반, 기본 Server Components, 필요한 경우에만 `'use client'`.
- **언어/빌드**: TypeScript + SWC, 환경 변수는 `.env.local`에서 관리.
- **상태 관리**: 서버 상태는 TanStack Query, 글로벌 클라이언트 상태는 Zustand, 폼은 React Hook Form.
- **스타일링**: CSS Modules + SCSS, 전역 설정은 `src/styles/global.scss`.
- **문서 규칙**: 단일 소스 문서 기준(`docs/conventions/*.md`), 신규 문서는 체크리스트 포함.

## 디렉터리 레이아웃

```
app/                   # App Router, 서버 엔트리
  (group)/             # 라우트 그룹
  page.tsx             # 서버 컴포넌트 페이지
  providers.tsx        # 클라이언트 프로바이더
src/
  components/          # 재사용 가능한 UI
  hooks/               # 커스텀 훅
  services/            # API 서비스 + mocks
  stores/              # Zustand 스토어
  types/               # 도메인 타입
  utils/               # 공통 유틸
  constants/           # 상수 + 쿼리 키
docs/                  # 문서 루트
```

- 상세 규칙은 [`docs/conventions/coding-style.md`](../conventions/coding-style.md) 참조.
- 기능 단위 구조는 [`docs/guides/feature-module-guide.md`](./feature-module-guide.md) 참고.

## 렌더링 & 데이터 흐름

1. **Server Components**에서 초기 데이터 fetch → SEO/퍼포먼스 확보.
2. **클라이언트 컴포넌트**는 상호작용과 사용자 입력 처리에 집중(`'use client'` 최소화).
3. **TanStack Query**로 후속 데이터 동기화 및 캐싱.
4. **Server Actions** 또는 API Route로 뮤테이션 처리 후 `revalidatePath`/`invalidateQueries`.
5. **Zod 스키마**로 DTO 검증 → Entity 변환 가이드: [`docs/guides/entity-dto-model-guide.md`](./entity-dto-model-guide.md).

## 상태 관리 원칙

- 서버 데이터는 Query 훅(`useXxxQuery`)으로만 접근, Zustand에 중복 저장 금지.
- 전역 UI 설정/세션 등은 `src/stores/` 내 Zustand, 스냅샷 사용 최소화.
- 폼 상태는 React Hook Form + Zod, 폼 외 로직으로 확장하지 않음.
- 자세한 결정 트리는 [`AGENTS.md`](../../AGENTS.md#state_management_constraints)에 명시.

## 스타일링 & UI

- 모든 컴포넌트는 모듈 단위 SCSS 사용, 클래스는 snake_case.
- 공용 UI 패턴과 테마 규칙은 [`docs/guides/ui-customizations.md`](./ui-customizations.md) 참고.
- 아이콘/디자인 토큰 사용법: [`docs/guides/icon-usage.md`](./icon-usage.md), [`docs/guides/design-tokens-usage.md`](./design-tokens-usage.md).

## 빌드 & 품질 루틴

- 기본 명령: `yarn dev` / `yarn build` / `yarn lint` / `yarn type-check` / `yarn sb`.
- PR 전 검증: `type-check` → `lint` → 필요 시 Storybook/테스트.
- 배포 파이프라인은 DevOps 문서 공유본 참고, 로컬 빌드 실패 시 즉시 수정.

## 온보딩 체크리스트 연결

- 신규 입사자는 [`docs/guides/onboarding-checklist.md`](./onboarding-checklist.md)를 선행.
- 문서 작성/유지보수는 [`docs/guides/documentation-guidelines.md`](./documentation-guidelines.md) 준칙 준수.

## 빠른 참고 요약

- Next.js App Router + Server Components 기반, `'use client'`는 최소화.
- TanStack Query / Zustand / React Hook Form 각각의 용도 구분.
- 디렉터리 규칙은 `src`/`app` 이원화, 상대경로 대신 `@/` alias 사용.
- 모든 데이터 흐름은 Zod 기반 검증 + Server Action/Query 캐시 전략으로 일관.
- PR 전 `type-check` · `lint` · `build`는 필수, 체크리스트 문서와 연동.
