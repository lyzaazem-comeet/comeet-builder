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
        { status: 400 }
      )
    }

    // Generate unique path: eventId/timestamp-filename
    const ext = file.name.split(".").pop() || "jpg"
    const folder = eventId || "general"
    const filename = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const { error } = await supabase.storage
      .from("event-images")
      .upload(filename, buffer, {
        contentType: file.type,
        upsert: false,
      })

    if (error) {
      return NextResponse.json(
        { error: `Upload failed: ${error.message}` },
        { status: 500 }
      )
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("event-images").getPublicUrl(filename)

    return NextResponse.json({ url: publicUrl })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
