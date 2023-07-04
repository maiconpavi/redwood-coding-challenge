// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route } from '@redwoodjs/router'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={ScaffoldLayout} title="FileVersions" titleTo="fileVersions" buttonLabel="New FileVersion" buttonTo="newFileVersion">
        <Route path="/file-versions/new" page={FileVersionNewFileVersionPage} name="newFileVersion" />
        <Route path="/file-versions/{id:Int}/edit" page={FileVersionEditFileVersionPage} name="editFileVersion" />
        <Route path="/file-versions/{id:Int}" page={FileVersionFileVersionPage} name="fileVersion" />
        <Route path="/file-versions" page={FileVersionFileVersionsPage} name="fileVersions" />
      </Set>
      <Set wrap={ScaffoldLayout} title="Files" titleTo="files" buttonLabel="New File" buttonTo="newFile">
        <Route path="/files/new" page={FileNewFilePage} name="newFile" />
        <Route path="/files/{id:Int}/edit" page={FileEditFilePage} name="editFile" />
        <Route path="/files/{id:Int}" page={FileFilePage} name="file" />
        <Route path="/files" page={FileFilesPage} name="files" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
