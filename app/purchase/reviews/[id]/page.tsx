interface ReviewDetailPageProps {
  params: Promise<{ id: string }>
}

const ReviewDetailPage = ({ params }: ReviewDetailPageProps) => {
  return <h1>후기 상세정보</h1>
}

export default ReviewDetailPage
