import { readFile, unlink, writeFile } from 'node:fs/promises';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import sharp from 'sharp';

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dataPath = join(rootDir, 'src', 'data', 'adobe-portfolio.json');
const assetRoot = resolve(rootDir, 'public', 'portfolio', 'adobe');
const projects = JSON.parse(await readFile(dataPath, 'utf8'));

for (const project of projects) {
  for (const image of project.images) {
    const source = resolve(rootDir, 'public', image.src);

    if (!source.startsWith(`${assetRoot}/`)) {
      throw new Error(`Refusing to modify image outside ${assetRoot}: ${source}`);
    }

    const target = source.replace(/\.[^.]+$/, '.webp');

    await sharp(source)
      .resize({ width: 1440, height: 1440, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 84, effort: 5 })
      .toFile(target);

    await unlink(source);
    image.src = relative(join(rootDir, 'public'), target).replaceAll('\\', '/');
  }

  console.log(`${project.title}: optimized ${project.images.length} images`);
}

await writeFile(dataPath, `${JSON.stringify(projects, null, 2)}\n`);
