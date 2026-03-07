import { NextResponse } from "next/server";
import { getGoogleAccessToken } from "@/lib/google";

export async function POST(req: Request) {

  const accessToken = await getGoogleAccessToken();

  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();

  const uploadRes = await fetch(
    "https://www.googleapis.com/upload/drive/v3/files?uploadType=media",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": file.type
      },
      body: Buffer.from(arrayBuffer)
    }
  );

  const data = await uploadRes.json();

  return NextResponse.json(data);
} 