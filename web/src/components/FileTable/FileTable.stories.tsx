// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof FileTable> = (args) => {
//   return <FileTable {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import FileTable from './FileTable'

export const generated = () => {
  return <FileTable />
}

export default {
  title: 'Components/FileTable',
  component: FileTable,
} as ComponentMeta<typeof FileTable>
