---
title: 프론트엔드 온보딩 체크리스트
audience: human
scope: onboarding
tags: [onboarding, workflow]
version: 1.0.0
updated: 2025-09-18
---

# 프론트엔드 온보딩 체크리스트

> 대상: 신규 프론트엔드 개발자. 이 문서는 첫 주 동안 필요한 준비, 문서, 워크플로우를 체크리스트 형태로 안내합니다. 각 항목을 완료할 때마다 체크하고, 궁금한 점은 핸드오프 담당자에게 공유하세요.

## 1. Day 0 — 사전 준비

- [ ] 개인 장비에 **Node.js 18.x LTS** 이상 설치 및 `node -v` 확인
- [ ] **Yarn** 최신 버전 설치(`corepack enable` 권장) 및 `yarn -v` 확인
- [ ] 회사 GitHub 조직 초대 수락 후 저장소 접근 권한 확인
- [ ] 필수 협업 툴 계정 생성(이슈 트래커, 디자인 툴, 문서 페이지 등) 및 프로젝트 스페이스 초대 요청
- [ ] 보안 정책 확인: 사내 비밀 키, VPN, 2FA 등 필수 절차 완료
- [ ] 저장소 클론 전 `README.md`와 `docs/README.md` 빠르게 스캔하여 구조 파악

## 2. Day 1 — 문서 & 구조 이해

- [ ] 프로젝트 개요 읽기: [`README.md`](../../README.md)
- [ ] 에이전트/AI 워크플로 이해: [`AGENTS.md`](../../AGENTS.md), [`docs/agents/development-workflow.md`](../agents/development-workflow.md)
- [ ] 필수 규칙 문서 숙지
  - [ ] 코드/네이밍 규칙: [`docs/conventions/coding-style.md`](../conventions/coding-style.md)
  - [ ] 프론트엔드 UI 규칙: [`docs/conventions/frontend-rules.md`](../conventions/frontend-rules.md)
  - [ ] Next.js 패턴: [`docs/conventions/patterns.md`](../conventions/patterns.md)
  - [ ] 테스트 전략: [`docs/guides/testing-guide.md`](./testing-guide.md)
- [ ] 문서 작성 방식 이해: [`docs/guides/documentation-guidelines.md`](./documentation-guidelines.md)

## 3. 로컬 환경 세팅

- [ ] 저장소 클론: `git clone <repo-url>` → `cd edustore-client-front`
- [ ] 의존성 설치: `yarn install`
- [ ] 환경 변수 파일 준비: `.env.example` → `.env.local` 복사 후 팀이 공유한 값 입력
- [ ] 기본 개발 서버 실행: `yarn dev` (포트 3000). 실행 중 충돌 포트 없음 확인
- [ ] 타입/린트/빌드 명령 미리 실행
  - [ ] `yarn type-check`
  - [ ] `yarn lint`
  - [ ] `yarn build`
- [ ] 스토리북 포함 필요 시 `yarn sb`로 UI 카탈로그 확인

## 4. 코드 워크플로우 이해

- [ ] 이슈 → Plan → 구현 → PR 순서 파악
  - [ ] Plan 필수 범위 확인(`docs/plans/`, 템플릿: `docs/templates/plan-template.md`)
  - [ ] PR 시 Plan 링크 첨부 규칙 확인
- [ ] 브랜치 전략: 기능 브랜치는 `feature/<요약>` 형태 사용 확인
- [ ] 커밋 컨벤션 확인(팀 내 규칙 또는 기존 PR 참고)
- [ ] 상태 관리 선택 기준 복습: [`docs/conventions/coding-style.md`](../conventions/coding-style.md#🧩-컴포넌트-패턴) 내 상태 관리 섹션 및 [`AGENTS.md`](../../AGENTS.md#state_management_constraints)
- [ ] API 연동 시 참고 문서: [`docs/guides/api-integration.md`](./api-integration.md)

## 5. 품질 보증 루틴

- [ ] 작업 전/후 체크리스트로 [`docs/conventions/code-review.md`](../conventions/code-review.md) 확인
- [ ] PR 작성 전 최소 검증 루틴 수행
  - [ ] `yarn type-check`
  - [ ] `yarn lint`
  - [ ] 필요한 경우 `yarn test` 혹은 Storybook 시나리오 검증
- [ ] PR 설명에 변경 목적, 영향 범위, 테스트 결과 명시
- [ ] 주요 문서 업데이트 필요 시 관련 문서에 링크/근거 추가

## 6. 첫 주 업무 동선 제안

- [ ] 첫 이슈는 작은 문서 정리나 스타일 개선 등 리스크 낮은 업무 선택
- [ ] 기존 PR, Merge 기록 살펴보며 리뷰 기대치 파악
- [ ] 상태 관리/라우팅/스타일 패턴을 체감하기 위해 작은 화면 구현 작업 경험
- [ ] 팀 규칙이나 의문점은 `docs/README.md` → 관련 문서 탐색 후 질문 목록 정리

## 7. 지원 채널 & 운영 정보

- [ ] 매일 Stand-up/스크럼 시간, 회의 채널 확인
- [ ] 코드 리뷰 SLA(응답 시간) 및 담당자 리스트 확보
- [ ] 배포 파이프라인 요약 확인(운영 담당자 또는 DevOps 문서 참고)
- [ ] 긴급 이슈 대응 경로(슬랙 채널, 전화 등) 문서화된 곳 파악

---

### 빠른 요약

- Node/Yarn 설치, 저장소 접근, 협업 계정 준비.
- 첫날 필수 문서: 코딩 스타일/패턴/테스트/문서 가이드.
- 로컬 환경은 `yarn install` → `.env.local` → `yarn dev` + 품질 명령 실행으로 검증.
- 질문은 문서 참고 후 핸드오프 담당자에게 정리해서 요청.
