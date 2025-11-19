# 수업가게 사용자 페이지

현대적인 웹 개발을 위한 Next.js 템플릿입니다. TanStack Query를 활용한 SEO 최적화된 데이터 관리 방식을 구현했습니다.

## 🔍 LLM 빠른 질문 예시

- `처음 시작 시 읽어야 할 문서에 대해 정리해서 알려줘`
- `이 프로젝트의 프론트엔드 구조를 간단히 설명해 줘.`
- `서버 상태랑 클라이언트 상태를 어떻게 나눠야 해?`
- `문서를 업데이트할 때 따라야 할 규칙이 뭐야?`

## 📑 목차

- [📚 문서 안내](#-문서-안내)
- [🚀 주요 기능](#-주요-기능)
- [🔧 기술 스택](#-기술-스택)
- [🚀 빠른 시작](#-빠른-시작)
- [📁 프로젝트 구조](#-프로젝트-구조)
- [📚 개발 가이드라인](#-개발-가이드라인)

## 📚 문서 안내

프로젝트 문서 전체 지도와 운영 규칙은 [docs/README.md](./docs/README.md)에서 확인할 수 있습니다. 주요 카테고리별 문서는 아래 링크를 참고하세요.

### 핵심 문서

- **[코딩 스타일](./docs/conventions/coding-style.md)** - 코딩 스타일, 아키텍처 패턴, 모범 사례
- **[프론트엔드 규칙](./docs/conventions/frontend-rules.md)** - 코딩 디자인 핵심 규칙, 작업 권장 패턴
- **[개발 워크플로우](./docs/agents/development-workflow.md)** - 개발 워크플로우와 일일 작업 규칙
- **[테스트 가이드](./docs/guides/testing-guide.md)** - 테스트 전략과 구현 방법
- **[코드 리뷰](./docs/conventions/code-review.md)** - 코드 리뷰 기준과 체크리스트

### 신규 온보딩 가이드

- **[프론트엔드 온보딩 체크리스트](./docs/guides/onboarding-checklist.md)** - 첫 주에 무엇을 준비하고 확인할지 단계별 체크리스트
- **[프론트엔드 아키텍처 개요](./docs/guides/frontend-architecture-overview.md)** - Next.js App Router 구조와 데이터 흐름 요약
- **[상태 관리 전략 가이드](./docs/guides/state-management-strategy.md)** - TanStack Query/Zustand/React State/React Hook Form 선택 기준

### AI 도구 가이드

- **[Claude](./CLAUDE.md)** - Claude AI를 위한 프로젝트 가이드
- **[Agents](./AGENTS.md)** - Agent AI를 위한 워크플로우
- **[Gemini](./GEMINI.md)** - Gemini AI를 위한 개발 지침

## 🚀 주요 기능

### 개발자 경험

- **TypeScript**: 완전한 타입 안전성
- **SCSS 모듈**: 스타일링 시스템
- **ESLint + Prettier**: 코드 품질 관리
- **Storybook**: 컴포넌트 문서화

## 🔧 기술 스택

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: SCSS Modules
- **Data Fetching**: TanStack Query v5
- **State Management**: Zustand
- **UI Components**: Custom Components
- **Development**: ESLint, Prettier, Storybook

## 🚀 빠른 시작

### 📋 사전 요구사항

- **Node.js**: 버전 18.0.0 이상
- **패키지 매니저**: yarn (기본)
- **Git**: 최신 버전
- **코드 에디터**: VS Code (권장)

### ⚡ 설치 및 실행

```bash
# 저장소 복제
git clone <repository-url>
cd nextjs-template-default

# 의존성 설치
yarn install

# 환경 변수 설정
cp .env.example .env.local

# 개발 서버 시작 (포트 3000)
yarn dev
```

### 🔧 환경 변수 설정

```bash
# .env.local 파일 생성 후 설정
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001

# 선택사항
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
```

## 📁 프로젝트 구조

```
nextjs-template-default/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 루트 레이아웃
│   ├── page.tsx          # 홈페이지
│   └── providers.tsx     # 클라이언트 프로바이더
├── src/
│   ├── components/       # 재사용 가능한 컴포넌트
│   ├── stores/          # Zustand 스토어
│   ├── styles/          # 전역 스타일 & SCSS
│   ├── types/           # TypeScript 정의
│   ├── utils/           # 유틸리티 함수
│   ├── constants/       # 전역 상수/쿼리 키/런타임
│   │   ├── query-keys.ts  # TanStack Query 키 네임스페이스
│   │   ├── runtime.ts     # 공개 런타임 상수(NEXT_PUBLIC_*) 접근자
│   │   ├── values.ts      # 공통 상수 값(페이지 사이즈 등)
│   │   └── index.ts       # 배럴 익스포트
│   └── services/        # API 서비스 (도메인별)
│       ├── <domain>.service.ts
│       └── mocks/       # 목업 데이터 (*.mock.ts)
├── docs/                # 문서 루트
│   ├── README.md       # 문서 구조/운영 가이드
│   ├── conventions/    # 규칙·관례·원칙(정책 정본)
│   ├── guides/         # 실무 흐름/How-To
│   └── agents/         # 에이전트 전용 문서
└── public/             # 정적 자산
```

## 📚 개발 가이드라인

세부 운영 정책은 [docs/README.md](./docs/README.md)와 상단의 문서 안내 링크를 함께 참고하세요. 아래 항목은 실무에서 가장 자주 확인하는 가이드입니다.

### Plan 관리

- 위치: `docs/plans/`에 작업 단위 계획서를 보관합니다.
- 템플릿: `docs/templates/plan-template.md`를 복사해 사용합니다.
- 파일명 규칙: `YYYY-MM-DD-short-title.md` (예: `2025-09-18-docs-consolidation.md`).
- 필수 적용 범위: `code_edit`, `file_create`, `implementation`, `server_ops`.
- PR 규칙: PR 본문 상단에 해당 Plan 파일 링크를 포함합니다.
- 권장 필드: 목적/범위, 산출물, 변경 파일, 리스크/롤백, 검증 방법, 체크리스트.

### PRD 문서

- 위치: `docs/project/`에 PRD(제품 요구사항)를 저장합니다.
- 문서 루트와 정본 구분: PRD 정본은 항상 `docs/project/`에 둡니다.
- 작성 참고: `docs/README.md`의 "PRD 문서 개요" 섹션과 `docs/project/prd/` 사례를 확인합니다.
- 권장 Frontmatter: `title`, `owner`, `status`, `version`, `updated`, `scope`, `tags`, `related`.
- 연계: 관련 이슈/PR/문서(`docs/**`)에 PRD 링크를 첨부해 추적성을 유지합니다.

### 개발 명령어

```bash
# 개발
yarn dev              # 개발 서버 시작 (포트 3000)
yarn build            # 프로덕션용 빌드
yarn start            # 프로덕션 서버 시작

# 코드 품질
yarn lint             # ESLint 실행
yarn type-check       # TypeScript 확인

# 스토리북
yarn sb               # 스토리북 시작
yarn build:sb         # 스토리북 빌드
```

### 개발 워크플로우

1. **개발 시작 전**: 핵심 문서(coding_style.md, frontend_rules.md) 확인
2. **개발 중**: 패턴과 가이드라인 준수
3. **제출 전**: `code_review.md` 체크리스트 기반 셀프 리뷰
4. **배포 시**: 빌드 및 테스트 통과 확인

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 문의

프로젝트에 대한 질문이나 제안사항이 있으시면 이슈를 생성해 주세요.
