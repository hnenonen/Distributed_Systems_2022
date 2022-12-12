import React, { useState } from 'react'
import { getFilelist } from '../api/files'
import { useAsyncEffect } from '../hooks/async'
import { useNavigate } from 'react-router-dom'

const FileList = () => {
  const [files, setFilelist] = useState()
  const navigate = useNavigate()

  useAsyncEffect(async () => {
    const data = await getFilelist()
    setFilelist(data)
  }, [])

  return <>
    <h1>Available files:</h1>
    <ul>
      {files?.map((f, i) => <li key={i}>
        <a
          onClick={() => navigate(`/files/${f.name}`)}
          style={{ cursor: 'pointer', color: 'blue' }}
        >{f.name}</a>
      </li>)}
    </ul>
  </>
}

export default FileList
