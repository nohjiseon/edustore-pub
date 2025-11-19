'use client'

import { useParams, useRouter } from 'next/navigation'

import styles from './page.module.scss'
import { type SettlementItem } from '../_mock/settlementData'
import { getMockSettlementDetail } from '../_mock/settlementDetailData'

import Avatar from '@/components/ui/Avatar'
import TagList, { type Tag } from '@/components/ui/TagList'
import { Icon } from '~/components/Icon'
import { Button, Tooltip } from '~/components/ui/'

const SettlementDetailPage = () => {
  const router = useRouter()
  const params = useParams()
  const id = params?.id ? Number(params.id) : null

  // TODO: API 연동 시 교체
  const settlementDetail = id ? getMockSettlementDetail(id) : null

  // 정산 내역이 없을 경우
  if (!settlementDetail || !id) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.con_box}>
          <h1 className={styles.title}>판매한 자료 정보</h1>
          <div>정산 내역을 찾을 수 없습니다.</div>
        </div>
      </div>
    )
  }

  // TODO: API 연동 시 실제 데이터로 교체
  // 현재는 mock 데이터 구조에 tags, author 정보가 없어서 기본값 사용
  const mockTags: Tag[] = [
    { name: '초등', color: 'green' },
    { name: '국어', color: 'yellow' }
  ]

  const mockAuthor = {
    name: settlementDetail.nickname
  }

  // 숫자 포맷팅
  const formatCurrency = (amount: number): string => {
    return `${amount.toLocaleString()}`
  }

  // 정산 상태에 따른 스타일 클래스 반환
  const getStatusClass = (status: SettlementItem['status']) => {
    return status === 'completed' ? styles.blue : styles.gray
  }

  // 정산 상태 텍스트 반환
  const getStatusText = (status: SettlementItem['status']) => {
    return status === 'completed' ? '정산완료' : '정산대기'
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.con_box}>
        <h1 className={styles.title}>판매한 자료 정보</h1>
        <div className={styles.content_info_wrap}>
          <div className={styles.img_wrap}>
            <img
              src={
                typeof settlementDetail.image === 'string'
                  ? settlementDetail.image
                  : settlementDetail.image.src
              }
              alt={settlementDetail.contentTitle}
            />
          </div>
          <div className={styles.content_info}>
            <div>
              <TagList tags={mockTags} />
              <h3 className={styles.content_title}>
                {settlementDetail.contentTitle}
              </h3>
              <Avatar name={mockAuthor.name} size={22} />
            </div>
            <span className={styles.content_price}>
              {formatCurrency(settlementDetail.price)}원
            </span>
          </div>
        </div>

        <strong className={styles.subtitle}>기본 정보</strong>
        <div className={styles.table_wrap}>
          <table className={styles.detail_table}>
            <colgroup>
              <col style={{ width: '9.375rem' }} />
              <col style={{ width: 'calc(100% - 9.375rem)' }} />
            </colgroup>
            <tbody>
              <tr>
                <th>정산 상태</th>
                <td>
                  <span
                    className={`${styles.status_tag} ${getStatusClass(
                      settlementDetail.status
                    )}`}
                  >
                    {getStatusText(settlementDetail.status)}
                  </span>
                </td>
              </tr>
              <tr>
                <th>닉네임</th>
                <td>{settlementDetail.nickname}</td>
              </tr>
              <tr>
                <th>정산 신청일</th>
                <td>{settlementDetail.requestDate}</td>
              </tr>
              <tr>
                <th>정산일 기준</th>
                <td>{settlementDetail.settlementPeriod}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <strong className={styles.subtitle}>판매 정보</strong>
        <div className={styles.table_wrap}>
          <table className={styles.detail_table}>
            <colgroup>
              <col style={{ width: '9.375rem' }} />
              <col style={{ width: 'calc(100% - 9.375rem)' }} />
            </colgroup>
            <tbody>
              <tr>
                <th>판매 금액</th>
                <td>{formatCurrency(settlementDetail.price)}원</td>
              </tr>
              <tr>
                <th>판매건수</th>
                <td>{settlementDetail.salesCount}건</td>
              </tr>
              <tr>
                <th>총 매출액</th>
                <td>{formatCurrency(settlementDetail.totalSales)}원</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={styles.info_tooltip_wrap}>
          <strong className={styles.subtitle}>수수료</strong>
          <Tooltip
            className={styles.info_tooltip}
            title='PG 부가세'
            content={
              <>
                PG 수수료에 부과되는 부가가치세(VAT) 금액입니다.
                <br />
                결제대행 수수료의 10%가 부가세로 산정됩니다.
                <div className={styles.info_ctt}>
                  <strong className={styles.tip_title}>서비스 수수료</strong>
                  <p>
                    수업가게 플랫폼을 통해 자료를 판매할 때 발생하는 서비스 이용
                    수수료입니다.
                    <br />
                    판매 금액에서 일정 비율이 차감되어 정산됩니다.
                  </p>
                </div>
                <div className={styles.info_ctt}>
                  <strong className={styles.tip_title}>PG 수수료</strong>
                  <p>
                    결제대행(PG) 서비스를 이용할 때 발생하는 수수료입니다.
                    <br />
                    결제 건당 결제대행사(PG사)에 지불되는 기본 수수료를
                    의미합니다.
                  </p>
                </div>
              </>
            }
            top='-1.875rem'
            left='2.25rem'
            width='27.6875rem'
          >
            <button className={styles.info_btn}>
              <Icon name='info' color='var(--color-neutral-grey-3)' />
            </button>
          </Tooltip>
        </div>
        <div className={styles.table_wrap}>
          <table className={styles.detail_table}>
            <colgroup>
              <col style={{ width: '9.375rem' }} />
              <col style={{ width: 'calc(100% - 9.375rem)' }} />
            </colgroup>
            <tbody>
              <tr>
                <th>PG 수수료</th>
                <td>{formatCurrency(settlementDetail.pgFee)}원</td>
              </tr>
              <tr>
                <th>PG 부가세</th>
                <td>{formatCurrency(settlementDetail.pgVat)}원</td>
              </tr>
              <tr>
                <th>서비스 수수료</th>
                <td>{formatCurrency(settlementDetail.serviceFee)}원</td>
              </tr>
              <tr>
                <th>정산 금액</th>
                <td>{formatCurrency(settlementDetail.settlementAmount)}원</td>
              </tr>
            </tbody>
          </table>
        </div>

        <strong className={styles.subtitle}>정산 계좌 정보</strong>
        <div className={styles.table_wrap}>
          <table className={styles.detail_table}>
            <colgroup>
              <col style={{ width: '9.375rem' }} />
              <col style={{ width: 'calc(100% - 9.375rem)' }} />
            </colgroup>
            <tbody>
              <tr>
                <th>은행 계좌</th>
                <td>{settlementDetail.account}</td>
              </tr>
              <tr>
                <th>예금주</th>
                <td>{settlementDetail.accountHolder}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <strong className={styles.subtitle}>정산액 입금일</strong>
        <div className={styles.table_wrap}>
          <table className={styles.detail_table}>
            <colgroup>
              <col style={{ width: '9.375rem' }} />
              <col style={{ width: 'calc(100% - 9.375rem)' }} />
            </colgroup>
            <tbody>
              <tr>
                <th>계좌이체</th>
                <td>오늘 결제액 ~ 영업일 기준 6일 이내 입금</td>
              </tr>
            </tbody>
          </table>
        </div>

        <ul className={styles.info_list}>
          <li>
            정산액 입금 전 주말 또는 공휴일이 있을 경우 입금이 늦어질 수 있어요.
          </li>
          <li>관리자 승인 여부에 따라 정산이 거부되는 경우, 문의해주세요.</li>
        </ul>

        <div className={styles.flex_center}>
          <Button variant='outline' width={376} onClick={() => router.back()}>
            <Icon name='chevron-left-s' />
            목록으로
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SettlementDetailPage
