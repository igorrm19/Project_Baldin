import fs from 'fs';
import path from 'path';

const statsPath = path.resolve(process.cwd(), '.vite-stats.json');
if (!fs.existsSync(statsPath)) {
  console.error('Bundle stats file not found:', statsPath);
  process.exit(1);
}

const raw = fs.readFileSync(statsPath, 'utf8');
const stats = JSON.parse(raw);
const output = stats.output || stats[0]?.output || [];
const thresholds = {
  entry: 150 * 1024,
  chunk: 200 * 1024,
  asset: 300 * 1024
};

const errors = [];
for (const file of output) {
  if (!file || typeof file !== 'object') continue;
  const size = file.code ? Buffer.byteLength(file.code, 'utf8') : file.size || 0;
  if (file.type === 'chunk' && file.isEntry && size > thresholds.entry) {
    errors.push(`Entry chunk ${file.fileName} is ${Math.round(size / 1024)} KB, above threshold ${Math.round(thresholds.entry / 1024)} KB`);
  }
  if (file.type === 'chunk' && !file.isEntry && size > thresholds.chunk) {
    errors.push(`Chunk ${file.fileName} is ${Math.round(size / 1024)} KB, above threshold ${Math.round(thresholds.chunk / 1024)} KB`);
  }
  if (file.type === 'asset' && size > thresholds.asset) {
    errors.push(`Asset ${file.fileName} is ${Math.round(size / 1024)} KB, above threshold ${Math.round(thresholds.asset / 1024)} KB`);
  }
}

if (errors.length) {
  console.error('Bundle size policy failed:');
  for (const msg of errors) {
    console.error(`  - ${msg}`);
  }
  process.exit(1);
}

console.log('Bundle size policy passed.');
