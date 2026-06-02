import type { Block } from "@/types/blocks"

/**
 * Recursively scans block configs for base64 data:image strings,
 * uploads each to Supabase Storage via /api/upload, and replaces
 * the base64 string with the returned public URL.
 */
export async function uploadBase64Images(
  blocks: Block[],
  eventId: string
): Promise<Block[]> {
  const cleaned = JSON.parse(JSON.stringify(blocks)) as Block[]

  for (const block of cleaned) {
    block.config = await processValue(block.config, eventId)
  }

  return cleaned
}

async function processValue(value: any, eventId: string): Promise<any> {
  if (typeof value === "string" && value.startsWith("data:image")) {
    return uploadBase64(value, eventId)
  }

  if (Array.isArray(value)) {
    return Promise.all(value.map((item) => processValue(item, eventId)))
  }

  if (value && typeof value === "object") {
    const result: any = {}
    for (const key of Object.keys(value)) {
      result[key] = await processValue(value[key], eventId)
    }
    return result
  }

  return value
}

async function uploadBase64(dataUrl: string, eventId: string): Promise<string> {
  // Convert base64 data URL to Blob
  const res = await fetch(dataUrl)
  const blob = await res.blob()

  const formData = new FormData()
  formData.append("file", blob, `image-${Date.now()}.jpg`)
  formData.append("eventId", eventId)

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL || ""}/api/upload`,
    {
      method: "POST",
      body: formData,
    }
  )

  if (!response.ok) {
    console.error("Failed to upload base64 image")
    return dataUrl // Return original if upload fails
  }

  const { url } = await response.json()
  return url
}
