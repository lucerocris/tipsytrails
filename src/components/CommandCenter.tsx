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
  const now = new Date()
  const today = now.toISOString()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
  const endOfMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
    23,
    59,
    59,
    999,
  ).toISOString()

  const [newLeads, upcomingGigs, pendingDeposits, monthPaidEvents, monthAllEvents, monthInquiries] =
    await Promise.all([
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
      payload.find({
        collection: 'events',
        where: {
          and: [
            { eventDate: { greater_than_equal: startOfMonth } },
            { eventDate: { less_than_equal: endOfMonth } },
            { paymentStatus: { in: ['deposit_paid', 'fully_paid'] } },
          ],
        },
        limit: 100,
      }),
      payload.find({
        collection: 'events',
        where: {
          and: [
            { eventDate: { greater_than_equal: startOfMonth } },
            { eventDate: { less_than_equal: endOfMonth } },
          ],
        },
        limit: 1,
      }),
      payload.find({
        collection: 'inquiries',
        where: {
          and: [
            { createdAt: { greater_than_equal: startOfMonth } },
            { createdAt: { less_than_equal: endOfMonth } },
          ],
        },
        limit: 1,
      }),
    ])

  const totalRevenueMTD = monthPaidEvents.docs.reduce((sum, event) => {
    return sum + (typeof event.agreedPrice === 'number' ? event.agreedPrice : 0)
  }, 0)
  const eventsThisMonth = monthAllEvents.totalDocs
  const newLeadsMTD = monthInquiries.totalDocs
  const conversionRate =
    newLeadsMTD > 0 ? ((eventsThisMonth / newLeadsMTD) * 100).toFixed(1) : '0.0'
  const formattedRevenue = new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(totalRevenueMTD)

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
      <style>{`
        .cc-dashboard-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
        @media (min-width: 768px) {
          .cc-dashboard-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        .cc-kpi-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          margin-bottom: 2rem;
        }
        @media (min-width: 1024px) {
          .cc-kpi-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
      `}</style>
      <Gutter>
        {/* Header */}
        <div
          style={{
            marginBottom: '2rem',
            paddingBottom: '1.5rem',
            borderBottom: '1px solid var(--theme-elevation-150)',
          }}
        >
          <h1
            style={{
              fontSize: '1.875rem',
              fontWeight: 700,
              color: 'var(--theme-elevation-800)',
            }}
          >
            Tipsy Trails Command Center 🍸
          </h1>
          <p
            style={{
              marginTop: '0.25rem',
              fontSize: '0.875rem',
              color: 'var(--theme-elevation-500)',
            }}
          >
            Your daily operational overview &mdash;{' '}
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </p>
        </div>

        {/* Financial & Operational KPIs */}
        <div className="cc-kpi-grid">
          {/* Total Revenue MTD */}
          <div
            style={{
              backgroundColor: 'var(--theme-elevation-50)',
              borderColor: 'var(--theme-elevation-150)',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderRadius: '8px',
              padding: '16px',
            }}
          >
            <span
              style={{
                color: 'var(--theme-elevation-500)',
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '8px',
                display: 'block',
              }}
            >
              📈 Total Revenue
            </span>
            <span style={{ fontSize: '24px', fontWeight: 'bold' }}>{formattedRevenue}</span>
          </div>

          {/* Events This Month */}
          <div
            style={{
              backgroundColor: 'var(--theme-elevation-50)',
              borderColor: 'var(--theme-elevation-150)',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderRadius: '8px',
              padding: '16px',
            }}
          >
            <span
              style={{
                color: 'var(--theme-elevation-500)',
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '8px',
                display: 'block',
              }}
            >
              📅 Gigs This Month
            </span>
            <span style={{ fontSize: '24px', fontWeight: 'bold' }}>{eventsThisMonth}</span>
          </div>

          {/* New Leads MTD */}
          <div
            style={{
              backgroundColor: 'var(--theme-elevation-50)',
              borderColor: 'var(--theme-elevation-150)',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderRadius: '8px',
              padding: '16px',
            }}
          >
            <span
              style={{
                color: 'var(--theme-elevation-500)',
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '8px',
                display: 'block',
              }}
            >
              🎯 New Leads
            </span>
            <span style={{ fontSize: '24px', fontWeight: 'bold' }}>{newLeadsMTD}</span>
          </div>

          {/* Conversion Rate */}
          <div
            style={{
              backgroundColor: 'var(--theme-elevation-50)',
              borderColor: 'var(--theme-elevation-150)',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderRadius: '8px',
              padding: '16px',
            }}
          >
            <span
              style={{
                color: 'var(--theme-elevation-500)',
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '8px',
                display: 'block',
              }}
            >
              ⚡ Conversion
            </span>
            <span style={{ fontSize: '24px', fontWeight: 'bold' }}>{conversionRate}%</span>
          </div>
        </div>

        {/* 3-Column Dashboard Grid */}
        <div className="cc-dashboard-grid">
          {/* Column 1: Action Required — New Leads */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              borderRadius: '0.5rem',
              border: '1px solid var(--theme-elevation-150)',
              background: 'var(--theme-elevation-50)',
              boxShadow: '0 2px 2px -1px rgba(0,0,0,0.1)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderRadius: '0.5rem 0.5rem 0 0',
                padding: '0.75rem 1rem',
                background: 'var(--theme-error-50)',
                borderBottom: '1px solid var(--theme-elevation-150)',
              }}
            >
              <h2
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: 'var(--theme-error-700)',
                }}
              >
                🚨 Action Required
              </h2>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  borderRadius: '9999px',
                  padding: '0.125rem 0.625rem',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  background: 'var(--theme-error-100)',
                  color: 'var(--theme-error-600)',
                }}
              >
                {newLeads.totalDocs} new
              </span>
            </div>

            <div style={{ flex: 1, padding: 0, background: 'var(--theme-elevation-0)' }}>
              {newLeads.docs.length === 0 ? (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2.5rem 1rem',
                    textAlign: 'center',
                  }}
                >
                  <span style={{ fontSize: '1.875rem' }}>✅</span>
                  <p
                    style={{
                      marginTop: '0.5rem',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      color: 'var(--theme-elevation-600)',
                    }}
                  >
                    All caught up!
                  </p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--theme-elevation-400)' }}>
                    No new leads right now.
                  </p>
                </div>
              ) : (
                newLeads.docs.map((lead, i) => (
                  <div
                    key={lead.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.75rem 1rem',
                      borderTop: i > 0 ? '1px solid var(--theme-elevation-100)' : undefined,
                    }}
                  >
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <p
                        style={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          fontSize: '0.875rem',
                          fontWeight: 500,
                          color: 'var(--theme-elevation-800)',
                        }}
                      >
                        {lead.fullName}
                      </p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--theme-elevation-500)' }}>
                        {formatDate(lead.eventDate)}
                      </p>
                    </div>
                    <div style={{ marginLeft: '0.75rem', flexShrink: 0 }}>
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
                style={{
                  borderRadius: '0 0 0.5rem 0.5rem',
                  padding: '0.5rem 1rem',
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
            style={{
              display: 'flex',
              flexDirection: 'column',
              borderRadius: '0.5rem',
              border: '1px solid var(--theme-elevation-150)',
              background: 'var(--theme-elevation-50)',
              boxShadow: '0 2px 2px -1px rgba(0,0,0,0.1)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderRadius: '0.5rem 0.5rem 0 0',
                padding: '0.75rem 1rem',
                background: 'var(--theme-success-50)',
                borderBottom: '1px solid var(--theme-elevation-150)',
              }}
            >
              <h2
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: 'var(--theme-success-700)',
                }}
              >
                🗓️ Upcoming Gigs
              </h2>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  borderRadius: '9999px',
                  padding: '0.125rem 0.625rem',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  background: 'var(--theme-success-100)',
                  color: 'var(--theme-success-600)',
                }}
              >
                {upcomingGigs.totalDocs} booked
              </span>
            </div>

            <div style={{ flex: 1, padding: 0, background: 'var(--theme-elevation-0)' }}>
              {upcomingGigs.docs.length === 0 ? (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2.5rem 1rem',
                    textAlign: 'center',
                  }}
                >
                  <span style={{ fontSize: '1.875rem' }}>📅</span>
                  <p
                    style={{
                      marginTop: '0.5rem',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      color: 'var(--theme-elevation-600)',
                    }}
                  >
                    Calendar is clear
                  </p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--theme-elevation-400)' }}>
                    No upcoming events scheduled.
                  </p>
                </div>
              ) : (
                upcomingGigs.docs.map((event, i) => (
                  <div
                    key={event.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.75rem 1rem',
                      borderTop: i > 0 ? '1px solid var(--theme-elevation-100)' : undefined,
                    }}
                  >
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <p
                        style={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          fontSize: '0.875rem',
                          fontWeight: 500,
                          color: 'var(--theme-elevation-800)',
                        }}
                      >
                        {event.eventName}
                      </p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--theme-elevation-500)' }}>
                        {formatDate(event.eventDate)}
                      </p>
                      <p
                        style={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          fontSize: '0.75rem',
                          color: 'var(--theme-elevation-400)',
                        }}
                      >
                        {event.venue}
                      </p>
                    </div>
                    <div style={{ marginLeft: '0.75rem', flexShrink: 0 }}>
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
                style={{
                  borderRadius: '0 0 0.5rem 0.5rem',
                  padding: '0.5rem 1rem',
                  borderTop: '1px solid var(--theme-elevation-100)',
                  background: 'var(--theme-elevation-0)',
                }}
              >
                <Link
                  href="/admin/collections/events"
                  style={{
                    color: 'var(--theme-success-500)',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                  }}
                >
                  View all {upcomingGigs.totalDocs} gigs &rarr;
                </Link>
              </div>
            )}
          </div>

          {/* Column 3: Pending Payments */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              borderRadius: '0.5rem',
              border: '1px solid var(--theme-elevation-150)',
              background: 'var(--theme-elevation-50)',
              boxShadow: '0 2px 2px -1px rgba(0,0,0,0.1)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderRadius: '0.5rem 0.5rem 0 0',
                padding: '0.75rem 1rem',
                background: 'var(--theme-warning-50)',
                borderBottom: '1px solid var(--theme-elevation-150)',
              }}
            >
              <h2
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: 'var(--theme-warning-700)',
                }}
              >
                💰 Pending Payments
              </h2>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  borderRadius: '9999px',
                  padding: '0.125rem 0.625rem',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  background: 'var(--theme-warning-100)',
                  color: 'var(--theme-warning-600)',
                }}
              >
                {pendingDeposits.totalDocs} awaiting
              </span>
            </div>

            <div style={{ flex: 1, padding: 0, background: 'var(--theme-elevation-0)' }}>
              {pendingDeposits.docs.length === 0 ? (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2.5rem 1rem',
                    textAlign: 'center',
                  }}
                >
                  <span style={{ fontSize: '1.875rem' }}>💵</span>
                  <p
                    style={{
                      marginTop: '0.5rem',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      color: 'var(--theme-elevation-600)',
                    }}
                  >
                    All deposits collected!
                  </p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--theme-elevation-400)' }}>
                    No pending payments right now.
                  </p>
                </div>
              ) : (
                pendingDeposits.docs.map((event, i) => (
                  <div
                    key={event.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.75rem 1rem',
                      borderTop: i > 0 ? '1px solid var(--theme-elevation-100)' : undefined,
                    }}
                  >
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <p
                        style={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          fontSize: '0.875rem',
                          fontWeight: 500,
                          color: 'var(--theme-elevation-800)',
                        }}
                      >
                        {event.eventName}
                      </p>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          borderRadius: '9999px',
                          padding: '0.125rem 0.5rem',
                          fontSize: '0.75rem',
                          fontWeight: 500,
                          background: 'var(--theme-warning-100)',
                          color: 'var(--theme-warning-600)',
                        }}
                      >
                        Awaiting Deposit
                      </span>
                    </div>
                    <div style={{ marginLeft: '0.75rem', flexShrink: 0 }}>
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
                style={{
                  borderRadius: '0 0 0.5rem 0.5rem',
                  padding: '0.5rem 1rem',
                  borderTop: '1px solid var(--theme-elevation-100)',
                  background: 'var(--theme-elevation-0)',
                }}
              >
                <Link
                  href="/admin/collections/events"
                  style={{
                    color: 'var(--theme-warning-500)',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                  }}
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
