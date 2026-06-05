import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File
    const eventId = formData.get("eventId") as string | null

    if (!file || !file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Invalid or missing image file" },
        { status: 400 },
      )
    }

    // Check file size (50MB limit for safety)
    if (file.size > 50 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File too large (max 50MB)" },
        { status: 400 },
      )
    }

    // Generate unique path: eventId/timestamp-filename
    const ext = file.name.split(".").pop() || "jpg"
    const folder = eventId || "general"
    const filename = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    console.log("Attempting to upload to Supabase:", {
      filename,
      bucket: "event-images",
      fileSize: buffer.length,
      contentType: file.type,
    })

    const { data, error } = await supabase.storage
      .from("event-images")
      .upload(filename, buffer, {
        contentType: file.type,
        upsert: false,
      })

    if (error) {
      console.error("Supabase upload error:", error)
      return NextResponse.json(
        {
          error: `Upload failed: ${error.message}`,
        },
        { status: 500 },
      )
    }

    console.log("Upload successful:", data)

    const { data: urlData } = supabase.storage
      .from("event-images")
      .getPublicUrl(filename)

    console.log("Generated public URL:", urlData.publicUrl)

    return NextResponse.json({ url: urlData.publicUrl })
  } catch (e: any) {
    console.error("Upload endpoint error:", e)
    return NextResponse.json(
      {
        error: e.message || "Upload failed",
      },
      { status: 500 },
    )
  }
}
