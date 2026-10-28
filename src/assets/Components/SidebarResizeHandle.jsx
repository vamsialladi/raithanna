import { useRef } from 'react'

const MIN_WIDTH = 180
const MAX_WIDTH = 360
const RESIZE_STEP = 16

function SidebarResizeHandle({ width, onWidthChange, label }) {
  const dragStart = useRef(null)

  function handlePointerDown(event) {
    event.preventDefault()
    dragStart.current = { pointerId: event.pointerId, startX: event.clientX, startWidth: width }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  function handlePointerMove(event) {
    const start = dragStart.current
    if (!start || start.pointerId !== event.pointerId) return

    onWidthChange(Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, start.startWidth + event.clientX - start.startX)))
  }

  function handlePointerUp(event) {
    if (dragStart.current?.pointerId === event.pointerId) dragStart.current = null
  }

  function handleKeyDown(event) {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return

    event.preventDefault()
    const change = event.key === 'ArrowRight' ? RESIZE_STEP : -RESIZE_STEP
    onWidthChange(Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, width + change)))
  }

  return (
    <div
      className="dashboard-sidebar-resize"
      role="separator"
      aria-label={label}
      aria-orientation="vertical"
      aria-valuemin={MIN_WIDTH}
      aria-valuemax={MAX_WIDTH}
      aria-valuenow={width}
      tabIndex={0}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onKeyDown={handleKeyDown}
    />
  )
}

export default SidebarResizeHandle
