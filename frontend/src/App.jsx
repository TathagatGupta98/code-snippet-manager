import React from 'react'
import { Route, Routes } from 'react-router'

import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import SnippetDetailPage from './pages/SnippetDetailPage'
import toast from 'react-hot-toast'

const App = () => {
  return (  
    <div data-theme = "forest">
        <Routes>
            <Route path = "/" element={<HomePage/>}/>
            <Route path = "/create" element={<CreatePage/>}/>
            <Route path = "/snippet/:id" element={<SnippetDetailPage/>}/>
        </Routes>
    </div>
  )
}

export default App
