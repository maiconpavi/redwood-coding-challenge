import { render } from '@redwoodjs/testing/web'

import FileTable from './FileTable'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('FileTable', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FileTable />)
    }).not.toThrow()
  })
})
