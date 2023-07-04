import { render } from '@redwoodjs/testing/web'

import DropFilesPage from './DropFilesPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('DropFilesPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DropFilesPage />)
    }).not.toThrow()
  })
})
