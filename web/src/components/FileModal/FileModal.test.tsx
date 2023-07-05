import { render } from '@redwoodjs/testing/web'

import FileModal from './FileModal'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('FileModal', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FileModal />)
    }).not.toThrow()
  })
})
