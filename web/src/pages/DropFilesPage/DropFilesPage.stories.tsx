import type { ComponentMeta } from '@storybook/react'

import DropFilesPage from './DropFilesPage'

export const generated = () => {
  return <DropFilesPage />
}

export default {
  title: 'Pages/DropFilesPage',
  component: DropFilesPage,
} as ComponentMeta<typeof DropFilesPage>
