const fs = require('fs');
const path = require('path');
// no external ndjson dependency needed for writing NDJSON lines

const inputPath = path.join(__dirname, '..', 'data', 'j105.ndjson');
const outputPath = path.join(__dirname, '..', 'data', 'data.ndjson');

const content = fs.readFileSync(inputPath, 'utf8').trim();

let records = [];

if (!content) {
  console.error('Input file is empty:', inputPath);
  process.exit(1);
}

if (content.startsWith('[')) {
  try {
    records = JSON.parse(content);
  } catch (err) {
    console.error('Error parsing JSON array:', err.message);
    process.exit(1);
  }
} else {
  // Treat as NDJSON (one JSON object per line)
  const lines = content.split(/\r?\n/).filter(Boolean);
  try {
    records = lines.map(line => JSON.parse(line));
  } catch (err) {
    console.error('Error parsing NDJSON line:', err.message);
    process.exit(1);
  }
}

const output = fs.createWriteStream(outputPath, { encoding: 'utf8' });
for (const item of records) {
  output.write(JSON.stringify(item) + '\n');
}
output.end(() => console.log('Conversion complete! Wrote', records.length, 'records to', outputPath));