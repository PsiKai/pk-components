export type TDropzoneProps = {
  handleValidDrop: React.DragEventHandler
  handleInvalidDrop: React.DragEventHandler
  accept?: string
  className?: string
  children: React.ReactNode
}
