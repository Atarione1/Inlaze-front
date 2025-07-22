import { useEffect, useState } from 'react'

// Hook personalizado para retrasar la ejecución de una función
// Útil para optimizar eventos como búsquedas o entradas de texto
export function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay ?? 500)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}