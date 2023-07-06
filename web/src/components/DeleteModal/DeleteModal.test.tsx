import { render } from '@redwoodjs/testing/web'

import DeleteModal from './DeleteModal'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('DeleteModal', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DeleteModal />)
    }).not.toThrow()
  })
})
