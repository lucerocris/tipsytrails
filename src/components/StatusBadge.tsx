import type { DefaultCellComponentProps } from 'payload'

type StatusValue = 'new' | 'contacted' | 'proposal_sent' | 'booked' | 'lost'

type BadgeConfig = {
  background: string
  color: string
  label: string
}

const STATUS_CONFIG: Record<StatusValue, BadgeConfig> = {
  new: {
    background: 'var(--theme-error-100, #fee2e2)',
    color: 'var(--theme-error-700, #b91c1c)',
    label: 'New',
  },
  contacted: {
    background: 'var(--theme-info-100, #dbeafe)',
    color: 'var(--theme-info-700, #1d4ed8)',
    label: 'Contacted',
  },
  proposal_sent: {
    background: 'var(--theme-warning-100, #fef9c3)',
    color: 'var(--theme-warning-700, #a16207)',
    label: 'Proposal Sent',
  },
  booked: {
    background: 'var(--theme-success-100, #dcfce7)',
    color: 'var(--theme-success-700, #15803d)',
    label: 'Booked',
  },
  lost: {
    background: 'var(--theme-elevation-150, #e5e7eb)',
    color: 'var(--theme-elevation-600, #4b5563)',
    label: 'Lost',
  },
}

export const StatusBadge: React.FC<DefaultCellComponentProps> = ({ cellData }) => {
  const config = STATUS_CONFIG[cellData as StatusValue]

  if (!config) return <span>{cellData}</span>

  return (
    <span
      style={{
        background: config.background,
        color: config.color,
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: '12px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        display: 'inline-block',
        whiteSpace: 'nowrap',
      }}
    >
      {config.label}
    </span>
  )
}
