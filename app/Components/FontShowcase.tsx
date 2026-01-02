export function FontShowcase() {
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold mb-8">Font Showcase</h1>

      {/* Inter Font Family */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Inter (Sans-serif)</h2>
        <p className="font-inter font-inter-light">Inter Light - The quick brown fox jumps over the lazy dog</p>
        <p className="font-inter font-inter-normal">Inter Regular - The quick brown fox jumps over the lazy dog</p>
        <p className="font-inter font-inter-medium">Inter Medium - The quick brown fox jumps over the lazy dog</p>
        <p className="font-inter font-inter-semibold">Inter SemiBold - The quick brown fox jumps over the lazy dog</p>
        <p className="font-inter font-inter-bold">Inter Bold - The quick brown fox jumps over the lazy dog</p>
      </div>

      {/* Epilogue Font Family */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Epilogue (Sans-serif)</h2>
        <p className="font-epilogue font-epilogue-normal">Epilogue Regular - The quick brown fox jumps over the lazy dog</p>
        <p className="font-epilogue font-epilogue-medium">Epilogue Medium - The quick brown fox jumps over the lazy dog</p>
        <p className="font-epilogue font-epilogue-semibold">Epilogue SemiBold - The quick brown fox jumps over the lazy dog</p>
        <p className="font-epilogue font-epilogue-bold">Epilogue Bold - The quick brown fox jumps over the lazy dog</p>
        <p className="font-epilogue font-epilogue-extrabold">Epilogue ExtraBold - The quick brown fox jumps over the lazy dog</p>
      </div>

      {/* Display/Script Fonts */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Display & Script Fonts</h2>
        <p className="font-berumias text-2xl">Berumias - The quick brown fox jumps over the lazy dog</p>
        <p className="font-glinka text-2xl">Glinka - The quick brown fox jumps over the lazy dog</p>
        <p className="font-diatype text-2xl">Diatype - The quick brown fox jumps over the lazy dog</p>
        <p className="font-lovefrom text-2xl">LoveFrom Serif - The quick brown fox jumps over the lazy dog</p>
      </div>

      {/* Monospace Fonts */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Monospace Fonts</h2>
        <p className="font-milligram bg-gray-100 p-2 rounded">Milligram Macro - console.log('Hello, World!');</p>
        <p className="font-monument bg-gray-100 p-2 rounded">Monument Grotesk Mono - console.log('Hello, World!');</p>
      </div>

      {/* Usage Examples */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Usage Examples:</h3>
        <div className="space-y-2 text-sm">
          <p><code className="bg-gray-200 px-2 py-1 rounded">className="font-inter font-inter-bold"</code> - Inter Bold</p>
          <p><code className="bg-gray-200 px-2 py-1 rounded">className="font-epilogue font-epilogue-semibold"</code> - Epilogue SemiBold</p>
          <p><code className="bg-gray-200 px-2 py-1 rounded">className="font-berumias"</code> - Berumias Regular</p>
          <p><code className="bg-gray-200 px-2 py-1 rounded">className="font-milligram"</code> - Milligram Macro</p>
        </div>
      </div>
    </div>
  );
}