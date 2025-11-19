'use client'

// eslint-disable-next-line import/no-named-as-default
import Image from '@tiptap/extension-image'
import { useEditor, EditorContent } from '@tiptap/react'
import { default as StarterKit } from '@tiptap/starter-kit'

import styles from './TipTapViewer.module.scss'

import { cn } from '~/lib/utils'

export interface TipTapViewerProps {
  content: string
  className?: string
}

const TipTapViewer = ({ content, className }: TipTapViewerProps) => {
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
    content,
    editable: false,
    immediatelyRender: false
  })

  if (!editor) {
    return null
  }

  return (
    <div className={cn(styles.viewer, className)}>
      <EditorContent editor={editor} />
    </div>
  )
}

export default TipTapViewer
