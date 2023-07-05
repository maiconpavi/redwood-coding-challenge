// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof FileVersion> = (args) => {
//   return <FileVersion {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import FileVersion from './FileVersion'

export const generated = () => {
  return <FileVersion />
}

export default {
  title: 'Components/FileVersion',
  component: FileVersion,
} as ComponentMeta<typeof FileVersion>
