// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof DeleteModal> = (args) => {
//   return <DeleteModal {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import DeleteModal from './DeleteModal'

export const generated = () => {
  return <DeleteModal />
}

export default {
  title: 'Components/DeleteModal',
  component: DeleteModal,
} as ComponentMeta<typeof DeleteModal>
