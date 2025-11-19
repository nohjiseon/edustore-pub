/**
 * Search Entity Model Schemas
 * Zod를 사용한 Model 검증 스키마만 정의
 * (타입 정의는 src/types/search.ts 참조)
 */

import type { StaticImageData } from 'next/image'
import { z } from 'zod'

// ============================================================================
// Zod Schemas for Model
// ============================================================================

export const SearchResultItemModelSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  price: z.number(),
  rating: z.number(),
  imageSrc: z.union([
    z.string(),
    z.custom<StaticImageData>(
      (val) =>
        typeof val === 'object' &&
        val !== null &&
        'src' in (val as Record<string, unknown>),
      'StaticImageData expected'
    )
  ]),
  author: z.object({
    name: z.string(),
    avatar: z.string().optional()
  }),
  tags: z.object({
    grade: z.string().optional(),
    subject: z.string().optional(),
    type: z.string().optional(),
    format: z.string().optional()
  }),
  createdAt: z.string(),
  updatedAt: z.string()
})

export const SearchResultModelSchema = z.object({
  items: z.array(SearchResultItemModelSchema),
  total: z.number(),
  page: z.number(),
  size: z.number(),
  hasNext: z.boolean(),
  totalPages: z.number()
})

export const PaginationModelSchema = z.object({
  page: z.number(),
  size: z.number(),
  total: z.number(),
  hasNext: z.boolean(),
  totalPages: z.number()
})
