import { useEffect, useState } from 'react'

function useDebounce(value, delay) {
  const [valueDebounce, setValueDebounce] = useState(value)

  useEffect(() => {
    const hanldeTimeout = setTimeout(() => setValueDebounce(value), delay)
    return () => clearTimeout(hanldeTimeout)
  }, [value])

  return valueDebounce
}

export default useDebounce
