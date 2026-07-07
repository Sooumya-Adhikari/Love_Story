import { useEffect, useState } from 'react'

function diff(targetDate) {
  const now = new Date()
  const target = new Date(targetDate)
  let ms = now - target // time elapsed since the date (for "days together" style counters)
  const future = ms < 0
  ms = Math.abs(ms)

  const totalSeconds = Math.floor(ms / 1000)
  const years = Math.floor(totalSeconds / (365.25 * 24 * 3600))
  const afterYears = totalSeconds - Math.floor(years * 365.25 * 24 * 3600)
  const months = Math.floor(afterYears / (30.44 * 24 * 3600))
  const afterMonths = afterYears - Math.floor(months * 30.44 * 24 * 3600)
  const days = Math.floor(afterMonths / (24 * 3600))
  const hours = Math.floor((afterMonths % (24 * 3600)) / 3600)
  const minutes = Math.floor((afterMonths % 3600) / 60)
  const seconds = Math.floor(afterMonths % 60)

  return { years, months, days, hours, minutes, seconds, future }
}

export function useCountdown(targetDate) {
  const [value, setValue] = useState(() => diff(targetDate))

  useEffect(() => {
    const id = setInterval(() => setValue(diff(targetDate)), 1000)
    return () => clearInterval(id)
  }, [targetDate])

  return value
}
