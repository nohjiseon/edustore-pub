'use client'

import { useEffect, useState } from 'react'

import styles from './page.module.scss'

import { Icon } from '~/components/Icon'
import Button from '~/components/ui/Button'

const SignupPage = () => {
  const [typeValue, setTypeValue] = useState('personal')
  const [allChecked, setAllChecked] = useState(false)
  const [chk1Checked, setChk1Checked] = useState(false)
  const [chk2Checked, setChk2Checked] = useState(false)

  useEffect(() => {
    if (chk1Checked && chk2Checked) {
      setAllChecked(true)
    } else {
      setAllChecked(false)
    }
  }, [chk1Checked, chk2Checked])

  const handleAllCheck = () => {
    const newAllChecked = !allChecked
    setAllChecked(newAllChecked)
    setChk1Checked(newAllChecked)
    setChk2Checked(newAllChecked)
  }

  return (
    <div className={styles.wrapper}>
      {/* 타이틀 */}
      <div className={styles.title_wrap}>
        <h1 className={styles.title}>수업가게에 오신 것을 환영합니다.</h1>
        <p className={styles.description}>
          선택한 회원유형에 맞게 가입을 진행해 주세요.
        </p>
      </div>

      <div className={styles.type_wrap}>
        {/* 탭 */}
        <div className={styles.tabs_wrap}>
          <div
            className={`${styles.tab} ${
              typeValue === 'personal' ? styles.on : ''
            }`}
            onClick={() => {
              setTypeValue('personal')
              setAllChecked(false)
              setChk1Checked(false)
              setChk2Checked(false)
              setAllChecked(false)
            }}
          >
            <span className={styles.tab_name}>개인회원</span>
            <span className={styles.tab_description}>선생님, 일반인 등</span>
          </div>
          <div
            className={`${styles.tab} ${
              typeValue === 'organization' ? styles.on : ''
            }`}
            onClick={() => {
              setTypeValue('organization')
              setAllChecked(false)
              setChk1Checked(false)
              setChk2Checked(false)
              setAllChecked(false)
            }}
          >
            <span className={styles.tab_name}>기관회원</span>
            <span className={styles.tab_description}>
              학교, 유치원, 교육청 등
            </span>
          </div>
        </div>

        {/* 약관 동의 */}
        <div className={styles.agree_wrap}>
          <div className={styles.agree_all}>
            <div className={styles.agree_chk}>
              <input
                type='checkbox'
                className={styles.agree_input}
                id='all'
                onChange={handleAllCheck}
                checked={allChecked}
              />
              <label htmlFor='all' className={styles.agree_label}>
                <Icon
                  name='checkbox-none-s'
                  className={styles.off}
                  style={{
                    display: `${allChecked == true ? 'none' : 'block'}`
                  }}
                />
                <Icon
                  name='checkbox-fill-s'
                  className={styles.on}
                  style={{
                    display: `${allChecked == true ? 'block' : 'none'}`
                  }}
                />
                약관에 모두 동의
              </label>
            </div>
          </div>

          <div className={styles.agree_group}>
            <div className={styles.agree_seperatetion}>
              <div className={styles.agree_chk}>
                <input
                  type='checkbox'
                  className={styles.agree_input}
                  id='chk1'
                  required={true}
                  onChange={() => setChk1Checked(!chk1Checked)}
                  checked={chk1Checked}
                />
                <label htmlFor='chk1' className={styles.agree_label}>
                  <Icon
                    name='checkbox-none-s'
                    className={styles.off}
                    style={{
                      display: `${chk1Checked == true ? 'none' : 'block'}`
                    }}
                  />
                  <Icon
                    name='checkbox-fill-s'
                    className={styles.on}
                    style={{
                      display: `${chk1Checked == true ? 'block' : 'none'}`
                    }}
                  />
                  [필수] 서비스 이용약관에 동의 합니다.
                </label>
              </div>
              <a className={styles.more} href='/policy/terms'>
                보기
              </a>
            </div>

            <div className={styles.agree_seperatetion}>
              <div className={styles.agree_chk}>
                <input
                  type='checkbox'
                  className={styles.agree_input}
                  id='chk2'
                  required={true}
                  onChange={() => setChk2Checked(!chk2Checked)}
                  checked={chk2Checked}
                />
                <label htmlFor='chk2' className={styles.agree_label}>
                  <Icon
                    name='checkbox-none-s'
                    className={styles.off}
                    style={{
                      display: `${chk2Checked == true ? 'none' : 'block'}`
                    }}
                  />
                  <Icon
                    name='checkbox-fill-s'
                    className={styles.on}
                    style={{
                      display: `${chk2Checked == true ? 'block' : 'none'}`
                    }}
                  />
                  [필수] 개인정보처리방침에 동의 합니다.
                </label>
              </div>
              <a className={styles.more} href='/policy/privacy'>
                보기
              </a>
            </div>
          </div>
        </div>

        {/* 다음 버튼 */}
        <div className={styles.button_wrap}>
          <a
            href={
              allChecked == true && typeValue === 'personal'
                ? '/signup/personal'
                : allChecked == true && typeValue === 'organization'
                ? '/signup/organization'
                : null
            }
          >
            <Button
              disabled={!allChecked || !chk1Checked || !chk2Checked}
              variant='default'
            >
              다음
            </Button>
          </a>
        </div>
      </div>
    </div>
  )
}

export default SignupPage
