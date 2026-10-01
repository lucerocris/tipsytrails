'use client'
import React, { useRef } from 'react'
import { Calendar, ChevronDown, ChevronUp, Martini } from 'lucide-react'
export function InquiryForm() {
  const dateInputRef = useRef<HTMLInputElement>(null)
  const [displayDate, setDisplayDate] = React.useState('')
  const [preferredContact, setPreferredContact] = React.useState('Viber')
  const [guestCount, setGuestCount] = React.useState(0)
  const [isLoading, setIsLoading] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const handleDateClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker()
    }
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value) {
      const date = new Date(value)
      const formatted = date.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
      })
      setDisplayDate(formatted)
    } else {
      setDisplayDate('')
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)

    const rawDate = formData.get('date') as string
    let eventDate: string | undefined
    if (rawDate) {
      eventDate = new Date(rawDate).toISOString()
    }

    const data = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      mobileViber: formData.get('phone') as string,
      preferredContact: formData.get('preferredContact') as string,
      messengerUsername: (formData.get('messengerUsername') as string) || undefined,
      eventDate,
      eventType: formData.get('type') as string,
      venue: formData.get('venue') as string,
      guestCount: Number(formData.get('guests')),
      specialRequests: formData.get('message') as string,
    }

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body?.errors?.[0]?.message || `Request failed (${res.status})`)
      }

      setIsSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="inquiry" className="section border-t border-line">
      <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="flex flex-col gap-4 lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow">Last call</p>
          <h2 className="display-l">
            Tell us about
            <span className="accent block">your event.</span>
          </h2>
          <p className="lead mt-1 max-w-md">
            Dates fill up fast. Fill in the details to secure yours. We typically reply via Viber or
            Messenger for a quicker response.
          </p>
        </div>

        <div className="rounded-m bg-paper-2 p-5 md:p-10 lg:col-span-7">
          {isSuccess ? (
            <div
              className="flex flex-col items-start gap-4 py-10"
              role="status"
              aria-live="polite"
            >
              <span className="flex size-12 items-center justify-center rounded-full bg-tint text-primary">
                <Martini className="size-5" aria-hidden="true" />
              </span>
              <h3 className="display-m">Inquiry sent.</h3>
              <p className="max-w-md text-base text-ink-75">
                We&apos;ll reach out to you via your preferred contact method shortly. Thank you for
                choosing Tipsy Trails!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid w-full grid-cols-1 gap-3 md:grid-cols-2">
              {/* Field 1: First Name */}
              <div className="field">
                <label htmlFor="firstName" className="field-label">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  autoComplete="given-name"
                  placeholder="Enter your first name"
                  className="field-input"
                />
              </div>

              {/* Field 2: Last Name */}
              <div className="field">
                <label htmlFor="lastName" className="field-label">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  autoComplete="family-name"
                  placeholder="Enter your last name"
                  className="field-input"
                />
              </div>

              {/* Field 3: Email */}
              <div className="field">
                <label htmlFor="email" className="field-label">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  placeholder="name@example.com"
                  className="field-input"
                />
              </div>

              {/* Field 4: Phone */}
              <div className="field">
                <label htmlFor="phone" className="field-label">
                  Mobile / Viber Number
                </label>
                <div className="flex items-center">
                  <span className="select-none whitespace-nowrap text-base text-ink-50">+63</span>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="912 345 6789"
                    maxLength={12}
                    onKeyDown={(e) => {
                      const allowed = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab']
                      if (!allowed.includes(e.key) && !/^\d$/.test(e.key)) e.preventDefault()
                    }}
                    onChange={(e) => {
                      e.target.value = e.target.value.replace(/^0+/, '')
                    }}
                    className="field-input ml-1 flex-1"
                  />
                </div>
              </div>

              {/* Field 4b: Preferred Contact Method */}
              <div className="field">
                <label htmlFor="preferredContact" className="field-label">
                  Preferred Contact Method
                </label>
                <select
                  id="preferredContact"
                  name="preferredContact"
                  value={preferredContact}
                  onChange={(e) => setPreferredContact(e.target.value)}
                  className="field-input appearance-none"
                >
                  <option value="Viber">Viber</option>
                  <option value="Facebook Messenger">Facebook Messenger</option>
                  <option value="Email">Email</option>
                </select>
              </div>

              {/* Field 4c: Messenger Username (conditional) */}
              {preferredContact === 'Facebook Messenger' && (
                <div className="field">
                  <label htmlFor="messengerUsername" className="field-label">
                    Messenger Username
                  </label>
                  <div className="flex items-center">
                    <span className="select-none whitespace-nowrap text-base text-ink-50">
                      m.me/
                    </span>
                    <input
                      type="text"
                      id="messengerUsername"
                      name="messengerUsername"
                      placeholder="your.username"
                      className="field-input flex-1"
                    />
                  </div>
                </div>
              )}

              {/* Field 5: Event Date */}
              <div className="field relative flex-row! items-stretch gap-0! overflow-hidden p-0!">
                <input
                  ref={dateInputRef}
                  type="date"
                  id="date"
                  name="date"
                  onChange={handleDateChange}
                  className="absolute inset-0 opacity-0 w-0 h-0 pointer-events-none"
                />

                {/* Left: Display area */}
                <div
                  onClick={handleDateClick}
                  className="flex flex-1 cursor-pointer flex-col gap-1 px-3.5 py-2.5"
                >
                  <label htmlFor="date" className="field-label cursor-pointer">
                    Event Date
                  </label>
                  <div className={`text-base ${displayDate ? 'text-ink' : 'text-ink-50'}`}>
                    {displayDate || 'MM / DD / YYYY'}
                  </div>
                </div>

                {/* Right: Icon with Click Handler */}
                <button
                  type="button"
                  onClick={handleDateClick}
                  aria-label="Choose event date"
                  className="flex w-12 items-center justify-center border-l border-line text-ink-75 transition-colors hover:bg-paper-3 hover:text-primary"
                >
                  <Calendar className="size-4" aria-hidden="true" />
                </button>
              </div>

              {/* Field 6: Event Type */}
              <div className="field">
                <label htmlFor="type" className="field-label">
                  Event Type
                </label>
                <select id="type" name="type" className="field-input appearance-none" defaultValue="">
                  <option value="" disabled>
                    Select type
                  </option>
                  <option value="wedding">Wedding</option>
                  <option value="birthday">Birthday</option>
                  <option value="corporate">Corporate</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Field 7: Venue */}
              <div className="field">
                <label htmlFor="venue" className="field-label">
                  Venue
                </label>
                <input
                  type="text"
                  id="venue"
                  name="venue"
                  placeholder="Enter your venue"
                  className="field-input"
                />
              </div>

              {/* Field 8: Guest Count */}
              <div className="field flex-row! items-stretch gap-0! overflow-hidden p-0!">
                <div className="flex flex-1 flex-col gap-1 px-3.5 py-2.5">
                  <label htmlFor="guests" className="field-label">
                    Estimated Guest Count
                  </label>
                  <input
                    type="number"
                    id="guests"
                    name="guests"
                    value={guestCount}
                    onChange={(e) => setGuestCount(Math.max(0, Number(e.target.value)))}
                    className="field-input [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>

                <div className="flex w-12 flex-col border-l border-line">
                  <button
                    type="button"
                    onClick={() => setGuestCount((c) => c + 1)}
                    className="flex flex-1 items-center justify-center text-ink-75 transition-colors hover:bg-paper-3 hover:text-primary"
                    aria-label="Increase guest count"
                  >
                    <ChevronUp className="size-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setGuestCount((c) => Math.max(0, c - 1))}
                    className="flex flex-1 items-center justify-center border-t border-line text-ink-75 transition-colors hover:bg-paper-3 hover:text-primary"
                    aria-label="Decrease guest count"
                  >
                    <ChevronDown className="size-4" aria-hidden="true" />
                  </button>
                </div>
              </div>

              {/* Field 9: Message */}
              <div className="field md:col-span-2">
                <label htmlFor="message" className="field-label">
                  Message / Special Requests
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Tell us about your drink preferences or any specific theme ideas"
                  className="field-input resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="mt-3 flex flex-col gap-3 md:col-span-2">
                {error && (
                  <p
                    role="alert"
                    className="rounded-s border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700"
                  >
                    {error}
                  </p>
                )}
                <button type="submit" disabled={isLoading} className="btn btn-primary h-12! w-full">
                  {isLoading ? 'Sending...' : 'Send Inquiry'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
