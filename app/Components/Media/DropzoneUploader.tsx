'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface UploadResponse {
  success: boolean;
  fileId: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  webViewLink: string;
  downloadUrl: string;
  viewUrl: string;
}

interface UploadProgress {
  fileName: string;
  progress: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
  error?: string;
  response?: UploadResponse;
}

export default function DropzoneUploader() {
  const [uploads, setUploads] = useState<UploadProgress[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    setIsUploading(true);

    // Initialize upload progress for all files
    const newUploads: UploadProgress[] = acceptedFiles.map((file) => ({
      fileName: file.name,
      progress: 0,
      status: 'pending',
      
    }));

    setUploads((prev) => [...prev, ...newUploads]);

    // Upload each file
    for (let i = 0; i < acceptedFiles.length; i++) {
      const file = acceptedFiles[i];
      const uploadIndex = uploads.length + i;

      try {
        // Update status to uploading

        // setUploads((prev) => {
        //   return prev.map((item, index) => {
        //     if (index === uploadIndex) {
        //       return {
        //         ...prev[index],
        //         status: 'uploading',
        //         progress: 0,
        //       };
        //     } else {
        //       return item;
        //     }
        //   })
        // })

        setUploads((prev) => {
          const updated = [...prev];
          updated[uploadIndex] = {
            ...updated[uploadIndex],
            status: 'uploading',
            progress: 0,
          };
          return updated;
        });

        // Create form data
        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', file.name);
        formData.append('fileType', file.type);
        formData.append('folderId', process.env.NEXT_PUBLIC_GOOGLE_DRIVE_FOLDER_ID || '');

        console.log("Uploading file:", file.name, file.size, file.type);

        // Upload file
        const response = await fetch('/api/drive/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || 'Upload failed');
        }

        const result: UploadResponse = await response.json();

        console.log("Upload response for file:", result);

        // Update success status
        setUploads((prev) => {
          const updated = [...prev];
          updated[uploadIndex] = {
            ...updated[uploadIndex],
            status: 'success',
            progress: 100,
            response: result,
          };
          return updated;
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';

        // Update error status
        setUploads((prev) => {
          const updated = [...prev];
          updated[uploadIndex] = {
            ...updated[uploadIndex],
            status: 'error',
            error: errorMessage,
          };
          return updated;
        });
      }
    }

    setIsUploading(false);
  }, [uploads.length]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    disabled: isUploading,
  });

  const handleClearUploads = () => {
    setUploads([]);
  };

  const successCount = uploads.filter((u) => u.status === 'success').length;
  const errorCount = uploads.filter((u) => u.status === 'error').length;

  return (
    <div className="w-full">
      {/* Dropzone Area */}
      <div
        {...getRootProps()}
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer h-[200px] ${
          isDragActive
            ? 'border-indigo-500 bg-indigo-50'
            : isUploading
              ? 'border-gray-300 bg-gray-50 cursor-not-allowed'
              : 'border-gray-300 hover:border-indigo-400'
        }`}
      >
        <input {...getInputProps()} />

        {isDragActive ? (
          <div>
            <p className="text-indigo-600 font-semibold">Drop files here...</p>
          </div>
        ) : (
          <div>
            <p className="text-gray-700 font-semibold mb-2">Drag files here</p>
            <p className="text-gray-500 text-sm mb-4">or click to select files</p>
            <p className="text-gray-400 text-xs">Max file size: 1GB</p>
          </div>
        )}

        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/50 rounded-lg">
            <div className="text-indigo-600">
              <div className="animate-spin mb-2">⏳</div>
              <p className="font-semibold">Uploading...</p>
            </div>
          </div>
        )}
      </div>

{/* 
      /////////////////////////// */}

      {/* Upload Progress List */}
      {uploads.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-700">
              Upload Status ({successCount} succeeded, {errorCount} failed)
            </h3>
            {!isUploading && (
              <button
                onClick={handleClearUploads}
                className="text-sm text-gray-500 hover:text-gray-700 underline"
              >
                Clear
              </button>
            )}
          </div>

          <div className="space-y-3 max-h-64 overflow-y-auto">
            {uploads.map((upload, index) => (
              <div
                key={index}
                className={`p-3 rounded-md border ${
                  upload.status === 'success'
                    ? 'bg-green-50 border-green-200'
                    : upload.status === 'error'
                      ? 'bg-red-50 border-red-200'
                      : 'bg-blue-50 border-blue-200'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-gray-800 truncate">
                      {upload.fileName}
                    </p>
                    {upload.status === 'uploading' && (
                      <div className="mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-indigo-600 h-2 rounded-full transition-all"
                            style={{ width: `${upload.progress}%` }}
                          />
                        </div>
                      </div>
                    )}
                    {upload.status === 'error' && (
                      <p className="text-sm text-red-600 mt-1">{upload.error}</p>
                    )}
                  </div>

                  {/* Status Icon */}
                  <div className="ml-3 flex-shrink-0">
                    {upload.status === 'success' && (
                      <span className="text-green-600 font-bold">✓</span>
                    )}
                    {upload.status === 'error' && (
                      <span className="text-red-600 font-bold">✕</span>
                    )}
                    {upload.status === 'uploading' && (
                      <span className="text-indigo-600 animate-spin">⟳</span>
                    )}
                    {upload.status === 'pending' && (
                      <span className="text-gray-400">⊙</span>
                    )}
                  </div>
                </div>

                {/* File Info (on success) */}
                {upload.response && upload.status === 'success' && (
                  <div className="mt-2 text-xs text-gray-600">
                    <p>
                      Size: {(upload.response.fileSize / 1024 / 1024).toFixed(2)}
                      MB
                    </p>
                    <a
                      href={upload.response.viewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:underline"
                    >
                      View in Drive →
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
