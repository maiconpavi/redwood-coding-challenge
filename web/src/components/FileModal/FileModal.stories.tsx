// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof FileModal> = (args) => {
//   return <FileModal {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import FileModal from './FileModal'

export const generated = () => {
  return <FileModal />
}

export default {
  title: 'Components/FileModal',
  component: FileModal,
} as ComponentMeta<typeof FileModal>
