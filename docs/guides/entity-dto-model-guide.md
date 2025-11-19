---
title: Entity 레이어 - DTO와 Model 역할 가이드
audience: developer
scope: frontend, architecture
tags: [guides, entity, architecture, typescript]
version: 1.0.0
updated: 2025-10-16
---

# Entity 레이어 - DTO와 Model 역할 가이드

> 이 문서는 프론트엔드의 Data Domain 구조에서 **DTO(Data Transfer Object)**와 **Model(Domain Model)**의 역할을 설명합니다. API 통신부터 UI 렌더링까지의 데이터 흐름을 이해하기 위한 필수 가이드입니다.

---

## 📌 핵심 개념

프론트엔드에서 API와 상호작용할 때, 데이터는 여러 계층을 거치면서 변환됩니다. **DTO**와 **Model**은 이 과정에서 각각 다른 책임을 담당합니다.

### 간단한 비유

**DTO(Data Transfer Object)** = 배송 물품 그대로

- 백엔드 API에서 받은 데이터 그대로의 형태입니다
- 필드명, 데이터 타입이 API 명세와 정확히 일치합니다
- "이 물품이 배송되는 상태"와 같습니다

**Model(Domain Model)** = 우리 집에 맞게 정리된 물품

- 프론트엔드에서 필요한 형태로 변환된 데이터입니다
- UI에 필요한 정보로 재구성되어 있습니다
- "우리가 실제로 사용하기 편한 형태"로 정리된 상태와 같습니다

---

## 🏗️ 전체 데이터 흐름

```
┌────────────────────────────────────────────────────────┐
│                    데이터 이동 흐름                        │
└────────────────────────────────────────────────────────┘

1️⃣ API 호출
   └─> 백엔드로 요청 전송

2️⃣ API 응답 수신
   └─> 원본 데이터 (DTO 형태)

3️⃣ DTO 검증
   └─> Zod 스키마로 런타임 검증

4️⃣ DTO → Model 변환
   └─> Mapper가 필요한 형태로 변환

5️⃣ Model 사용
   └─> UI 컴포넌트에서 렌더링

6️⃣ 캐싱 및 상태 관리
   └─> TanStack Query로 캐시 관리
```

---

## 🎯 DTO의 역할

### DTO는 "외부 세계(백엔드 API)와의 통신 계약"입니다.

#### 정의

- **API 응답 데이터의 형태를 정의하는 타입**
- 백엔드 API 명세(swagger.json)와 정확히 일치합니다
- 네트워크를 통해 받은 "있는 그대로의 데이터"입니다

#### 특징

- **필드명이 API와 동일**: 백엔드에서 `productNo`라면, DTO도 `productNo`입니다
- **타입이 원본 그대로**: 가격이 문자열로 올 수 있다면, `price: number | string`입니다
- **선택 필드 허용**: API에서 제공할 수도, 안 할 수도 있는 필드는 Optional입니다

#### 책임

1. **검증**: Zod 스키마로 API 응답이 올바른 형태인지 확인
2. **타입 안전성**: TypeScript 컴파일 타임에 타입 오류 감지
3. **계약**: "이 API는 이런 형태의 데이터를 반환한다"는 약속

#### 위치

```
src/types/search.ts
├── SearchCommandDto (API 요청)
├── ProductDetailViewDto (API 응답)
├── ProductViewDto (상세 정보)
├── MemberViewDto (회원 정보)
└── ... (기타 DTO들)
```

#### 검증 방식

```
API 응답 데이터
    ↓
Zod 스키마 검증 (safeParse)
    ├─ ✅ 성공: Model로 변환
    └─ ❌ 실패: 오류 로깅, 기본값 반환
```

---

## 🎯 Model의 역할

### Model은 "UI에서 사용하기 위한 정규화된 데이터"입니다.

#### 정의

- **프론트엔드에서 실제로 필요한 형태로 정규화된 타입**
- API의 여러 필드를 결합하거나, 불필요한 필드를 제거합니다
- "UI가 쉽게 다룰 수 있는 형태"로 재구성됩니다

#### 특징

