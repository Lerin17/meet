export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { Readable } from "stream";

// Create Google Drive client
function getGoogleDriveClient() {


  const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN
});

  
  // const auth = new google.auth.GoogleAuth({
  //   credentials: {
  //     type: "service_account",
  //     project_id: process.env.GOOGLE_PROJECT_ID,
  //     private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  //     client_email: process.env.GOOGLE_CLIENT_EMAIL,
  //   },
  //   scopes: ["https://www.googleapis.com/auth/drive.file"],
  // });

  return google.drive({
    version: "v3",
    auth: oauth2Client
  });
}

const con = () => {
  console.log("Google Drive client initialized with:", )
}



export async function POST(request: NextRequest) {

  con()
console.log('YAMS IS ALWAYS')
  try {

    const DRIVE_FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID;

    if (!DRIVE_FOLDER_ID) {
      return NextResponse.json(
        { error: "Missing GOOGLE_DRIVE_FOLDER_ID" },
        { status: 500 }
      );
    }

    // Parse incoming form
    const formData = await request.formData();

    const file = formData.get("file") as File;

    const folderId = formData.get("folderId") as string;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Optional metadata
    const fileName = (formData.get("fileName") as string) || file.name;
    const fileType = (formData.get("fileType") as string) || file.type;

    // File size check (1GB limit)
    const MAX_SIZE = 1 * 1024 * 1024 * 1024;

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "File exceeds 1GB limit" },
        { status: 400 }
      );
    }

    // Convert browser stream → Node stream
    const stream = Readable.fromWeb(file.stream() as any);

    const drive = getGoogleDriveClient();

    const response = await drive.files.create({
      supportsAllDrives: true,

      requestBody: {
        name: fileName,
        parents: [DRIVE_FOLDER_ID],
        mimeType: fileType,
      },

      media: {
        mimeType: fileType,
        body: stream,
      },

      fields: "id, webViewLink, webContentLink",
    });

    const fileId = response.data.id;

    if (!fileId) {
      throw new Error("Drive did not return a file ID");
    }

    // Optional: make file public
    try {
      await drive.permissions.create({
        fileId,
        requestBody: {
          role: "reader",
          type: "anyone",
        },
      });
    } catch (err) {
      console.warn("Permission update failed (upload still succeeded)");
    }

    return NextResponse.json({
      success: true,
      fileId,
      fileName,
      fileSize: file.size,
      mimeType: fileType,

      webViewLink: response.data.webViewLink,
      webContentLink: response.data.webContentLink,

      downloadUrl: `https://drive.google.com/uc?export=download&id=${fileId}`,
      viewUrl: `https://drive.google.com/file/d/${fileId}/view`,
    });

  } catch (error) {

    console.error("Upload error:", error);

    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}