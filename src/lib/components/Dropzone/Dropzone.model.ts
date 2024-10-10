export type DropzoneProps = {
  handleValidDrop: React.DragEventHandler
  handleInvalidDrop: React.DragEventHandler
  accept?: string
  className?: string
  children: React.ReactNode | React.ReactNode[] | null
}
