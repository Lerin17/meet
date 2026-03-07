export async function getGoogleAccessToken() {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN!,
      grant_type: "refresh_token"
    })
  });


  console.log("Google token response status:", res.status,

    process.env.GOOGLE_CLIENT_ID!,
     process.env.GOOGLE_CLIENT_SECRET!,
       process.env.GOOGLE_REFRESH_TOKEN!,
  );

  const data = await res.json();

  console.log("Google token response data:", data);

  if (!data.access_token) {
    throw new Error("Failed to obtain access token");
  }

  return data.access_token;
}