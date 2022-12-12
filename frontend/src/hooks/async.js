import { useEffect } from 'react'

const handleAsync = fn => () => {
  const handle = async () => {
    const result = await fn()
    return result
  }
  handle()
}

export const useAsyncEffect = (fn, deps) => {
  useEffect(() => handleAsync(fn), deps)
}
