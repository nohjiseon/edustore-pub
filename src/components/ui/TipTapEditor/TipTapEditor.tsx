'use client'

// eslint-disable-next-line import/no-named-as-default
import Image from '@tiptap/extension-image'
import { useEditor, EditorContent } from '@tiptap/react'
import { default as StarterKit } from '@tiptap/starter-kit'
import { useEffect, useRef } from 'react'

import styles from './TipTapEditor.module.scss'

import { Icon } from '~/components/Icon'
import { cn } from '~/lib/utils'

export interface TipTapEditorProps {
  value?: string
  onChange?: (html: string) => void
  placeholder?: string
  className?: string
  error?: boolean
}

const TipTapEditor = ({
  value = '',
  onChange,
  placeholder = '내용을 입력하세요',
  className,
  error
}: TipTapEditorProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3]
        }
      }),
      Image.configure({
        inline: true,
        allowBase64: true
      })
    ],
    content: value,
    immediatelyRender: false,
    editable: true,
    editorProps: {
      attributes: {
        'data-placeholder': placeholder
      }
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      onChange?.(html)
    }
  })

  const handleImageUpload = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file || !editor) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      editor.chain().focus().setImage({ src: result }).run()
    }
    reader.readAsDataURL(file)

    // 파일 input 초기화
    event.target.value = ''
  }

  // value prop이 변경될 때 에디터 내용 동기화
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value)
    }
  }, [value, editor])

  if (!editor) {
    return (
      <div
        className={cn(styles.editor_wrapper, error && styles.error, className)}
      >
        <div className={styles.toolbar}>
          <div className={styles.loading}>Loading editor...</div>
        </div>
        <div className={styles.editor}></div>
      </div>
    )
  }

  return (
    <div
      className={cn(styles.editor_wrapper, error && styles.error, className)}
    >
      {/* 툴바 */}
      <div className={styles.toolbar}>
        <button
          type='button'
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={cn(
            styles.toolbar_button,
            editor.isActive('bold') && styles.active
          )}
          title='Bold'
        >
          <Icon name='bold' size={20} />
        </button>

        <button
          type='button'
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={cn(
            styles.toolbar_button,
            editor.isActive('italic') && styles.active
          )}
          title='Italic'
        >
          <Icon name='italic' size={20} />
        </button>

        <button
          type='button'
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={cn(
            styles.toolbar_button,
            editor.isActive('strike') && styles.active
          )}
          title='Strikethrough'
        >
          <Icon name='strikethrough' size={20} />
        </button>

        <div className={styles.toolbar_divider} />

        <button
          type='button'
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={cn(
            styles.toolbar_button,
            editor.isActive('heading', { level: 1 }) && styles.active
          )}
          title='Heading 1'
        >
          H1
        </button>

        <button
          type='button'
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={cn(
            styles.toolbar_button,
            editor.isActive('heading', { level: 2 }) && styles.active
          )}
          title='Heading 2'
        >
          H2
        </button>

        <button
          type='button'
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={cn(
            styles.toolbar_button,
            editor.isActive('heading', { level: 3 }) && styles.active
          )}
          title='Heading 3'
        >
          H3
        </button>

        <div className={styles.toolbar_divider} />

        <button
          type='button'
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={cn(
            styles.toolbar_button,
            editor.isActive('bulletList') && styles.active
          )}
          title='Bullet List'
        >
          <Icon name='list' size={20} />
        </button>

        <button
          type='button'
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={cn(
            styles.toolbar_button,
            editor.isActive('orderedList') && styles.active
          )}
          title='Ordered List'
        >
          <Icon name='list-ordered' size={20} />
        </button>

        <div className={styles.toolbar_divider} />

        <button
          type='button'
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={cn(
            styles.toolbar_button,
            editor.isActive('blockquote') && styles.active
          )}
          title='Quote'
        >
          <Icon name='quote' size={20} />
        </button>

        <button
          type='button'
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className={styles.toolbar_button}
          title='Horizontal Rule'
        >
          <Icon name='minus' size={20} />
        </button>

        <div className={styles.toolbar_divider} />

        <button
          type='button'
          onClick={handleImageUpload}
          className={styles.toolbar_button}
          title='Insert Image'
        >
          <Icon name='image' size={20} />
        </button>
      </div>

      {/* 숨겨진 파일 input */}
      <input
        ref={fileInputRef}
        type='file'
        accept='image/*'
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      {/* 에디터 */}
      <EditorContent editor={editor} className={styles.editor} />
    </div>
  )
}

export default TipTapEditor