- **UI 친화적**: 화면에 표시하기 위한 데이터만 포함
- **일관된 형태**: 같은 종류의 데이터는 항상 같은 구조
- **기본값 처리 완료**: 필드가 없으면 기본값이 이미 설정됨
- **필드 명확성**: 모든 필드가 필수 (Optional 없음)

#### 책임

1. **데이터 변환**: DTO → Model로 필요한 형태로 변환
2. **정규화**: 문자열 가격을 숫자로, 없는 이미지를 기본값으로
3. **접근성**: UI에서 쉽게 접근할 수 있는 구조 제공

#### 위치

```
src/types/search.ts
├── SearchResultModel (검색 결과 리스트)
├── SearchResultItemModel (검색 결과 항목)
└── PaginationModel (페이지네이션)
```

#### 변환 방식

```
DTO (API 응답)
    ↓
Mapper 함수 (변환 로직)
    ├─ 필드 정규화 (string → number)
    ├─ 기본값 설정
    ├─ 필드 필터링
    └─ 구조 재정렬
    ↓
Model (UI 사용)
```

---

## 🔄 DTO와 Model의 구체적인 차이

### 실제 예제를 통한 이해

#### DTO 예제 (API 응답 그대로)

```
API 응답:
{
  "product": {
    "productNo": 123,
    "productId": "PROD_001",
    "title": "수학 교재",
    "description": "중고등 수학",
    "price": "15000",              ← 문자열 (가능)
    "rating": null                 ← null 가능
  },
  "thumbnails": [
    {
      "url": "https://...",
      "imageUrl": "https://...",   ← 여러 필드명 가능
      "thumbnailUrl": "https://..."
    }
  ],
  "memberView": {
    "name": "강사명",
    "profileImage": "https://...",
    "profileImageUrl": "https://...",
    "avatar": "https://..."        ← 여러 필드명 가능
  },
  "gradeSubjects": [],             ← 빈 배열 가능
  "forms": null,                   ← null 가능
  "categories": undefined          ← 필드 자체가 없을 수 있음
}
```

**DTO의 특징**:

- 필드가 없을 수 있음 (Optional)
- 타입이 여러 개일 수 있음 (price: `number | string`)
- null이나 undefined 가능
- 여러 필드명이 같은 의미를 표현 (`url`, `imageUrl`, `thumbnailUrl`)

#### Model 예제 (UI에서 사용하는 형태)

```
변환된 데이터:
{
  "id": 123,                       ← 단일 ID
  "title": "수학 교재",
  "description": "중고등 수학",
  "price": 15000,                  ← 항상 숫자
  "rating": 5.0,                   ← 항상 숫자 (기본값 설정됨)
  "imageSrc": "https://...",       ← 단일 필드명
  "author": {
    "name": "강사명",
    "avatar": "https://..."        ← 단일 필드명 (기본값 또는 undefined)
  },
  "tags": {
    "grade": "초등",               ← 기본값이 설정됨
    "subject": "수학",
    "type": "개념학습",
    "format": "PDF"
  },
  "createdAt": "2025-10-16T...",   ← 정규화된 형식
  "updatedAt": "2025-10-16T..."
}
```

**Model의 특징**:

- 모든 필드가 존재 (필수)
- 타입이 명확함 (항상 `number`, 항상 `string`)
- null/undefined 없음 (기본값으로 처리됨)
- 필드명이 일관됨
- UI에서 안전하게 접근 가능

---

## 📊 DTO와 Model 비교표

| 항목          | DTO                             | Model                          |
| ------------- | ------------------------------- | ------------------------------ |
| **역할**      | API 명세와의 계약               | UI에서 사용하기 위한 데이터    |
| **필드 존재** | Optional (있을 수도, 없을 수도) | 필수 (항상 존재)               |
| **타입**      | 다양 (`string \| number`)       | 단일 (`number`)                |
| **기본값**    | 없음 (null/undefined 가능)      | 있음 (모든 필드가 값을 가짐)   |
| **필드명**    | API 그대로                      | 통일된 명명                    |
| **검증**      | Zod 스키마                      | 이미 검증됨                    |
| **위치**      | `src/types/search.ts`           | `src/types/search.ts`          |
| **스키마**    | `src/entities/search/dto.ts`    | `src/entities/search/model.ts` |
| **변환**      | -                               | Mapper에서 DTO로부터 생성      |
| **사용처**    | API 서비스 레이어               | UI 컴포넌트                    |

