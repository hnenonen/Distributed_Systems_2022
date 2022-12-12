import './App.css'
import React from 'react'
import { Container } from 'react-bootstrap'
import { Route, Routes } from 'react-router-dom'
import FileList from './components/FileList'
import FilePage from './components/FilePage'

const App = () => <Container>
  <Routes>
    <Route path='/' element={<FileList />}/>
    <Route path='/files/:file' element={<FilePage />} />
  </Routes>
</Container>

export default App
