import axios from 'axios'
import { API_URL } from '../config'

export const getFilelist = async () => {
  const { data } = await axios.get(`${API_URL}/filelist`)
  return data
}

export const getFile = async fileName => {
  const { data } = await axios.get(`${API_URL}/files/${fileName}`)
  return data
}

export const sendFile = async payload => {
  const { data } = await axios.post(`${API_URL}/files`, payload)
  return data
}