---

## 🛠️ 실제 구현 위치

### 타입 정의 (여기에만 interface/type이 정의됨)

```
src/types/search.ts
├── UI 타입 (ContentCardData, TagData 등)
├── Model 타입 (SearchResultModel, SearchResultItemModel)
├── DTO 타입 (SearchCommandDto, ProductDetailViewDto)
└── Legacy 타입 별칭 (호환성 유지)
```

### Zod 스키마 (검증과 변환)

```
src/entities/search/
├── model.ts
│   └── Model Zod 스키마 (검증용)
│       ├── SearchResultItemModelSchema
│       ├── SearchResultModelSchema
│       └── PaginationModelSchema
│
├── dto.ts
│   ├── DTO Zod 스키마 (검증용)
│   │   ├── SearchCommandDtoSchema
│   │   ├── ProductViewDtoSchema
│   │   └── SearchApiResponseDtoSchema
│   └── 검증 헬퍼 함수
│       ├── validateSearchCommand()
│       └── validateSearchResponse()
│
└── mapper.ts
    └── DTO → Model 변환 함수
        ├── toSearchResultItem()
        ├── toSearchResult()
        └── toSearchCommandDto()
```

---

## 🔀 변환 프로세스 상세 설명

### Step 1: API 호출

```
서비스 레이어가 백엔드 API 호출:
- 요청: SearchCommandDto 타입의 객체
- URL: /search/v1/search
- 응답: 백엔드에서 보낸 JSON (원본 데이터)
```

### Step 2: DTO 검증

```
Zod 스키마로 검증:
- 응답이 SearchApiResponseDtoSchema와 일치하는지 확인
- 성공: 다음 단계로
- 실패: 오류 로깅 후 예외 발생
```

### Step 3: DTO → Model 변환

```
Mapper 함수가 변환:
- 문자열 가격을 숫자로 변환
- 없는 이미지를 기본 이미지로 설정
- 없는 평점을 기본값 5.0으로 설정
- 단일 필드명으로 통일 (url → imageSrc)
- 빈 배열을 기본값으로 설정 (학년 미설정 등)
```

### Step 4: Model 사용

```
UI 컴포넌트에서 안전하게 사용:
- 모든 필드가 존재함을 보장
- 타입이 명확함 (price는 항상 number)
- 기본값이 이미 설정되어 있음
- null/undefined 체크 불필요
```

---

## 🎓 왜 이렇게 나누나?

### 장점 1: 백엔드 변경에 강함

만약 API 응답 형태가 바뀐다면?

```
변경 전: { price: 15000 }          (number)
변경 후: { price: "15000" }        (string)

DTO 레이어에서만 처리 (model은 변경 없음):
├── DTO: price: number | string (수정)
├── Mapper: 변환 로직 수정 (수정)
└── Model: price: number (변경 없음) ✅
```

### 장점 2: UI 개발 안정성

```
API에서 price 필드를 제공하지 않아도:
- DTO: price?: number (Optional)
- Mapper: 기본값으로 0 설정
- Model: price: number (필수) ✅
- UI: `product.price`로 안전하게 접근
```

### 장점 3: 타입 안전성

```
컴파일 타임에 오류 감지:

❌ 없는 코드 (Model 사용):
const total = item.totalPrice  // Model에 없는 필드
                ↑ TypeScript 오류!

✅ 올바른 코드:
const price = item.price  // Model에 있는 필드 ✅
```

### 장점 4: 테스트 용이

```
각 계층을 독립적으로 테스트:
- DTO 검증: "API 응답이 올바른가?"
- Mapper: "변환이 정확한가?"
- Model: "UI에서 사용 가능한가?"
```

---

## 📝 개발자 가이드

### "어디에 타입을 정의해야 하나?"

| 상황                    | 정의 위치                          | 이유            |
| ----------------------- | ---------------------------------- | --------------- |
| API 응답 형태를 정의    | `src/types/search.ts` (DTO)        | 백엔드와의 계약 |
| UI에서 사용할 형태 정의 | `src/types/search.ts` (Model)      | UI 요구사항     |
| 값을 변환하는 로직      | `src/entities/search/mapper.ts`    | 변환 책임       |
| 검증 규칙 정의          | `src/entities/search/dto.ts` (Zod) | 런타임 검증     |

