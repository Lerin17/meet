import { NextResponse } from "next/server";
import { getGoogleAccessToken } from "@/lib/google";

export async function GET() {

  const accessToken = await getGoogleAccessToken();

  const res = await fetch(
    "https://www.googleapis.com/drive/v3/files?pageSize=10",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  );

  const data = await res.json();

  return NextResponse.json(data);
}