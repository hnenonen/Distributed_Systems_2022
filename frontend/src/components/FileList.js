import React, { useState, useEffect } from 'react'
import { getFilelist, sendFile } from '../api/files'
import { useAsyncEffect } from '../hooks/async'
import { useNavigate } from 'react-router-dom'

const FileList = () => {
  const [files, setFilelist] = useState()
  const [uploaded, setUploaded] = useState(false)
  const [newFile, setNewFile] = useState()
  const navigate = useNavigate()

  useAsyncEffect(async () => {
    const data = await getFilelist()
    setFilelist(data)
  }, [])

  const fileSend = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('file', newFile)
    await sendFile(formData)
    setUploaded(true)
    const data = await getFilelist()
    setFilelist(data)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setUploaded(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [uploaded])

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
    <h2>Upload new file:</h2>
    <form onSubmit={(e) => fileSend(e)} >
      <input type='file' onChange={(e) => setNewFile(e.target.files[0])} />
      <input type='submit' />
    </form>
    {uploaded &&
      <p>Uploaded</p>
    }
  </>
}

export default FileList