### "DTO를 Model로 변환할 때 실패하면?"

```
변환 실패 처리 (Mapper):
1. try-catch로 오류 잡음
2. 오류 로깅
3. null 반환
4. UI: null 체크로 폴백 처리

이 방식으로 앱이 안정적으로 동작
```

### "새로운 API를 추가하려면?"

```
1단계: src/types/search.ts에 타입 정의
  └─ API 응답 형태의 DTO
  └─ UI가 필요한 형태의 Model

2단계: src/entities/search/dto.ts에 Zod 스키마 추가
  └─ DTO 검증

3단계: src/entities/search/model.ts에 Model 스키마 추가
  └─ (선택) 추가 검증 필요시

4단계: src/entities/search/mapper.ts에 변환 함수 추가
  └─ DTO → Model 변환 로직

5단계: 서비스 레이어에서 사용
  └─ API 호출 → DTO 검증 → Model 변환 → UI 전달
```

---

## ⚠️ 흔한 실수

### 실수 1: DTO와 Model을 혼용

```
❌ 잘못된 코드:
function getSearchResults(query: SearchResultModel) {
  // Model을 API 전송 데이터로 사용
  return api.post('/search', query)
}

✅올바른 코드:
function getSearchResults(query: SearchCommandDto) {
  // DTO를 API 전송 데이터로 사용
  return api.post('/search', query)
}
```

### 실수 2: Mapper를 거치지 않고 DTO를 바로 사용

```
❌ 잘못된 코드:
const { data: results } = useSearchQuery()
// results는 SearchApiResponseDto (원본)
return results.list.map(item => <Card price={item.product.price} />)
                                           ↑ number | string (불안정)

✅ 올바른 코드:
const { data: results } = useSearchQuery()
// results는 SearchResultModel (변환됨)
return results.items.map(item => <Card price={item.price} />)
                                           ↑ number (안정)
```

### 실수 3: 기본값을 Model에만 설정

```
❌ 잘못된 코드:
// Model에만 기본값 설정
interface SearchResultItemModel {
  rating: number = 5.0  ← 인터페이스에 기본값 불가
}

✅ 올바른 코드:
// Mapper에서 기본값 설정
export const toSearchResultItem = (dto: ProductDetailViewDto) => {
  return {
    rating: dto.product?.rating || 5.0  ← 여기서 설정
  }
}
```

---

## 🚀 모범 사례

### 1. 명확한 책임 분리

```
✅ 좋은 구조:
- types/search.ts: 타입만 정의
- dto.ts: DTO 검증 스키마만
- model.ts: Model 검증 스키마만
- mapper.ts: 변환 로직만
```

### 2. 안전한 변환

```
✅ 안전한 변환:
- null 체크 후 기본값 설정
- 타입 변환 시 오류 처리
- 변환 실패 시 null 반환
```

### 3. 문서화

```
✅ 명확한 주석:
/**
 * DTO → Model 변환
 * @param dto - API 응답 (검증됨)
 * @returns Model (UI 사용 가능)
 */
export const toSearchResultItem = (dto: ProductDetailViewDto) => {
  // ...
}
```

---

## 📚 관련 문서

- **[API 연동 가이드](./api-integration.md)**: API 호출 방식
- **[TypeScript 스타일 가이드](../conventions/coding-style.md)**: 타입 정의 규칙
- **[Feature Module 가이드](./feature-module-guide.md)**: 전체 기능 구현 흐름

---

## 🎯 요약

| 개념       | 설명                                 |
| ---------- | ------------------------------------ |
| **DTO**    | 백엔드 API와의 계약 (원본 그대로)    |
| **Model**  | UI에서 사용하기 위한 정규화된 데이터 |
| **Mapper** | DTO → Model 변환 책임                |
| **타입**   | `src/types/search.ts`에만 정의       |
| **스키마** | Zod로 검증 규칙 정의                 |
| **변환**   | Null-safe, 기본값 처리 포함          |

**핵심**: DTO와 Model을 명확히 분리하면, 백엔드 변경에 강하고, 타입 안전한 프론트엔드를 만들 수 있습니다.
