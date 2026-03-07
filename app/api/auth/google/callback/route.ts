import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.json(
      { error: "No authorization code received" },
      { status: 400 }
    );
  }

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      redirect_uri:
        "http://localhost:3000/api/auth/google/callback",
      grant_type: "authorization_code",
    }),
  });

  const tokenData = await tokenRes.json();

  if (!tokenRes.ok) {
    return NextResponse.json(
      { error: "Token exchange failed", details: tokenData },
      { status: 500 }
    );
  }

  const { access_token, refresh_token, expires_in } = tokenData;

  // ⚠️ IMPORTANT: You only get refresh_token the first time
  console.log("ACCESS TOKEN:", access_token);
  console.log("REFRESH TOKEN:", refresh_token);
  console.log("EXPIRES IN:", expires_in);

  return NextResponse.json({
    message: "Authorization successful",
    refresh_token,
  });
}