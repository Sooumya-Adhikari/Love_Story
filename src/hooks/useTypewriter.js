import { useEffect, useState } from 'react'

/**
 * Cycles through an array of messages, typing and deleting each one.
 */
export function useTypewriter(messages = [], { typingSpeed = 55, deletingSpeed = 30, pause = 1800 } = {}) {
  const [text, setText] = useState('')
  const [msgIndex, setMsgIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (!messages.length) return
    const current = messages[msgIndex % messages.length]
    let timeout

    if (!deleting && text.length < current.length) {
      timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), typingSpeed)
    } else if (!deleting && text.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), deletingSpeed)
    } else if (deleting && text.length === 0) {
      setDeleting(false)
      setMsgIndex((i) => (i + 1) % messages.length)
    }

    return () => clearTimeout(timeout)
  }, [text, deleting, msgIndex, messages, typingSpeed, deletingSpeed, pause])

  return text
}
