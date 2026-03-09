'use server'

import { getPayload } from 'payload'
import config from '@payload-config'

export type InquiryFormData = {
  firstName: string
  lastName: string
  email: string
  mobileViber: string
  eventDate: string
  eventType: string
  venue: string
  guestCount: number
  specialRequests: string
}

export type SubmitInquiryResult =
  | { success: true }
  | { success: false; error: string }

export async function submitInquiry(data: InquiryFormData): Promise<SubmitInquiryResult> {
  try {
    const payload = await getPayload({ config })

    await payload.create({
      collection: 'inquiries',
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email || undefined,
        mobileViber: data.mobileViber,
        eventDate: data.eventDate,
        eventType: data.eventType || undefined,
        venue: data.venue,
        guestCount: data.guestCount,
        specialRequests: data.specialRequests || undefined,
      },
    })

    return { success: true }
  } catch {
    return { success: false, error: 'Failed to submit inquiry. Please try again.' }
  }
}
