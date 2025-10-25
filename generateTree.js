// scripts/generateTree.js
import fs from 'fs';
import path from 'path';

function list(dir, prefix = '') {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    if (
      [
        'travel-trust-backend',
        'node_modules',
        '.git',
        '.next',
        'dist',
        'build',
        'artifacts',
        'cache',
        'deployments',
        'fhevmTemp',
        'types',
        '.github',
        '.vscode',
        'generateTree.js',
        '.prettierrc',
      ].includes(item)
    )
      continue;
    const full = path.join(dir, item);
    const stats = fs.statSync(full);
    console.log(prefix + '├── ' + item);
    if (stats.isDirectory()) list(full, prefix + '│   ');
  }
}
list('.');
