// src/components/CommandCenterLink.tsx
import React from 'react'
import Link from 'next/link'

export function CommandCenterLink() {
  return (
    <div style={{ marginBottom: '10px' }}>
      <Link
        href="/admin/command-center"
        style={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}
      >
        ⚡ Command Center
      </Link>
    </div>
  )
}
