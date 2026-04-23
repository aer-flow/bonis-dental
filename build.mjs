import fs from 'node:fs';
import path from 'node:path';

const out = 'dist';
const items = ['assets', 'contact', 'despre-noi', 'servicii', 'tarife', 'index.html', 'README.md'];

fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });

for (const item of items) {
  if (fs.existsSync(item)) {
    fs.cpSync(item, path.join(out, item), { recursive: true });
  }
}
