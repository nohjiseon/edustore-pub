'use client'

import React, { useState } from 'react'

import styles from './RelatedContentsSection.module.scss'
import { FileTag } from '../FileTag'

import { Icon } from '@/components/Icon'
import { ToggleBadge } from '@/components/ui'
import {
  GRADE_OPTIONS,
  SUBJECT_OPTIONS,
  MATERIAL_TYPE_OPTIONS,
  type PriceType
} from '@/constants/education'

const RelatedContentsSection = () => {
  // 대상 학년 선택 상태
  const [selectedGrades, setSelectedGrades] = useState<string[]>([])

  // 대상 교과 선택 상태
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])

  // 자료 유형 선택 상태
  const [selectedMaterialTypes, setSelectedMaterialTypes] = useState<string[]>(
    []
  )

  // 성취기준 상태
  const [achievementCriteria, setAchievementCriteria] = useState('')

  // 관련 주제 상태
  const [topicInput, setTopicInput] = useState('')
  const [topics, setTopics] = useState<string[]>([])
  const [isComposing, setIsComposing] = useState(false)
  const [isTopicLimitError, setIsTopicLimitError] = useState(false)

  // 가격 상태
  const [priceType, setPriceType] = useState<PriceType>('free')
  const [price, setPrice] = useState(0)

  // 확인사항 체크 상태
  const [isConfirmed, setIsConfirmed] = useState(false)

  // 숫자 포맷팅 함수 (천 단위 콤마)
  const formatNumber = (num: number): string => {
    return num.toLocaleString('ko-KR')
  }

  // 가격 입력 핸들러
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '') // 콤마 제거
    const numValue = parseInt(value, 10)
    setPrice(isNaN(numValue) ? 0 : numValue)
  }

  // 토글 핸들러
  const handleToggleGrade = (grade: string) => {
    setSelectedGrades((prev) =>
      prev.includes(grade) ? prev.filter((g) => g !== grade) : [...prev, grade]
    )
  }

  const handleToggleSubject = (subject: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(subject)
        ? prev.filter((s) => s !== subject)
        : [...prev, subject]
    )
  }

  const handleToggleMaterialType = (type: string) => {
    setSelectedMaterialTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    )
  }

  // 관련 주제 추가
  const handleAddTopic = () => {
    const trimmedTopic = topicInput.trim()
    if (!trimmedTopic) return

    if (topics.includes(trimmedTopic)) {
      setIsTopicLimitError(false)
      return
    }

    if (topics.length >= 5) {
      setIsTopicLimitError(true)
      return
    }

    setTopics([...topics, trimmedTopic])
    setTopicInput('')
    setIsTopicLimitError(false)
  }

  // Enter 키 핸들러 (한글 조합 중에는 실행하지 않음)
  const handleTopicKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isComposing) {
      e.preventDefault()
      handleAddTopic()
    }
  }

  return (
    <section className={styles.related_contents_section}>
      {/* 대상 학년 선택 */}
      <div className={styles.field_group}>
        <div className={styles.label}>
          <span className={styles.required}>*</span>
          <div className={styles.label_content}>
            <span>대상 학년 선택</span>
            <span className={styles.file_type_info}>다중 선택 가능</span>
          </div>
        </div>
        <div className={styles.toggle_grid}>
          {GRADE_OPTIONS.map((grade) => (
            <ToggleBadge
              key={grade}
              size='md'
              selected={selectedGrades.includes(grade)}
              onClick={() => handleToggleGrade(grade)}
            >
              {grade}
            </ToggleBadge>
          ))}
        </div>
      </div>

      {/* 대상 교과 선택 */}
      <div className={styles.field_group}>
        <div className={styles.label}>
          <span className={styles.required}>*</span>
          <div className={styles.label_content}>
            <span>대상 교과 선택</span>
            <span className={styles.file_type_info}>다중 선택 가능</span>
          </div>
        </div>
        <div className={styles.subject_categories}>
          {Object.entries(SUBJECT_OPTIONS).map(([category, subjects]) => (
            <div key={category} className={styles.subject_category}>
              <div className={styles.category_label}>{category}</div>
              <div className={styles.toggle_grid}>
                {subjects.map((subject) => (
                  <ToggleBadge
                    key={subject}
                    size='md'
                    selected={selectedSubjects.includes(subject)}
                    onClick={() => handleToggleSubject(subject)}
                  >
                    {subject}
                  </ToggleBadge>
                ))}
              </div>
            </div>
          ))}
          <div className={styles.subject_note}>
            ※ 바른 생활 / 슬기로운 생활 / 즐거운 생활 / 통합교과 (초등 1,
            2학년만 해당), 실과 (초등 5, 6학년만 해당)
          </div>
        </div>
      </div>

      {/* 자료 유형 선택 */}
      <div className={styles.field_group}>
        <div className={styles.label}>
          <span className={styles.required}>*</span>
          <div className={styles.label_content}>
            <span>자료 유형 선택</span>
            <span className={styles.file_type_info}>다중 선택 가능</span>
          </div>
        </div>
        <div className={styles.toggle_grid}>
          {MATERIAL_TYPE_OPTIONS.map((type) => (
            <ToggleBadge
              key={type}
              size='md'
              selected={selectedMaterialTypes.includes(type)}
              onClick={() => handleToggleMaterialType(type)}
            >
              {type}
            </ToggleBadge>
          ))}
        </div>
      </div>

      {/* 성취기준 등록 2차 개발 건 */}
      {/* <div className={styles.field_group}>
        <div className={styles.label}>
          <span className={styles.required}>*</span>
          <span>성취기준 등록</span>
        </div>
        <div className={styles.input_with_button}>
          <input
            type='text'
            className={styles.input_field}
            placeholder='우측 버튼을 눌러 찾으시려는 성취기준을 입력해 주세요.'
            value={achievementCriteria}
            onChange={(e) => setAchievementCriteria(e.target.value)}
          />
          <button className={styles.action_button}>찾기</button>
        </div>
      </div> */}

      {/* 관련 주제 입력 */}
      <div className={styles.field_group}>
        <div className={styles.label}>
          <span className={styles.required}>*</span>
          <span>관련 주제 입력</span>
        </div>
        <div>
          <div className={styles.input_with_button}>
            <input
              type='text'
              className={styles.input_field}
              placeholder='예 : 독도, 어린이날'
              value={topicInput}
              onChange={(e) => setTopicInput(e.target.value)}
              onKeyDown={handleTopicKeyDown}
              onCompositionStart={() => setIsComposing(true)}
              onCompositionEnd={() => setIsComposing(false)}
            />
            <button
              type='button'
              className={styles.action_button}
              onClick={handleAddTopic}
            >
              추가하기
            </button>
          </div>
          {topics.length > 0 && (
            <div className={styles.topics_list}>
              {topics.slice(0, 5).map((topic, index) => (
                <FileTag
                  key={index}
                  fileName={topic.startsWith('#') ? topic : `#${topic}`}
                  onRemove={() => {
                    setTopics(topics.filter((_, i) => i !== index))
                    setIsTopicLimitError(false)
                  }}
                />
              ))}
            </div>
          )}
          {isTopicLimitError && (
            <p className={styles.error_message}>
              최대 5개까지 입력 가능합니다.
            </p>
          )}
        </div>
      </div>

      {/* 가격 */}
      <div className={styles.field_group}>
        <div className={styles.label}>
          <span className={styles.required}>*</span>
          <span>가격</span>
        </div>
        <div className={styles.price_options}>
          <label className={styles.radio_option}>
            <input
              type='radio'
              name='priceType'
              value='free'
              checked={priceType === 'free'}
              onChange={() => setPriceType('free')}
            />
            <span className={styles.radio_button}>
              <span className={styles.radio_inner} />
            </span>
            <span className={styles.radio_label}>무료</span>
          </label>
          <div className={styles.paid_option_group}>
            <label className={styles.radio_option}>
              <input
                type='radio'
                name='priceType'
                value='paid'
                checked={priceType === 'paid'}
                onChange={() => setPriceType('paid')}
              />
              <span className={styles.radio_button}>
                <span className={styles.radio_inner} />
              </span>
              <span className={styles.radio_label}>유료</span>
            </label>
            <div className={styles.price_input_wrapper}>
              <input
                type='text'
                className={styles.price_input}
                value={formatNumber(price)}
                onChange={handlePriceChange}
                disabled={priceType === 'free'}
                placeholder='0'
              />
              <span className={styles.price_unit}>원</span>
            </div>
          </div>
        </div>
      </div>

      {/* 자료 등록 전 확인사항 */}
      <div className={styles.field_group}>
        <div className={styles.label}>
          <span className={styles.required}>*</span>
          <span>자료 등록 전 꼭 확인해주세요!</span>
        </div>
        <div className={styles.confirmation_box}>
          <div className={styles.warning_bar} />
          <p className={styles.confirmation_text}>
            등록하신 자료는 반드시 직접 제작한 창작물이어야 합니다. 제3자의
            저작권, 상표권, 초상권 등을 침해한 자료는 등록하실 수 없으며, 이를
            위반할 경우 민·형사상 책임은 전적으로 판매자 본인에게 있습니다.
          </p>
        </div>
        <label className={styles.checkbox_option}>
          <input
            type='checkbox'
            checked={isConfirmed}
            onChange={(e) => setIsConfirmed(e.target.checked)}
          />
          <Icon
            name={isConfirmed ? 'checkbox-fill-m' : 'checkbox-none-m'}
            size={24}
          />
          <span>
            위 내용을 모두 확인하였으며, 등록 자료가 본인의 창작물임을
            확인합니다.
          </span>
        </label>
      </div>
    </section>
  )
}

export default RelatedContentsSection
