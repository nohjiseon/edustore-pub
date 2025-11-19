'use client'

import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { toast } from 'sonner'

import styles from './SalesContentSection.module.scss'
import { FileTag } from '../FileTag'

import { Icon } from '~/components/Icon'
import { Textarea, TipTapEditor, Tooltip } from '~/components/ui'

interface UploadedFile {
  id: string
  name: string
  size: number
  file: File
}

interface ThumbnailFile {
  id: string
  name: string
  size: number
  preview: string
  file: File
}

export interface SalesContentData {
  title: string
  content: string
  summary: string
  thumbnail: ThumbnailFile | null
  files: UploadedFile[]
}

export interface SalesContentSectionRef {
  getData: () => SalesContentData
  validate: () => boolean
}

const SalesContentSection = forwardRef<SalesContentSectionRef>((props, ref) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [summary, setSummary] = useState('')
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [uploadedThumbnail, setUploadedThumbnail] =
    useState<ThumbnailFile | null>(null)
  const [isDraggingThumbnail, setIsDraggingThumbnail] = useState(false)
  const [isDraggingFile, setIsDraggingFile] = useState(false)
  const [titleError, setTitleError] = useState(false)
  const [thumbnailError, setThumbnailError] = useState('')
  const [fileError, setFileError] = useState('')
  const [contentError, setContentError] = useState('')
  const [summaryError, setSummaryError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const thumbnailInputRef = useRef<HTMLInputElement>(null)

  // 자료명 입력 핸들러
  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setTitle(value)

    // 실시간 검증
    if (value.trim().length === 0) {
      setTitleError(false)
    } else if (value.trim().length < 3 || value.trim().length > 30) {
      setTitleError(true)
    } else {
      setTitleError(false)
    }
  }

  // ref를 통해 부모 컴포넌트에서 데이터 접근 가능하도록 설정
  useImperativeHandle(ref, () => ({
    getData: () => ({
      title,
      content,
      summary,
      thumbnail: uploadedThumbnail,
      files: uploadedFiles
    }),
    validate: () => {
      let isValid = true

      // 자료명 검증
      if (title.trim().length < 3 || title.trim().length > 30) {
        setTitleError(true)
        isValid = false
      }

      // 썸네일 검증
      if (!uploadedThumbnail) {
        setThumbnailError('썸네일을 업로드해주세요.')
        isValid = false
      }

      // 자료 파일 검증
      if (uploadedFiles.length === 0) {
        setFileError('자료 파일을 업로드해주세요.')
        isValid = false
      }

      // 자료 내용 검증
      if (!content.trim()) {
        setContentError('자료 내용을 입력해주세요.')
        isValid = false
      }

      // 자료 내용 요약 검증
      if (!summary.trim()) {
        setSummaryError('자료 내용 요약을 입력해주세요.')
        isValid = false
      }

      return isValid
    }
  }))

  // 파일 타입 및 크기 검증 유틸리티
  const MAX_THUMBNAIL_SIZE = 10 * 1024 * 1024 // 10MB

  const isValidThumbnailFile = (
    file: File
  ): { valid: boolean; error?: string } => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg']
    const allowedExtensions = ['.jpg', '.jpeg', '.png']
    const fileExtension = file.name
      .toLowerCase()
      .slice(file.name.lastIndexOf('.'))

    // 파일 크기 검증
    if (file.size > MAX_THUMBNAIL_SIZE) {
      return {
        valid: false,
        error: '이미지 파일 크기는 최대 10MB까지 업로드 가능합니다.'
      }
    }

    // 파일 형식 검증
    const isValidType =
      allowedTypes.includes(file.type) ||
      allowedExtensions.includes(fileExtension)

    if (!isValidType) {
      return {
        valid: false,
        error: 'JPG, PNG 형식의 이미지만 업로드 가능합니다.'
      }
    }

    return { valid: true }
  }

  const isValidDocumentFile = (file: File): boolean => {
    const allowedExtensions = [
      '.pdf',
      '.doc',
      '.docx',
      '.ppt',
      '.pptx',
      '.hwp',
      '.zip'
    ]
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'application/x-hwp',
      'application/haansofthwp',
      'application/zip',
      'application/x-zip-compressed'
    ]
    const fileExtension = file.name
      .toLowerCase()
      .slice(file.name.lastIndexOf('.'))

    return (
      allowedTypes.includes(file.type) ||
      allowedExtensions.includes(fileExtension)
    )
  }

  // 썸네일 업로드 핸들러
  const handleThumbnailSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return

    const file = files[0]

    // 파일 타입 및 크기 검증
    const validation = isValidThumbnailFile(file)
    if (!validation.valid) {
      setThumbnailError(validation.error || '')
      return
    }

    // 검증 통과 시 에러 초기화
    setThumbnailError('')

    const reader = new FileReader()
    reader.onload = (e) => {
      const preview = e.target?.result as string
      setUploadedThumbnail({
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: file.name,
        size: file.size,
        preview,
        file
      })
    }
    reader.readAsDataURL(file)
  }

  const handleThumbnailInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleThumbnailSelect(e.target.files)
    if (thumbnailInputRef.current) {
      thumbnailInputRef.current.value = ''
    }
  }

  const handleThumbnailSelectClick = () => {
    thumbnailInputRef.current?.click()
  }

  const handleRemoveThumbnail = () => {
    setUploadedThumbnail(null)
    setThumbnailError('')
  }

  // 파일 업로드 핸들러
  const handleFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return

    // 유효한 파일만 필터링
    const validFiles = Array.from(files).filter((file) => {
      if (!isValidDocumentFile(file)) {
        toast.error(
          `${file.name}은(는) 지원하지 않는 형식입니다.\nPDF, DOC, DOCX, PPT, PPTX, HWP, ZIP 파일만 업로드 가능합니다.`
        )
        return false
      }
      return true
    })

    if (validFiles.length === 0) return

    const newFiles: UploadedFile[] = validFiles.map((file) => ({
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: file.name,
      size: file.size,
      file
    }))

    setUploadedFiles((prev) => [...prev, ...newFiles])
    // 파일이 추가되면 에러 초기화
    setFileError('')
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleFileSelectClick = () => {
    fileInputRef.current?.click()
  }

  const handleRemoveFile = (fileId: string) => {
    setUploadedFiles((prev) => {
      const newFiles = prev.filter((file) => file.id !== fileId)
      // 모든 파일이 삭제되지 않았다면 에러 초기화
      if (newFiles.length > 0) {
        setFileError('')
      }
      return newFiles
    })
  }

  // 드래그 앤 드롭 핸들러 - 썸네일
  const handleThumbnailDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDraggingThumbnail(true)
  }

  const handleThumbnailDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDraggingThumbnail(false)
  }

  const handleThumbnailDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleThumbnailDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDraggingThumbnail(false)

    const files = e.dataTransfer.files
    handleThumbnailSelect(files)
  }

  // 드래그 앤 드롭 핸들러 - 파일
  const handleFileDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDraggingFile(true)
  }

  const handleFileDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDraggingFile(false)
  }

  const handleFileDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDraggingFile(false)

    const files = e.dataTransfer.files
    handleFileSelect(files)
  }

  return (
    <section className={styles.sales_content_section}>
      {/* 자료명 */}
      <div className={styles.field_group}>
        <div className={styles.label}>
          <span className={styles.required}>*</span>
          <span>자료명</span>
        </div>
        <div className={styles.title_input_wrap}>
          <Textarea
            placeholder='예 : 초등 3학년 국어 | 글쓴이의 마음 이해하기 활동 자료'
            value={title}
            onChange={handleTitleChange}
            maxLength={30}
            showCounter
            className={styles.title_input}
          />
        </div>
        {titleError && (
          <p className={styles.error_message}>
            최소 3자 이상 최대 30자 이내로 입력해 주세요
          </p>
        )}
      </div>

      {/* 썸네일 업로드 */}
      <div className={styles.field_group}>
        <div className={styles.label}>
          <span className={styles.required}>*</span>
          <span>썸네일 업로드</span>
        </div>
        <div
          className={`${styles.upload_container_thumbnail} ${
            isDraggingThumbnail ? styles.dragging : ''
          }`}
          onDragEnter={handleThumbnailDragEnter}
          onDragLeave={handleThumbnailDragLeave}
          onDragOver={handleThumbnailDragOver}
          onDrop={handleThumbnailDrop}
        >
          <input
            ref={thumbnailInputRef}
            type='file'
            accept='image/jpeg,image/png,image/jpg'
            onChange={handleThumbnailInputChange}
            style={{ display: 'none' }}
            aria-label='썸네일 업로드'
          />
          {uploadedThumbnail ? (
            <div className={styles.thumbnail_preview_container}>
              <img
                src={uploadedThumbnail.preview}
                alt='썸네일 미리보기'
                className={styles.thumbnail_preview}
              />
              <button
                type='button'
                className={styles.thumbnail_remove_button}
                onClick={handleRemoveThumbnail}
                aria-label='썸네일 제거'
              >
                <Icon name='close' size={20} color='#ffffff' />
              </button>
            </div>
          ) : (
            <div
              className={styles.upload_box}
              onClick={handleThumbnailSelectClick}
            >
              <Icon name='upload' size={55} color='var(--color-primary)' />
              <div className={styles.upload_info}>
                <p className={styles.upload_instruction}>
                  파일을 드래그 하시거나
                  <br />
                  <span className={styles.file_select}>파일선택</span>을
                  해주세요.
                </p>
                <div className={styles.upload_details}>
                  <p>JPG, PNG 형식의 10MB 이하</p>
                  <p>대표 이미지 한 장만 업로드 가능</p>
                </div>
              </div>
            </div>
          )}
        </div>
        {thumbnailError && (
          <p className={styles.error_message}>{thumbnailError}</p>
        )}
      </div>

      {/* 자료 업로드 */}
      <div className={styles.field_group}>
        <div className={styles.label}>
          <span className={styles.required}>*</span>
          <span>자료 업로드</span>
          <Tooltip
            top='-1.25rem'
            left='2.5rem'
            width='33.75rem'
            className={styles.extension_tooltip}
            content={
              <>
                <span className={styles.extension_tit}>
                  <strong>업로드 가능한 확장자 안내</strong>
                  <p>
                    압축파일은 업로드가 불가하며 최대 50개까지 등록이
                    가능합니다.
                  </p>
                </span>
                <div className={styles.extension_list}>
                  <div className={styles.extension_box}>
                    <strong>한글 문서</strong>
                    <div className={styles.extension_item}>
                      <span>.hwpx</span>
                      <span>.hwp</span>
                    </div>
                  </div>
                  <div className={styles.extension_box}>
                    <strong>MS 오피스</strong>
                    <div className={styles.extension_item}>
                      <span>.doc</span>
                      <span>.ppt</span>
                      <span>.pptx</span>
                      <span>.xls</span>
                      <span>.xlsx</span>
                      <span>.pub</span>
                    </div>
                  </div>
                  <div className={styles.extension_box}>
                    <strong>PDF</strong>
                    <div className={styles.extension_item}>
                      <span>.pdf</span>
                    </div>
                  </div>
                  <div className={styles.extension_box}>
                    <strong>이미지</strong>
                    <div className={styles.extension_item}>
                      <span>.jpg</span>
                      <span>.jpeg</span>
                      <span>.png</span>
                      <span>.gif</span>
                      <span>.webp</span>
                    </div>
                  </div>
                  <div className={styles.extension_box}>
                    <strong>음원</strong>
                    <div className={styles.extension_item}>
                      <span>.mp3</span>
                      <span>.m4a</span>
                    </div>
                  </div>
                  <div className={styles.extension_box}>
                    <strong>영상</strong>
                    <div className={styles.extension_item}>
                      <span>.mp4</span>
                      <span>.mov</span>
                    </div>
                  </div>
                </div>
              </>
            }
          >
            <button type='button' className={styles.info_button}>
              <Icon name='info' size={24} color='var(--color-neutral-grey-3)' />
            </button>
          </Tooltip>
        </div>
        <div>
          <div
            className={`${styles.upload_container_file} ${
              isDraggingFile ? styles.dragging : ''
            }`}
            onDragEnter={handleFileDragEnter}
            onDragLeave={handleFileDragLeave}
            onDragOver={handleFileDragOver}
            onDrop={handleFileDrop}
          >
            <input
              ref={fileInputRef}
              type='file'
              multiple
              accept='.pdf,.doc,.docx,.ppt,.pptx,.hwp,.zip'
              onChange={handleFileInputChange}
              style={{ display: 'none' }}
              aria-label='파일 업로드'
            />
            <Icon
              name='upload'
              size={55}
              color='var(--color-primary)'
              style={{ marginRight: '2rem' }}
            />
            <div className={styles.upload_info}>
              <p className={styles.upload_instruction}>
                파일을 드래그 하시거나{' '}
                <span
                  className={styles.file_select}
                  onClick={handleFileSelectClick}
                >
                  파일선택
                </span>
                을 해주세요.
              </p>
              <div className={styles.upload_details}>
                <p>1개당 권장 용량 100MB 내외</p>
                <p>파일 여러 개 업로드 가능</p>
              </div>
            </div>
          </div>

          {/* 업로드된 파일 목록 */}
          {uploadedFiles.length > 0 && (
            <div className={styles.uploaded_files_list}>
              {uploadedFiles.map((file) => (
                <FileTag
                  key={file.id}
                  fileName={file.name}
                  onRemove={() => handleRemoveFile(file.id)}
                />
              ))}
            </div>
          )}
        </div>
        {fileError && <p className={styles.error_message}>{fileError}</p>}
      </div>

      {/* 자료 내용 */}
      <div className={styles.field_group}>
        <div className={styles.label}>
          <span className={styles.required}>*</span>
          <span>자료 내용</span>
        </div>
        <TipTapEditor
          value={content}
          onChange={(html: string) => {
            setContent(html)
            if (html.trim()) {
              setContentError('')
            }
          }}
          placeholder='자료 내용을 입력하세요'
          className={styles.content_editor}
        />
        {contentError && <p className={styles.error_message}>{contentError}</p>}
      </div>

      {/* 자료 내용 요약 */}
      <div className={styles.field_group}>
        <div className={styles.label}>
          <span className={styles.required}>*</span>
          <span>자료 내용 요약</span>
        </div>
        <Textarea
          placeholder='자료 내용을 100자 이내로 요약해 주세요.'
          value={summary}
          onChange={(e) => {
            setSummary(e.target.value)
            if (e.target.value.trim()) {
              setSummaryError('')
            }
          }}
          maxLength={100}
          showCounter
          className={styles.summary_textarea}
        />
        {summaryError && <p className={styles.error_message}>{summaryError}</p>}
      </div>
    </section>
  )
})

SalesContentSection.displayName = 'SalesContentSection'

export default SalesContentSection
