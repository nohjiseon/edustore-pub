'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import { useEffect } from 'react'

import styles from './ProposalModal.module.scss'
import { CopyButton } from '../CopyButton'

import { Button } from '@/components/ui'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/Dialog'
import { IndentWithTab } from '@/lib/tiptap/extensions'
import { CartItem } from '@/stores/cart'

interface Props {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  items: CartItem[]
  zIndex?: number
}

const ProposalModal = ({
  open = false,
  onOpenChange,
  items,
  zIndex
}: Props) => {
  // tiptap 에디터 설정
  const editor = useEditor({
    extensions: [StarterKit, IndentWithTab],
    content: '',
    immediatelyRender: false
  })

  // items가 변경될 때마다 에디터 내용 업데이트
  useEffect(() => {
    if (!editor) return

    if (items.length === 0) {
      editor.commands.setContent('')
      return
    }

    const itemsText =
      items.length === 1
        ? items[0].title
        : `${items[0].title} 외 ${items.length - 1}개 품목`
    const totalPrice = items.reduce((sum, item) => sum + item.price, 0)

    // tiptap JSON 형식으로 리스트 구조 생성
    const content = {
      type: 'doc',
      content: [
        {
          type: 'orderedList',
          attrs: { start: 1 },
          content: [
            {
              type: 'listItem',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: '수업자료로 활용하기 위해 구입하고자 합니다.'
                    }
                  ]
                },
                {
                  type: 'orderedList',
                  attrs: { start: 1 },
                  content: [
                    {
                      type: 'listItem',
                      content: [
                        {
                          type: 'paragraph',
                          content: [{ type: 'text', text: '내용' }]
                        },
                        {
                          type: 'orderedList',
                          attrs: { start: 1 },
                          content: [
                            {
                              type: 'listItem',
                              content: [
                                {
                                  type: 'paragraph',
                                  content: [
                                    {
                                      type: 'text',
                                      text: `구입물품 : ${itemsText}`
                                    }
                                  ]
                                }
                              ]
                            },
                            {
                              type: 'listItem',
                              content: [
                                {
                                  type: 'paragraph',
                                  content: [
                                    {
                                      type: 'text',
                                      text: `구입예산 : ${totalPrice.toLocaleString()}`
                                    }
                                  ]
                                }
                              ]
                            },
                            {
                              type: 'listItem',
                              content: [
                                {
                                  type: 'paragraph',
                                  content: [
                                    { type: 'text', text: '구매처 : 수업가게' }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }

    editor.commands.setContent(content)
  }, [items, editor])

  // 에디터 텍스트 가져오기
  const getEditorText = () => {
    if (!editor) return ''
    return editor.getText()
  }

  // 출력 기능
  const handlePrint = () => {
    // TODO: 출력 기능 구현
  }

  // 다운로드 기능
  const handleDownload = () => {
    // TODO: 다운로드 기능 구현
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={styles.modal_content} zIndex={zIndex}>
        <DialogHeader className={styles.modal_header} borderHidden>
          <DialogTitle className={styles.modal_title}>
            품의기안 자동작성
          </DialogTitle>
        </DialogHeader>

        <div className={styles.modal_body}>
          {/* 안내 텍스트 */}
          <div className={styles.notice_box}>
            <h3 className={styles.notice_title}>품의기안 활용 방법 안내</h3>
            <ul className={styles.notice_list}>
              <li>품목 내용을 기반으로 기본적인 개요 내용을 제공합니다.</li>
              <li>품목 내역의 각 항목별 내용을 복사할 수 있습니다.</li>
              <li>
                양식 다운로드의 내용을 복사 후, 필요한 부분에 붙여넣기하여
                사용하시면 됩니다.
              </li>
            </ul>
          </div>

          {/* 개요 작성 섹션 */}
          <div className={styles.summary_section}>
            <div className={styles.summary_container}>
              {/* 왼쪽 라벨 */}
              <div className={styles.summary_label_box}>
                <span className={styles.summary_label_text}>
                  개요 작성 내용 복사
                </span>
              </div>

              {/* 오른쪽 내용 */}
              <div className={styles.summary_content_box}>
                <div className={styles.summary_text_wrapper}>
                  <EditorContent
                    editor={editor}
                    className={styles.editor_content}
                  />
                </div>
                <div className={styles.summary_button_wrapper}>
                  <CopyButton
                    copyText={getEditorText()}
                    className={styles.copy_button}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 테이블 */}
          <div className={styles.table_section}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>순번</th>
                  <th className={styles.th_content}>
                    <span className={styles.required}>*</span>구매내용
                  </th>
                  <th>수량</th>
                  <th>단가</th>
                  <th className={styles.th_amount}>
                    <span className={styles.required}>*</span>금액
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td className={styles.td_content}>
                      <span className={styles.item_title}>{item.title}</span>
                      <CopyButton copyText={item.title} />
                    </td>
                    <td>
                      <div className={styles.td_with_button}>
                        <span>1</span>
                        <CopyButton copyText='1' />
                      </div>
                    </td>
                    <td>
                      <div className={styles.td_with_button}>
                        <span>{item.price.toLocaleString()}</span>
                        <CopyButton copyText={item.price.toLocaleString()} />
                      </div>
                    </td>
                    <td className={styles.td_amount}>
                      {item.price.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ProposalModal
