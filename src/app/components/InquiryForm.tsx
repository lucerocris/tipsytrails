'use client'

import React, { useRef } from 'react'

export function InquiryForm() {

  const dateInputRef = useRef<HTMLInputElement>(null)
  const [displayDate, setDisplayDate] = React.useState('')


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

  return (
    <div>
      {/* header section */}
      <div className="py-20">
        <div className="flex flex-col max-w-7xl mx-auto gap-10">
          <div className="flex flex-col gap-3 w-full text-center items-center">
            <h2 className="text-primary text-5xl font-medium">Ready to Elevate your Event?</h2>
            <p className="text-black text-lg max-w-xl font-medium">
              Dates fill up fast. Fill in the details below to secure your date. We typically reply
              via <span className="font-bold">Viber</span> or{' '}
              <span className="font-bold">Messenger</span> for a quicker response.
            </p>
          </div>
        </div>
      </div>

      <div className="py-20 relative">
        <div className="absolute bottom-0 h-70 w-full bg-primary z-10" />

        {/* form */}
        <div className="z-20 relative rounded-sm flex flex-col max-w-7xl mx-auto gap-10 bg-[#FFFDF9] shadow-xl h-175 py-15 px-40">
          <form className="grid grid-cols-1 md:grid-cols-2 w-full gap-6">
            {/* Field 1: First Name */}
            <div className="flex flex-col gap-1 border border-gray-400/50 rounded-sm py-2 px-4 w-full h-auto focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
              <label htmlFor="firstName" className="text-xs font-medium text-gray-600">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Enter your first name"
                className="w-full text-md text-gray-900 placeholder:text-gray-500 bg-transparent border-none outline-none p-0 focus:ring-0"
              />
            </div>

            {/* Field 2: Last Name */}
            <div className="flex flex-col gap-1 border border-gray-400/50 rounded-sm py-2 px-4 w-full h-auto focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
              <label htmlFor="lastName" className="text-xs font-medium text-gray-600">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Enter your last name"
                className="w-full text-md text-gray-900 placeholder:text-gray-500 bg-transparent border-none outline-none p-0 focus:ring-0"
              />
            </div>

            {/* Field 3: Email */}
            <div className="flex flex-col gap-1 border border-gray-400/50 rounded-sm py-2 px-4 w-full h-auto focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
              <label htmlFor="email" className="text-xs font-medium text-gray-600">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="name@example.com"
                className="w-full text-md text-gray-900 placeholder:text-gray-500 bg-transparent border-none outline-none p-0 focus:ring-0"
              />
            </div>

            {/* Field 4: Phone */}
            <div className="flex flex-col gap-1 border border-gray-400/50 rounded-sm py-2 px-4 w-full h-auto focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
              <label htmlFor="phone" className="text-xs font-medium text-gray-600">
                Mobile / Viber Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="+1 (555) 000-0000"
                className="w-full text-md text-gray-900 placeholder:text-gray-500 bg-transparent border-none outline-none p-0 focus:ring-0"
              />
            </div>

            {/* Field 5: Event Date */}
            <div className="flex flex-row items-stretch border border-gray-400/50 rounded-sm w-full h-auto focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all overflow-hidden relative">
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
                className="flex flex-col gap-1 flex-1 py-2 px-4 cursor-pointer"
              >
                <label htmlFor="date" className="text-xs font-medium text-gray-600 cursor-pointer">
                  Event Date
                </label>
                <div className="w-full text-md text-gray-900 uppercase">
                  {displayDate || 'MM / DD / YYYY'}
                </div>
              </div>

              {/* Right: Icon with Click Handler */}
              <div
                onClick={handleDateClick}
                className="flex items-center justify-center border-l border-gray-400/50 w-14 cursor-pointer text-gray-500 hover:text-primary hover:bg-black/5 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                  />
                </svg>
              </div>
            </div>

            {/* Field 6: Event Type */}
            <div className="flex flex-col gap-1 border border-gray-400/50 rounded-sm py-2 px-4 w-full h-auto focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
              <label htmlFor="type" className="text-xs font-medium text-gray-600">
                Event Type
              </label>
              <select
                id="type"
                name="type"
                className="w-full text-md text-gray-900 bg-transparent border-none outline-none p-0 focus:ring-0 appearance-none"
                defaultValue=""
              >
                <option value="" disabled className="text-gray-500">
                  Select type
                </option>
                <option value="wedding">Wedding</option>
                <option value="birthday">Birthday</option>
                <option value="corporate">Corporate</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Field 7: Venue */}
            <div className="flex flex-col gap-1 border border-gray-400/50 rounded-sm py-2 px-4 w-full h-auto focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
              <label htmlFor="venue" className="text-xs font-medium text-gray-600">
                Venue
              </label>
              <input
                type="text"
                id="venue"
                name="venue"
                placeholder="Enter your venue"
                className="w-full text-md text-gray-900 placeholder:text-gray-500 bg-transparent border-none outline-none p-0 focus:ring-0"
              />
            </div>

            {/* Field 8: Guest Count */}
            <div className="flex flex-row items-stretch border border-gray-400/50 rounded-sm w-full h-auto focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all overflow-hidden">
              <div className="flex flex-col gap-1 flex-1 py-2 px-4">
                <label htmlFor="guests" className="text-xs font-medium text-gray-600">
                  Estimated Guest Count
                </label>
                <input
                  type="number"
                  id="guests"
                  name="guests"
                  placeholder="0"
                  className="w-full text-md text-gray-900 placeholder:text-gray-500 bg-transparent border-none outline-none p-0 focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>

              <div className="flex flex-col border-l border-gray-400/50 w-10">
                <button
                  type="button"
                  className="flex-1 hover:bg-black/5 flex items-center justify-center text-gray-500 hover:text-primary transition-colors"
                  aria-label="Increase guest count"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  className="flex-1 border-t border-gray-400/50 hover:bg-black/5 flex items-center justify-center text-gray-500 hover:text-primary transition-colors"
                  aria-label="Decrease guest count"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01-.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Field 9: Message */}
            <div className="md:col-span-2 flex flex-col gap-1 border border-gray-400/50 rounded-sm py-2 px-4 w-full focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
              <label htmlFor="message" className="text-xs font-medium text-gray-600">
                Message / Special Requests
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Tell us about your drink preferences or any specific theme ideas"
                className="w-full text-md text-gray-900 placeholder:text-gray-500 bg-transparent border-none outline-none p-0 focus:ring-0 resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 mt-4">
              <button
                type="submit"
                className="px-5 py-3 bg-primary text-white text-md rounded-sm hover:bg-opacity-90 transition-all"
              >
                Send Inquiry
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
