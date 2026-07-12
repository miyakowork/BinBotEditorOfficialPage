import { useState } from 'react'
import { releaseStatus } from '../content/site'

export interface ReleaseButtonProps {
  className?: string
  compact?: boolean
}

export function ReleaseButton({ className = '', compact = false }: ReleaseButtonProps) {
  const [noticeVisible, setNoticeVisible] = useState(false)

  return (
    <div className={`release-control${compact ? ' release-control--compact' : ''}`}>
      <button
        className={className}
        type="button"
        onClick={() => setNoticeVisible(true)}
      >
        {releaseStatus.label}
      </button>
      {noticeVisible ? <p role="status">{releaseStatus.notice}</p> : null}
    </div>
  )
}
