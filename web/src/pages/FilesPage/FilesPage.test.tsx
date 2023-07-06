import { render } from '@redwoodjs/testing/web'

import FilesPage from './FilesPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('FilesPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FilesPage />)
    }).not.toThrow()
  })
})
