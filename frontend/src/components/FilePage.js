import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getFile } from '../api/files'
import { useAsyncEffect } from '../hooks/async'

const FilePage = () => {
  const { file } = useParams()
  const [details, setDetails] = useState()
  const navigate = useNavigate()

  useAsyncEffect(async () => {
    const data = await getFile(file)
    setDetails(data)
  }, [])

  if (!details) return <>No content</>

  return <>
    <h1>File: {details.file}</h1>
    <div>{details.payload}</div>
    <a
      href={`/api/download/${details.file}`}
      download={details.file}
      style={{ cursor: 'pointer', color: 'blue' }}
    >Download</a>
    <br />
    <a
      onClick={() => navigate('/')}
      style={{ cursor: 'pointer', color: 'blue' }}
    >Back to the list</a>
  </>
}

export default FilePage
