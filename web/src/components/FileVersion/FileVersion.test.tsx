import { render } from '@redwoodjs/testing/web'

import FileVersion from './FileVersion'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('FileVersion', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FileVersion />)
    }).not.toThrow()
  })
})
