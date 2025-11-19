/**
 * 상품 관련 커스텀 훅
 * - 상품 기본 정보 조회
 * - 상품 상세 정보 조회
 * - 상품 리뷰 목록 조회
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { productQueryKeys, reviewQueryKeys } from '@/constants/query-keys'
import { productService } from '@/services/product.service'
import { reviewService } from '@/services/review.service'
import type {
  ProductData,
  ProductDetailData,
  ProductCreateRequest,
  ProductCreateResponse
} from '@/types/product'
import type { ProductReviewsData, ReviewQueryParams } from '@/types/review'

/**
 * 상품 기본 정보를 조회하는 훅
 *
 * @param productNo - 상품 번호
 * @returns TanStack Query 결과 객체
 *
 * @example
 * ```tsx
 * function ProductPage({ productNo }: { productNo: number }) {
 *   const { data: product, isLoading, error } = useProductInfo(productNo)
 *
 *   if (isLoading) return <div>로딩 중...</div>
 *   if (error) return <div>오류 발생: {error.message}</div>
 *   if (!product) return <div>상품을 찾을 수 없습니다</div>
 *
 *   return (
 *     <div>
 *       <h1>{product.productNm}</h1>
 *       <p>{product.description}</p>
 *       <p>가격: {product.price}원</p>
 *     </div>
 *   )
 * }
 * ```
 */
export const useProductData = (productNo: number) => {
  return useQuery<ProductData, Error>({
    queryKey: productQueryKeys.basic(productNo),
    queryFn: () => productService.getBasicData(productNo),
    staleTime: 5 * 60 * 1000, // 5분 - 상품 정보는 자주 변경되지 않음
    gcTime: 10 * 60 * 1000, // 10분 - 캐시 유지 시간
    retry: 2, // 실패 시 2번 재시도
    enabled: !!productNo && productNo > 0 // productNo가 유효한 경우에만 쿼리 실행
  })
}

/**
 * 상품 상세 정보를 조회하는 훅
 *
 * @param productNo - 상품 번호
 * @returns TanStack Query 결과 객체
 *
 * @example
 * ```tsx
 * function ProductDetailPage({ productNo }: { productNo: number }) {
 *   const { data: productDetail, isLoading, error } = useProductDetailData(productNo)
 *
 *   if (isLoading) return <div>로딩 중...</div>
 *   if (error) return <div>오류 발생: {error.message}</div>
 *   if (!productDetail) return <div>상품을 찾을 수 없습니다</div>
 *
 *   return (
 *     <div>
 *       <h1>{productDetail.product.productNm}</h1>
 *       <p>{productDetail.product.description}</p>
 *       <p>가격: {productDetail.product.price}원</p>
 *       <div>카테고리: {productDetail.categories.map(c => c.categoryNm).join(', ')}</div>
 *       <div>썸네일: {productDetail.thumbnails.length}개</div>
 *     </div>
 *   )
 * }
 * ```
 */
export const useProductDetailData = (productNo: number) => {
  return useQuery<ProductDetailData, Error>({
    queryKey: productQueryKeys.detail(productNo),
    queryFn: () => productService.getDetailData(productNo),
    staleTime: 5 * 60 * 1000, // 5분 - 상품 정보는 자주 변경되지 않음
    gcTime: 10 * 60 * 1000, // 10분 - 캐시 유지 시간
    retry: 2, // 실패 시 2번 재시도
    enabled: !!productNo && productNo > 0 // productNo가 유효한 경우에만 쿼리 실행
  })
}

/**
 * 상품 리뷰 목록을 조회하는 훅
 *
 * @param productNo - 상품 번호
 * @param params - 쿼리 파라미터 (sortType, page, size)
 * @returns TanStack Query 결과 객체
 *
 * @example
 * ```tsx
 * function ProductReviewSection({ productNo }: { productNo: number }) {
 *   const { data: reviewsData, isLoading, error } = useProductReviews(productNo, {
 *     sortType: 'LATEST'
 *   })
 *
 *   if (isLoading) return <div>리뷰를 불러오는 중...</div>
 *   if (error) return <div>오류 발생: {error.message}</div>
 *   if (!reviewsData) return <div>리뷰가 없습니다</div>
 *
 *   return (
 *     <div>
 *       <h2>평균 평점: {reviewsData.averageRating}</h2>
 *       <p>전체 리뷰 수: {reviewsData.totalCount}</p>
 *       <ul>
 *         {reviewsData.reviews.map((review) => (
 *           <li key={review.reviewNo}>
 *             <span>평점: {review.rating}</span>
 *             <p>{review.content}</p>
 *           </li>
 *         ))}
 *       </ul>
 *     </div>
 *   )
 * }
 * ```
 */
export const useProductReviews = (
  productNo: number,
  params?: ReviewQueryParams
) => {
  return useQuery<ProductReviewsData, Error>({
    queryKey: reviewQueryKeys.productReviewList(productNo, params),
    queryFn: () => reviewService.getProductReviewsData(productNo, params),
    staleTime: 3 * 60 * 1000, // 3분 - 리뷰는 상품 정보보다 자주 변경될 수 있음
    gcTime: 10 * 60 * 1000, // 10분 - 캐시 유지 시간
    retry: 2, // 실패 시 2번 재시도
    enabled: !!productNo && productNo > 0 // productNo가 유효한 경우에만 쿼리 실행
  })
}

/**
 * 상품 생성 mutation 훅
 *
 * @returns TanStack Query mutation 객체
 *
 * @example
 * ```tsx
 * function ProductUploadPage() {
 *   const createProduct = useCreateProduct()
 *
 *   const handleSubmit = async () => {
 *     try {
 *       const result = await createProduct.mutateAsync({
 *         command: {
 *           productNm: '초등 3학년 국어 자료',
 *           description: '한줄 설명',
 *           detailDescription: '상세 설명',
 *           priceType: '01',
 *           price: 0,
 *           theme: '국어',
 *           productStatus: '03',
 *           hashtags: '국어,3학년',
 *           gradeSubjects: 'E01,S01',
 *           categories: 'C01',
 *           forms: 'F01'
 *         },
 *         mainThumbnail: 'thumbnail.jpg',
 *         otherThumbnailFiles: [],
 *         attachmentFiles: ['file1.pdf']
 *       })
 *       console.log('생성된 상품 번호:', result.data)
 *       router.push(`/content/${result.data}`)
 *     } catch (error) {
 *       console.error('상품 생성 실패:', error)
 *     }
 *   }
 *
 *   return (
 *     <button onClick={handleSubmit} disabled={createProduct.isPending}>
 *       {createProduct.isPending ? '등록 중...' : '등록하기'}
 *     </button>
 *   )
 * }
 * ```
 */
export const useCreateProduct = () => {
  const queryClient = useQueryClient()

  return useMutation<ProductCreateResponse, Error, ProductCreateRequest>({
    mutationFn: (request: ProductCreateRequest) =>
      productService.create(request),
    onSuccess: () => {
      // 상품 목록 캐시 무효화 (필요한 경우)
      queryClient.invalidateQueries({ queryKey: productQueryKeys.all() })
    }
  })
}
