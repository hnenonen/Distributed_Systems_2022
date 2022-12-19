import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getFile } from '../api/files'
// import { useAsyncEffect } from '../hooks/async'

const FilePage = () => {
  const { file } = useParams()
  const [details, setDetails] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    getFile(file).then(data => {
      console.log(data, 'moi2')
      setDetails(data)
    }).catch(e => {
      console.error(e)
    })
  }, [])

  if (!details) return <>No content</>

  return <>
    <br />
    <h2>Hajoitettu järjestelmä | Destroyed system</h2>
    <hr />
    <h1>File: {details.file}</h1>
    <div>{details.payload}</div>
    <div>Host: {details.host}</div>
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
