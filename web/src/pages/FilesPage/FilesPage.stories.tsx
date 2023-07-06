import type { ComponentMeta } from '@storybook/react'

import FilesPage from './FilesPage'

export const generated = () => {
  return <FilesPage />
}

export default {
  title: 'Pages/FilesPage',
  component: FilesPage,
} as ComponentMeta<typeof FilesPage>
