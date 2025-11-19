import React from 'react'
import type { Preview } from '@storybook/react'
import { themes } from '@storybook/theming'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { AppRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import {
  PathnameContext,
  SearchParamsContext
} from 'next/dist/shared/lib/hooks-client-context.shared-runtime'
import '../src/styles/common.scss'

const mockRouter: AppRouterInstance = {
  back: () => {},
  forward: () => {},
  refresh: () => {},
  push: () => {},
  replace: () => {},
  prefetch: () => {}
}

const defaultSearchParams = new URLSearchParams()

const preview: Preview = {
  decorators: [
    (Story) => (
      <AppRouterContext.Provider value={mockRouter}>
        <PathnameContext.Provider value='/'>
          <SearchParamsContext.Provider value={defaultSearchParams}>
            <div style={{ display: 'flex', width: '100%', minHeight: '500px' }}>
              <Story />
            </div>
          </SearchParamsContext.Provider>
        </PathnameContext.Provider>
      </AppRouterContext.Provider>
    )
  ],
  parameters: {
    darkMode: {
      dark: { ...themes.dark },
      light: { ...themes.normal }
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    },
    viewport: {
      viewports: {
        '768px': {
          name: 'Desktop 768px',
          styles: { width: '768px', height: '100%' }
        },
        '480px': {
          name: 'Desktop 480px',
          styles: { width: '480px', height: '100%' }
        },
        '360px': {
          name: 'Desktop 360px',
          styles: { width: '360px', height: '100%' }
        },
        ...INITIAL_VIEWPORTS
      }
    }
  }
}

export default preview
