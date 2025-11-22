'use client'

import { useState, useMemo, useEffect } from 'react'

import styles from '../page.module.scss'
import AccountAlertModal from './_components/AccountAlertModal'

import {
  BANKS,
  BANK_NAMES,
  getBankCodeByName,
  getBankNameByCode
} from '@/constants/bank'
import type { BankAccount } from '@/services/account.service'
import { accountService } from '@/services/account.service'
import { useAuthStore } from '@/stores/auth'
import EmptyState from '~/components/common/EmptyState'
import {
  Button,
  Checkbox,
  FilterDropdown,
  Pagination,
  RadioLabel
} from '~/components/ui'

const AccountManagePage = () => {
  // Zustand store에서 사용자 정보 가져오기
  const user = useAuthStore((state) => state.user)
  const accountHolderName = user?.name || '홍길동' // 사용자 이름, 없으면 기본값

  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(10)
  const [selectedBank, setSelectedBank] = useState<string>('국민은행') // 은행명
  const [selectedBankCode, setSelectedBankCode] = useState<string>('004') // 은행 코드 (국민은행 기본값)
  const [accountType, setAccountType] = useState<'primary' | 'normal'>(
    'primary'
  )
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [newAccountNumber, setNewAccountNumber] = useState<string>('')
  const [accounts, setAccounts] = useState<BankAccount[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [totalPages, setTotalPages] = useState(1)
  const [primaryAccountId, setPrimaryAccountId] = useState<number | null>(null) // bankAccountNo 저장
  const [pendingPrimaryId, setPendingPrimaryId] = useState<number | null>(null)
  const [modalType, setModalType] = useState<
    'changeConfirm' | 'changeError' | 'deleteError' | 'addError' | null
  >(null)

  // 계좌 목록 조회
  const fetchAccounts = async (page: number = 1) => {
    setIsLoading(true)
    try {
      const response = await accountService.getBankAccounts({
        page,
        size: pageSize
      })

      const accountList = response?.data?.list || []
      setAccounts(accountList)

      // 총 페이지 수 계산
      const total = response?.data?.total || 0
      const calculatedTotalPages = Math.ceil(total / pageSize) || 1
      setTotalPages(calculatedTotalPages)
    } catch (error) {
      console.error('계좌 목록 조회 실패:', error)
      setAccounts([])
      setTotalPages(1)
    } finally {
      setIsLoading(false)
    }
  }

  // 초기 로드 및 페이지 변경 시 데이터 조회
  useEffect(() => {
    fetchAccounts(currentPage)
  }, [currentPage])

  useEffect(() => {
    const primary = accounts.find((account) => account.isPrimary)

    if (primary) {
      setPrimaryAccountId((prev) =>
        prev === primary.bankAccountNo ? prev : primary.bankAccountNo
      )
      return
    }

    // 대표계좌가 없으면 첫 번째 계좌를 대표계좌로 설정하지 않음 (서버에서 관리)
    setPrimaryAccountId(null)
  }, [accounts])

  // 대표계좌가 있는지 확인
  const hasPrimaryAccount = useMemo(() => {
    return accounts.some((account) => account.isPrimary)
  }, [accounts])

  // 대표계좌 유무에 따라 계좌구분 초기값 설정
  useEffect(() => {
    if (hasPrimaryAccount) {
      // 대표계좌가 있으면 일반계좌에 체크
      setAccountType('normal')
    } else {
      // 대표계좌가 없으면 대표계좌에 체크
      setAccountType('primary')
    }
  }, [hasPrimaryAccount])

  // 전체 선택 상태
  const isAllChecked =
    accounts.length > 0 &&
    accounts.every((item) => selectedIds.includes(item.bankAccountNo))

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // 전체 선택/해제
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(accounts.map((item) => item.bankAccountNo))
    } else {
      setSelectedIds([])
    }
  }

  const handlePrimaryChange = (id: number) => {
    if (primaryAccountId === id) {
      return
    }

    setPendingPrimaryId(id)
    setModalType('changeConfirm')
  }

  const changePrimaryAccount = async (targetAccountId: number) => {
    // TODO: API 연동 시 실제 대표 계좌 변경 요청으로 교체
    return true
  }

  const handleConfirmPrimaryChange = async () => {
    if (!pendingPrimaryId) return

    try {
      const isSuccess = await changePrimaryAccount(pendingPrimaryId)

      if (!isSuccess) {
        throw new Error('PRIMARY_ACCOUNT_CHANGE_FAILED')
      }

      // API 호출 후 목록 다시 조회
      await fetchAccounts(currentPage)
      setModalType(null)
    } catch (error) {
      setModalType('changeError')
    } finally {
      setPendingPrimaryId(null)
    }
  }

  const handleCloseModal = () => {
    setModalType((prev) => {
      if (prev === 'changeConfirm') {
        setPendingPrimaryId(null)
      }
      return null
    })
  }

  // 다중 계좌 삭제
  const handleDeleteAccounts = async () => {
    if (selectedIds.length === 0) {
      return
    }

    if (primaryAccountId && selectedIds.includes(primaryAccountId)) {
      setModalType('deleteError')
      return
    }

    try {
      setIsLoading(true)

      // API 호출하여 계좌 삭제 (다중 삭제 시 콤마로 구분)
      const response = await accountService.deleteBankAccounts(selectedIds)
      console.log(response)

      if (
        response?.status === 200 ||
        response?.code === 200 ||
        response?.isSuccess
      ) {
        await fetchAccounts(currentPage)
        alert('계좌가 삭제되었습니다.')
        setSelectedIds([])
      } else {
        alert(response?.message || '계좌 삭제에 실패했습니다.')
      }
    } catch (error: any) {
      console.error('계좌 삭제 실패:', error)
      alert(error?.message || '계좌 삭제 중 오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  // 계좌 추가 핸들러
  const handleAddAccount = async () => {
    // 유효성 검사
    if (!selectedBankCode) {
      alert('은행을 선택해주세요.')
      return
    }

    if (!newAccountNumber || !newAccountNumber.trim()) {
      alert('계좌번호를 입력해주세요.')
      return
    }

    // 계좌번호에서 하이픈 제거 (숫자만)
    const cleanAccountNumber = newAccountNumber.replace(/-/g, '').trim()

    if (!cleanAccountNumber) {
      alert('계좌번호를 입력해주세요.')
      return
    }

    // 예금주는 Zustand store에서 가져온 사용자 이름 사용
    if (!accountHolderName || accountHolderName === '홍길동') {
      alert('사용자 정보를 불러올 수 없습니다. 다시 로그인해주세요.')
      return
    }

    try {
      setIsLoading(true)

      const response = await accountService.addBankAccount({
        bankCode: selectedBankCode,
        accountNumber: cleanAccountNumber,
        accountHolderName: accountHolderName,
        primaryYn: accountType === 'primary' ? 'Y' : 'N'
      })

      if (
        response?.status === 200 ||
        response?.code === 200 ||
        response?.isSuccess
      ) {
        alert('계좌가 추가되었습니다.')
        // 폼 초기화
        setNewAccountNumber('')
        setSelectedBank('국민은행')
        setSelectedBankCode('004')
        // 목록 다시 조회
        await fetchAccounts(currentPage)
      } else {
        alert(response?.message || '계좌 추가에 실패했습니다.')
      }
    } catch (error: any) {
      console.error('계좌 추가 실패:', error)
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        '계좌 추가 중 오류가 발생했습니다.'
      alert(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.account_wrap}>
      <p className={styles.account_infoTxt}>
        판매 정산을 받기 위해 정산용 계좌를 등록해 주세요. 예금주 명이 실제 계좌
        정보와 일치해야 합니다.
      </p>

      <strong className={styles.table_tit}>계좌 추가 등록</strong>
      <div className={styles.top_detail_wrap}>
        <div>
          <table className={styles.detail_table}>
            <colgroup>
              <col style={{ width: '9.375rem' }} />
              <col style={{ width: 'calc(100% - 9.375rem)' }} />
            </colgroup>
            <tbody>
              <tr>
                <th>은행명</th>
                <td>
                  <FilterDropdown
                    options={BANK_NAMES}
                    type='expand'
                    defaultValue='국민은행'
                    showDefaultOption={false}
                    singleSelect={true}
                    className={styles.bank_dropdown}
                    selectedValues={selectedBank ? [selectedBank] : []}
                    onSelect={(values) => {
                      const bankName =
                        values.length > 0 ? values[0] : '국민은행'
                      const bankCode = getBankCodeByName(bankName) || '004'
                      setSelectedBank(bankName)
                      setSelectedBankCode(bankCode)
                    }}
                  />
                </td>
              </tr>
              <tr>
                <th>예금주</th>
                <td className={styles.read_only}>{accountHolderName}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <table className={styles.detail_table}>
            <colgroup>
              <col style={{ width: '9.375rem' }} />
              <col style={{ width: 'calc(100% - 9.375rem)' }} />
            </colgroup>
            <tbody>
              <tr>
                <th>계좌번호</th>
                <td>
                  <input
                    type='text'
                    value={newAccountNumber}
                    onChange={(e) => {
                      // 숫자만 입력 허용
                      const value = e.target.value.replace(/[^0-9]/g, '')
                      setNewAccountNumber(value)
                    }}
                    placeholder='000000000000'
                    // readOnly
                  />
                </td>
              </tr>
              <tr>
                <th>계좌구분</th>
                <td>
                  <div className={styles.radio_group}>
                    <RadioLabel
                      label={'대표계좌'}
                      checked={accountType === 'primary'}
                      disabled={hasPrimaryAccount}
                      onChange={() => {
                        if (!hasPrimaryAccount) {
                          setAccountType('primary')
                        }
                      }}
                    />
                    <RadioLabel
                      label={'일반계좌'}
                      checked={accountType === 'normal'}
                      onChange={() => setAccountType('normal')}
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className={styles.btn_wrap}>
        <Button
          variant='default'
          width={376}
          onClick={handleAddAccount}
          disabled={isLoading}
        >
          {isLoading ? '처리 중...' : '추가하기'}
        </Button>
      </div>

      <div className={styles.table_wrap}>
        <table className={styles.basic_table}>
          <colgroup>
            <col style={{ width: '141px' }} />
            <col style={{ width: '282px' }} />
            <col style={{ width: '392px' }} />
            <col style={{ width: '264px' }} />
            <col style={{ width: '162px' }} />
          </colgroup>
          <thead>
            <tr>
              <th>
                <Checkbox
                  checked={isAllChecked}
                  label={'전체 선택'}
                  onChange={handleSelectAll}
                />
              </th>
              <th>은행명</th>
              <th>계좌번호</th>
              <th>예금주</th>
              <th>대표 계좌 설정</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5}>
                  <div style={{ textAlign: 'center', padding: '2rem' }}>
                    로딩 중...
                  </div>
                </td>
              </tr>
            ) : accounts.length === 0 ? (
              <tr>
                <td colSpan={5}>
                  <EmptyState
                    title='등록된 계좌가 없습니다.'
                    subtitle='정산을 받기 위한 계좌를 등록해주세요.'
                  />
                </td>
              </tr>
            ) : (
              accounts.map((item) => (
                <tr key={item.bankAccountNo}>
                  <td>
                    <Checkbox
                      id={`checkbox-${item.bankAccountNo}`}
                      checked={selectedIds.includes(item.bankAccountNo)}
                      onChange={(checked) => {
                        setSelectedIds((prev) => {
                          if (checked) {
                            return prev.includes(item.bankAccountNo)
                              ? prev
                              : [...prev, item.bankAccountNo]
                          } else {
                            return prev.filter(
                              (id) => id !== item.bankAccountNo
                            )
                          }
                        })
                      }}
                    />
                  </td>
                  <td>{item.bankName}</td>
                  <td>{item.accountNumber}</td>
                  <td>{item.accountHolderName}</td>
                  <td>
                    <div className={styles.flex_center}>
                      <RadioLabel
                        label={''}
                        name='primary-account'
                        checked={primaryAccountId === item.bankAccountNo}
                        onChange={() => handlePrimaryChange(item.bankAccountNo)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <button
        type='button'
        className={styles.delete_btn}
        onClick={handleDeleteAccounts}
      >
        삭제
      </button>

      {accounts.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {modalType && (
        <AccountAlertModal
          open={modalType !== null}
          type={modalType}
          onOpenChange={(open) => {
            if (!open) {
              handleCloseModal()
            }
          }}
          bankAccountNo={
            modalType === 'changeConfirm'
              ? pendingPrimaryId || undefined
              : undefined
          }
          isCurrentlyPrimary={
            modalType === 'changeConfirm' && pendingPrimaryId
              ? accounts.find(
                  (account) => account.bankAccountNo === pendingPrimaryId
                )?.isPrimary || false
              : undefined
          }
          onSuccess={async () => {
            // 성공 시 목록 다시 조회
            await fetchAccounts(currentPage)
          }}
          onError={() => {
            // 실패 시 에러 모달 표시
            setModalType('changeError')
          }}
          onConfirm={
            modalType !== 'changeConfirm' ? handleCloseModal : undefined
          }
        />
      )}
    </div>
  )
}

export default AccountManagePage
