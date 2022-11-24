import './App.css'
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import axios from 'axios'

const API_URL = 'http://86.50.228.193'

const App = () => {
  const [filelist, setFilelist] = useState()

  useEffect(() => {
    const fetchFilelist = async () => {
      const { data } = await axios.get(`${API_URL}/api/filelist`)
      setFilelist(data)
    }
    fetchFilelist()
  }, [filelist])

  return <Container>
    {filelist?.map((f, i) => <div key={i}>{f.name}</div>)}
  </Container>
}

export default App
