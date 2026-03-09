import React from 'react'
import type { AdminViewServerProps } from 'payload'
import { DefaultTemplate } from '@payloadcms/next/templates'
import { Button, Gutter } from '@payloadcms/ui'
import Link from 'next/link'

function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return 'No date set'
  return new Date(dateString).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export async function CommandCenter({
  initPageResult,
  params,
  searchParams,
}: AdminViewServerProps) {
  const user = initPageResult.req.user
  if (!user) {
    return (
      <Gutter>
        <h1>Unauthorized</h1>
        <p>You must be logged in to view the Command Center.</p>
      </Gutter>
    )
  }

  const payload = initPageResult.req.payload
  const today = new Date().toISOString()

  const [newLeads, upcomingGigs, pendingDeposits] = await Promise.all([
    payload.find({
      collection: 'inquiries',
      where: { status: { equals: 'new' } },
      limit: 5,
      sort: '-createdAt',
    }),
    payload.find({
      collection: 'events',
      where: { eventDate: { greater_than_equal: today } },
      limit: 5,
      sort: 'eventDate',
    }),
    payload.find({
      collection: 'events',
      where: { paymentStatus: { equals: 'deposit_pending' } },
      limit: 50,
      sort: 'eventDate',
    }),
  ])

  return (
    <DefaultTemplate
      i18n={initPageResult.req.i18n}
      locale={initPageResult.locale}
      params={params}
      payload={payload}
      permissions={initPageResult.permissions}
      searchParams={searchParams}
      user={user}
      visibleEntities={initPageResult.visibleEntities}
    >
      <Gutter>
        {/* Header */}
        <div
          className="mb-8 pb-6"
          style={{ borderBottom: '1px solid var(--theme-elevation-150)' }}
        >
          <h1 className="text-3xl font-bold" style={{ color: 'var(--theme-elevation-800)' }}>
            Tipsy Trails Command Center 🍸
          </h1>
          <p className="mt-1 text-sm" style={{ color: 'var(--theme-elevation-500)' }}>
            Your daily operational overview &mdash;{' '}
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </p>
        </div>

        {/* 3-Column Dashboard Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

          {/* Column 1: Action Required — New Leads */}
          <div
            className="flex flex-col rounded-lg"
            style={{
              border: '1px solid var(--theme-elevation-150)',
              background: 'var(--theme-elevation-50)',
              boxShadow: '0 2px 2px -1px rgba(0,0,0,0.1)',
            }}
          >
            <div
              className="flex items-center justify-between rounded-t-lg px-4 py-3"
              style={{
                background: 'var(--theme-error-50)',
                borderBottom: '1px solid var(--theme-elevation-150)',
              }}
            >
              <h2 className="text-sm font-semibold" style={{ color: 'var(--theme-error-700)' }}>
                🚨 Action Required
              </h2>
              <span
                className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold"
                style={{
                  background: 'var(--theme-error-100)',
                  color: 'var(--theme-error-600)',
                }}
              >
                {newLeads.totalDocs} new
              </span>
            </div>

            <div className="flex-1 p-0" style={{ background: 'var(--theme-elevation-0)' }}>
              {newLeads.docs.length === 0 ? (
                <div className="flex flex-col items-center justify-center px-4 py-10 text-center">
                  <span className="text-3xl">✅</span>
                  <p className="mt-2 text-sm font-medium" style={{ color: 'var(--theme-elevation-600)' }}>
                    All caught up!
                  </p>
                  <p className="text-xs" style={{ color: 'var(--theme-elevation-400)' }}>
                    No new leads right now.
                  </p>
                </div>
              ) : (
                newLeads.docs.map((lead, i) => (
                  <div
                    key={lead.id}
                    className="flex items-center justify-between px-4 py-3"
                    style={{
                      borderTop: i > 0 ? '1px solid var(--theme-elevation-100)' : undefined,
                    }}
                  >
                    <div className="min-w-0 flex-1">
                      <p
                        className="truncate text-sm font-medium"
                        style={{ color: 'var(--theme-elevation-800)' }}
                      >
                        {lead.fullName}
                      </p>
                      <p className="text-xs" style={{ color: 'var(--theme-elevation-500)' }}>
                        {formatDate(lead.eventDate)}
                      </p>
                    </div>
                    <div className="ml-3 shrink-0">
                      <Button
                        el="link"
                        to={`/admin/collections/inquiries/${lead.id}`}
                        buttonStyle="error"
                        size="small"
                      >
                        Review
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {newLeads.totalDocs > 5 && (
              <div
                className="rounded-b-lg px-4 py-2"
                style={{
                  borderTop: '1px solid var(--theme-elevation-100)',
                  background: 'var(--theme-elevation-0)',
                }}
              >
                <Link
                  href="/admin/collections/inquiries"
                  style={{ color: 'var(--theme-error-500)', fontSize: '0.75rem', fontWeight: 500 }}
                >
                  View all {newLeads.totalDocs} leads &rarr;
                </Link>
              </div>
            )}
          </div>

          {/* Column 2: Upcoming Gigs */}
          <div
            className="flex flex-col rounded-lg"
            style={{
              border: '1px solid var(--theme-elevation-150)',
              background: 'var(--theme-elevation-50)',
              boxShadow: '0 2px 2px -1px rgba(0,0,0,0.1)',
            }}
          >
            <div
              className="flex items-center justify-between rounded-t-lg px-4 py-3"
              style={{
                background: 'var(--theme-success-50)',
                borderBottom: '1px solid var(--theme-elevation-150)',
              }}
            >
              <h2 className="text-sm font-semibold" style={{ color: 'var(--theme-success-700)' }}>
                🗓️ Upcoming Gigs
              </h2>
              <span
                className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold"
                style={{
                  background: 'var(--theme-success-100)',
                  color: 'var(--theme-success-600)',
                }}
              >
                {upcomingGigs.totalDocs} booked
              </span>
            </div>

            <div className="flex-1 p-0" style={{ background: 'var(--theme-elevation-0)' }}>
              {upcomingGigs.docs.length === 0 ? (
                <div className="flex flex-col items-center justify-center px-4 py-10 text-center">
                  <span className="text-3xl">📅</span>
                  <p className="mt-2 text-sm font-medium" style={{ color: 'var(--theme-elevation-600)' }}>
                    Calendar is clear
                  </p>
                  <p className="text-xs" style={{ color: 'var(--theme-elevation-400)' }}>
                    No upcoming events scheduled.
                  </p>
                </div>
              ) : (
                upcomingGigs.docs.map((event, i) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between px-4 py-3"
                    style={{
                      borderTop: i > 0 ? '1px solid var(--theme-elevation-100)' : undefined,
                    }}
                  >
                    <div className="min-w-0 flex-1">
                      <p
                        className="truncate text-sm font-medium"
                        style={{ color: 'var(--theme-elevation-800)' }}
                      >
                        {event.eventName}
                      </p>
                      <p className="text-xs" style={{ color: 'var(--theme-elevation-500)' }}>
                        {formatDate(event.eventDate)}
                      </p>
                      <p className="truncate text-xs" style={{ color: 'var(--theme-elevation-400)' }}>
                        {event.venue}
                      </p>
                    </div>
                    <div className="ml-3 shrink-0">
                      <Button
                        el="link"
                        to={`/admin/collections/events/${event.id}`}
                        buttonStyle="secondary"
                        size="small"
                      >
                        Manage
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {upcomingGigs.totalDocs > 5 && (
              <div
                className="rounded-b-lg px-4 py-2"
                style={{
                  borderTop: '1px solid var(--theme-elevation-100)',
                  background: 'var(--theme-elevation-0)',
                }}
              >
                <Link
                  href="/admin/collections/events"
                  style={{ color: 'var(--theme-success-500)', fontSize: '0.75rem', fontWeight: 500 }}
                >
                  View all {upcomingGigs.totalDocs} gigs &rarr;
                </Link>
              </div>
            )}
          </div>

          {/* Column 3: Pending Payments */}
          <div
            className="flex flex-col rounded-lg"
            style={{
              border: '1px solid var(--theme-elevation-150)',
              background: 'var(--theme-elevation-50)',
              boxShadow: '0 2px 2px -1px rgba(0,0,0,0.1)',
            }}
          >
            <div
              className="flex items-center justify-between rounded-t-lg px-4 py-3"
              style={{
                background: 'var(--theme-warning-50)',
                borderBottom: '1px solid var(--theme-elevation-150)',
              }}
            >
              <h2 className="text-sm font-semibold" style={{ color: 'var(--theme-warning-700)' }}>
                💰 Pending Payments
              </h2>
              <span
                className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold"
                style={{
                  background: 'var(--theme-warning-100)',
                  color: 'var(--theme-warning-600)',
                }}
              >
                {pendingDeposits.totalDocs} awaiting
              </span>
            </div>

            <div className="flex-1 p-0" style={{ background: 'var(--theme-elevation-0)' }}>
              {pendingDeposits.docs.length === 0 ? (
                <div className="flex flex-col items-center justify-center px-4 py-10 text-center">
                  <span className="text-3xl">💵</span>
                  <p className="mt-2 text-sm font-medium" style={{ color: 'var(--theme-elevation-600)' }}>
                    All deposits collected!
                  </p>
                  <p className="text-xs" style={{ color: 'var(--theme-elevation-400)' }}>
                    No pending payments right now.
                  </p>
                </div>
              ) : (
                pendingDeposits.docs.map((event, i) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between px-4 py-3"
                    style={{
                      borderTop: i > 0 ? '1px solid var(--theme-elevation-100)' : undefined,
                    }}
                  >
                    <div className="min-w-0 flex-1">
                      <p
                        className="truncate text-sm font-medium"
                        style={{ color: 'var(--theme-elevation-800)' }}
                      >
                        {event.eventName}
                      </p>
                      <span
                        className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium"
                        style={{
                          background: 'var(--theme-warning-100)',
                          color: 'var(--theme-warning-600)',
                        }}
                      >
                        Awaiting Deposit
                      </span>
                    </div>
                    <div className="ml-3 shrink-0">
                      <Button
                        el="link"
                        to={`/admin/collections/events/${event.id}`}
                        buttonStyle="primary"
                        size="small"
                      >
                        Update
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {pendingDeposits.totalDocs > 50 && (
              <div
                className="rounded-b-lg px-4 py-2"
                style={{
                  borderTop: '1px solid var(--theme-elevation-100)',
                  background: 'var(--theme-elevation-0)',
                }}
              >
                <Link
                  href="/admin/collections/events"
                  style={{ color: 'var(--theme-warning-500)', fontSize: '0.75rem', fontWeight: 500 }}
                >
                  View all {pendingDeposits.totalDocs} pending &rarr;
                </Link>
              </div>
            )}
          </div>

        </div>
      </Gutter>
    </DefaultTemplate>
  )
}
