// Quick test of the /api/upload endpoint
async function testUpload() {
  try {
    // Create a small test file
    const testContent = 'Test upload from Meet app - ' + new Date().toISOString();
    const blob = new Blob([testContent], { type: 'text/plain' });
    const file = new File([blob], 'test-upload.txt', { type: 'text/plain' });

    // Create form data
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);
    formData.append('fileType', file.type);

    console.log('Starting upload test...');

    // Send to API
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    console.log('Response status:', response.status);
    const result = await response.json();
    console.log('Result:', result);

    if (response.ok) {
      console.log('✓ Upload successful!');
      console.log('File ID:', result.fileId);
      console.log('View link:', result.viewUrl);
      return true;
    } else {
      console.error('✗ Upload failed:', result.error);
      return false;
    }
  } catch (error) {
    console.error('✗ Error:', error);
    return false;
  }
}

// Run the test
testUpload();
