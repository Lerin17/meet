const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

async function testGoogleDriveConnection() {
  try {
    console.log('Testing Google Drive API connection...\n');

    // Load env variables
    require('dotenv').config({ path: path.join(__dirname, '.env.local') });

    const credentials = {
      type: 'service_account',
      project_id: process.env.GOOGLE_PROJECT_ID,
      private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      client_id: process.env.GOOGLE_CLIENT_ID,
      auth_uri: process.env.GOOGLE_AUTH_URI,
      token_uri: process.env.GOOGLE_TOKEN_URI,
      auth_provider_x509_cert_url: process.env.GOOGLE_AUTH_PROVIDER_CERT_URL,
      client_x509_cert_url: process.env.GOOGLE_CLIENT_CERT_URL,
    };

    console.log('Credentials loaded:', {
      project_id: credentials.project_id,
      client_email: credentials.client_email,
    });

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/drive.file'],
    });

    const drive = google.drive({ version: 'v3', auth });

    console.log('\nAttempting to authenticate...');
    const authClient = await auth.getClient();
    console.log('✓ Authentication successful!\n');

    // Create test file
    const testFileName = `test-upload-${Date.now()}.txt`;
    const testContent = `Test upload from Node.js - ${new Date().toISOString()}`;
    const tempFile = path.join(__dirname, testFileName);
    fs.writeFileSync(tempFile, testContent);

    console.log(`Uploading test file: ${testFileName}`);

    // Upload to Drive
    const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
    if (!folderId) {
      throw new Error('GOOGLE_DRIVE_FOLDER_ID not set in .env.local');
    }

    console.log(`Target folder ID: ${folderId}\n`);

    const response = await drive.files.create({
      requestBody: {
        name: testFileName,
        parents: [folderId],
        mimeType: 'text/plain',
      },
      media: {
        mimeType: 'text/plain',
        body: fs.createReadStream(tempFile),
      },
      fields: 'id, webViewLink, webContentLink',
    });

    const fileId = response.data.id;
    console.log('✓ File uploaded successfully!');
    console.log(`File ID: ${fileId}`);
    console.log(`View link: ${response.data.webViewLink}`);

    // Make it public
    try {
      await drive.permissions.create({
        fileId: fileId,
        requestBody: {
          role: 'reader',
          type: 'anyone',
        },
      });
      console.log('✓ File made publicly accessible');
    } catch (err) {
      console.log('⚠ Could not make file public (may need manual sharing)');
    }

    // Cleanup
    fs.unlinkSync(tempFile);

    console.log('\n✅ All tests passed! Google Drive API is working correctly.');
    console.log(`\nYou can view your test file here: ${response.data.webViewLink}`);
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.message.includes('GOOGLE_DRIVE_FOLDER_ID')) {
      console.error('\n⚠️  Please set GOOGLE_DRIVE_FOLDER_ID in .env.local');
    }
    process.exit(1);
  }
}

testGoogleDriveConnection();
