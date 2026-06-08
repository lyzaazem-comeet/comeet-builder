import { NextResponse } from "next/server";
import { decryptGuestData, submitRSVP } from "@/lib/comeet-api";

// POST /api/rsvp — proxies Comeet RSVP submission
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { data: encryptedGuestData, ...submission } = body;
    console.log({ body });
    console.log({ encryptedGuestData, submission });

    let guestAccessToken: string | null = null;

    if (encryptedGuestData) {
      const decrypted = await decryptGuestData(encryptedGuestData);
      guestAccessToken = decrypted.guests?.token ?? null;
    }
    console.log({ guestAccessToken });
    const result = await submitRSVP({
      ...submission,
      ...(guestAccessToken ? { guest_access_token: guestAccessToken } : {}),
    });
    return NextResponse.json(result);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
