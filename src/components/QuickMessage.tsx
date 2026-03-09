'use client'

import React from 'react'
import { useFormFields, Button } from '@payloadcms/ui'

export function QuickMessage() {
  const mobileViber = useFormFields(([fields]) => fields.mobileViber?.value as string)
  const messengerUsername = useFormFields(([fields]) => fields.messengerUsername?.value as string)
  const email = useFormFields(([fields]) => fields.email?.value as string)

  if (!mobileViber && !messengerUsername && !email) return null

  const sanitizedNumber = mobileViber
    ? mobileViber.replace(/[\s\-]/g, '').replace(/^09/, '+639')
    : null

  const sanitizedMessenger = messengerUsername
    ? messengerUsername.replace(/^m\.me\//, '')
    : null

  return (
    <div
      style={{
        background: 'var(--theme-elevation-50)',
        border: '1px solid var(--theme-elevation-150)',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '16px',
      }}
    >
      <p
        style={{
          color: 'var(--theme-elevation-500)',
          fontSize: '11px',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          margin: '0 0 12px 0',
        }}
      >
        Quick Connect
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {sanitizedNumber && (
          <Button
            el="anchor"
            url={`viber://chat?number=${sanitizedNumber}`}
            extraButtonProps={{
              style: {
                backgroundColor: '#7360f2',
                borderColor: '#7360f2',
                color: '#fff',
                width: '100%',
                justifyContent: 'center',
              },
            }}
          >
            Viber: {sanitizedNumber}
          </Button>
        )}

        {sanitizedMessenger && (
          <Button
            el="anchor"
            url={`https://m.me/${sanitizedMessenger}`}
            newTab
            extraButtonProps={{
              rel: 'noopener noreferrer',
              style: {
                backgroundColor: '#0084FF',
                borderColor: '#0084FF',
                color: '#fff',
                width: '100%',
                justifyContent: 'center',
              },
            }}
          >
            Messenger: {sanitizedMessenger}
          </Button>
        )}

        {email && (
          <Button
            el="anchor"
            url={`mailto:${email}`}
            buttonStyle="secondary"
            extraButtonProps={{
              style: {
                width: '100%',
                justifyContent: 'center',
              },
            }}
          >
            Email: {email}
          </Button>
        )}
      </div>
    </div>
  )
}

export default QuickMessage
