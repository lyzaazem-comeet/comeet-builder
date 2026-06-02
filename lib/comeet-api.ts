// Server-side only — called from API routes to avoid CORS

const COMEET_API_BASE =
  process.env.COMEET_API_BASE_URL || "https://app.comeet.fr"
const COMEET_PUBLIC = process.env.COMEET_PUBLIC_URL || "https://comeet.fr"

export interface ComeetEventDetails {
  id: number
  user_id: number
  name: string
  start_event_date: string
  start_event_time: string
  end_event_date: string
  end_event_time: string
  address_line_one: string
  address_line_two: string
  city: string
  state: string
  postal_code: string
  encrypted_id: string
  event_status: string
  [key: string]: any
}

export interface GuestData {
  event: { id: number }
  guests: {
    token: string
    limit: number
    status: string
  }
}

export interface RSVPAttendee {
  nameTitle: string
  firstName: string
  lastName: string
  email: string
  attendingStatus: string // "1" = attending, "2" = maybe, "3" = not attending
}

export interface RSVPSubmission {
  event_id: string | number
  seatlimit: number
  total_attending_no: number
  name_title: string[]
  first_name: string[]
  last_name: string[]
  email: string[]
  attending_status: string[]
  guest_access_token: string
  other_data?: string
}

export async function fetchEventDetails(
  eventId: string,
): Promise<ComeetEventDetails> {
  const response = await fetch(`${COMEET_API_BASE}/event-details/${eventId}`)
  if (!response.ok) {
    throw new Error(`Failed to fetch event details: ${response.status}`)
  }
  return response.json()
}

export async function submitPublishedUrl(
  eventEncryptedId: string,
  publishedUrl: string,
) {
  const response = await fetch(`${COMEET_API_BASE}/event/set-url`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: eventEncryptedId, url: publishedUrl }),
  })
  if (!response.ok) {
    throw new Error(`Failed to submit published URL: ${response.status}`)
  }
  return response.json()
}

export async function decryptGuestData(
  encryptedData: string,
): Promise<GuestData> {
  const response = await fetch(`${COMEET_PUBLIC}/decrypt`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: encryptedData }),
  })
  if (!response.ok) {
    throw new Error(`Failed to decrypt guest data: ${response.status}`)
  }
  return response.json()
}

export async function submitRSVP(data: RSVPSubmission) {
  const params = new URLSearchParams()
  params.append("event_id", data.event_id.toString())
  params.append("guest_access_token", data.guest_access_token)
  params.append("seatlimit", data.seatlimit.toString())
  params.append("total_attending_no", data.total_attending_no.toString())

  // Add arrays with bracket notation
  data.name_title.forEach((value) => {
    params.append("name_title[]", value)
  })
  data.first_name.forEach((value) => {
    params.append("first_name[]", value)
  })
  data.last_name.forEach((value) => {
    params.append("last_name[]", value)
  })
  data.email.forEach((value) => {
    params.append("email[]", value)
  })
  data.attending_status.forEach((value) => {
    params.append("attending_status[]", value)
  })

  if (data.other_data) {
    params.append("other_data", data.other_data)
  }

  const response = await fetch(`${COMEET_API_BASE}/event_invite_form_submit`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  })
  return response.json()
}
