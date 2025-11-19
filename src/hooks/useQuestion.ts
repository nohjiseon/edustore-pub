/**
 * 문의 관련 커스텀 훅
 * - 문의 목록 조회
 */

import { useQuery } from '@tanstack/react-query'

import { questionQueryKeys } from '@/constants/query-keys'
import { questionService } from '@/services/question.service'
import type { QuestionListData, QuestionQueryParams } from '@/types/question'

/**
 * 문의 목록을 조회하는 훅
 *
 * @param params - 쿼리 파라미터 (page, size, productNo, keyword)
 * @returns TanStack Query 결과 객체
 *
 * @example
 * ```tsx
 * function InquirySection({ productNo }: { productNo: number }) {
 *   const { data: questionData, isLoading, error } = useQuestions({
 *     productNo,
 *     page: 1,
 *     size: 10
 *   })
 *
 *   if (isLoading) return <div>문의를 불러오는 중...</div>
 *   if (error) return <div>오류 발생: {error.message}</div>
 *   if (!questionData) return <div>문의가 없습니다</div>
 *
 *   return (
 *     <div>
 *       <h2>전체 문의 수: {questionData.total}</h2>
 *       <ul>
 *         {questionData.list.map((question) => (
 *           <li key={question.questionNo}>
 *             <h3>{question.title}</h3>
 *             <p>{question.content}</p>
 *           </li>
 *         ))}
 *       </ul>
 *     </div>
 *   )
 * }
 * ```
 */
export const useQuestions = (params?: QuestionQueryParams) => {
  return useQuery<QuestionListData, Error>({
    queryKey: questionQueryKeys.list(params),
    queryFn: () => questionService.getQuestionsData(params),
    staleTime: 3 * 60 * 1000, // 3분 - 문의는 자주 변경될 수 있음
    gcTime: 10 * 60 * 1000, // 10분 - 캐시 유지 시간
    retry: 2, // 실패 시 2번 재시도
    enabled: !!params?.productNo && params.productNo > 0 // productNo가 유효한 경우에만 쿼리 실행
  })
}
