import { Extension } from '@tiptap/core'

/**
 * Tab 키로 탭 문자를 삽입하는 확장
 */
export const IndentWithTab = Extension.create({
  name: 'indentWithTab',
  addKeyboardShortcuts() {
    return {
      Tab: () => {
        this.editor.commands.insertContent('\t')
        return true
      }
    }
  }
})
