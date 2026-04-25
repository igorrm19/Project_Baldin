import fs from 'fs';
import path from 'path';

const distPath = path.resolve(process.cwd(), 'dist/assets');

if (!fs.existsSync(distPath)) {
  console.error('Dist assets folder not found:', distPath);
  process.exit(1);
}

const thresholds = {
  entry: 150 * 1024,   // 150KB
  chunk: 200 * 1024,   // 200KB
  asset: 300 * 1024    // 300KB
};

const errors = [];
const files = fs.readdirSync(distPath);

for (const fileName of files) {
  const filePath = path.join(distPath, fileName);
  const stats = fs.statSync(filePath);
  const size = stats.size;

  if (fileName.endsWith('.js')) {
    // In this Simple SPA, the main bundle is usually the entry
    const isEntry = fileName.startsWith('index-'); 
    const threshold = isEntry ? thresholds.entry : thresholds.chunk;
    
    if (size > threshold) {
      errors.push(`JS file ${fileName} is ${Math.round(size / 1024)} KB, above threshold ${Math.round(threshold / 1024)} KB`);
    }
  } else if (fileName.endsWith('.css')) {
    if (size > thresholds.asset) {
      errors.push(`CSS file ${fileName} is ${Math.round(size / 1024)} KB, above threshold ${Math.round(thresholds.asset / 1024)} KB`);
    }
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
