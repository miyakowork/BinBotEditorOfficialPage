import { releaseStatus } from '../content/site'

export interface ReleaseButtonProps {
  className?: string
  compact?: boolean
}

export function ReleaseButton({ className = '', compact = false }: ReleaseButtonProps) {
  return (
    <div className={`release-control${compact ? ' release-control--compact' : ''}`}>
      <a
        className={`magnetic-button${className ? ` ${className}` : ''}`}
        href={releaseStatus.downloadUrl}
      >
        <span className="button-label">{releaseStatus.label}</span>
      </a>
      {!compact ? <p className="release-notice">{releaseStatus.notice}</p> : null}
    </div>
  )
}
