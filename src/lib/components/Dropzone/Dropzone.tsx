import { useCallback, useMemo, useRef } from "react"
import { DropzoneProps } from "./Dropzone.model"
import "./Dropzone.css"

export function Dropzone(props: DropzoneProps) {
  const { handleValidDrop, handleInvalidDrop, accept = "image/*", children, className } = props

  const validDrag = useRef(false)

  const typeMatch = useMemo(() => new RegExp("^" + accept.split(/,\s*/).join("|")), [accept])

  const setDragClasses = useCallback((e: React.DragEvent, value: boolean) => {
    validDrag.current = value
    e.currentTarget.classList.toggle("is-dragged-over", value)
  }, [])

  const filterNonMatchingFiles = useCallback(
    (e: React.DragEvent) => {
      const { items } = e.dataTransfer
      const files = Array.from(items).filter(({ type }) => type.match(typeMatch))
      e.dataTransfer.items.clear()
      files.forEach(file => e.dataTransfer.items.add(file.getAsFile()!))
    },
    [typeMatch],
  )

  const isInsideContainer = useCallback((e: React.DragEvent) => {
    const { top, bottom, left, right } = e.currentTarget.getBoundingClientRect()
    return e.clientX < right && e.clientX > left && e.clientY > top && e.clientY < bottom
  }, [])

  const isValidDragData = useCallback(
    (e: React.DragEvent) => {
      const { items } = e.dataTransfer
      const files = Array.from(items)
      return files.some(({ type }) => type.match(typeMatch))
    },
    [typeMatch],
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setDragClasses(e, false)

      filterNonMatchingFiles(e)
      if (e.dataTransfer.items.length) handleValidDrop(e)
      else handleInvalidDrop(e)
    },
    [handleValidDrop, handleInvalidDrop, filterNonMatchingFiles, setDragClasses],
  )

  const handleDragEnter = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()

      if (isValidDragData(e)) {
        e.dataTransfer.effectAllowed = "copy"
        setDragClasses(e, true)
      } else {
        e.dataTransfer.effectAllowed = "none"
        setDragClasses(e, false)
      }
    },
    [isValidDragData, setDragClasses],
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    e.dataTransfer.dropEffect = validDrag.current ? "copy" : "none"
  }, [])

  const handleDragLeave = useCallback(
    (e: React.DragEvent) => {
      if (isInsideContainer(e)) return
      setDragClasses(e, false)
    },
    [isInsideContainer, setDragClasses],
  )

  const handleDragEnd = useCallback(
    (e: React.DragEvent) => setDragClasses(e, false),
    [setDragClasses],
  )

  const classNames = useMemo(() => `pk-dropzone ${className || ""}`, [className])

  return (
    <div
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDrop={handleDrop}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      className={classNames}
      data-testid="pk-dropzone"
    >
      {children}
    </div>
  )
}
