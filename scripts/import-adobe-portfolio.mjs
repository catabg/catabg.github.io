import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { extname, join } from 'node:path';

const inventoryPath = process.argv[2];

if (!inventoryPath) {
  throw new Error('Usage: node scripts/import-adobe-portfolio.mjs <inventory.json>');
}

const rootDir = new URL('..', import.meta.url).pathname;
const outputDir = join(rootDir, 'public', 'portfolio', 'adobe');
const dataPath = join(rootDir, 'src', 'data', 'adobe-portfolio.json');
const inventory = JSON.parse(await readFile(inventoryPath, 'utf8'));

await mkdir(outputDir, { recursive: true });

const cleanParagraphs = (paragraphs) =>
  paragraphs.filter((paragraph) => paragraph && paragraph !== 'Organizar imágenes');

const extensionFor = (url) => extname(new URL(url).pathname) || '.jpg';

const projects = [];

for (const project of inventory) {
  const projectDir = join(outputDir, project.slug);
  await mkdir(projectDir, { recursive: true });

  const images = [];

  for (const [index, image] of project.images.entries()) {
    const extension = extensionFor(image.src);
    const filename = `${String(index + 1).padStart(3, '0')}${extension}`;
    const response = await fetch(image.src);

    if (!response.ok) {
      throw new Error(`Failed to download ${image.src}: ${response.status}`);
    }

    await writeFile(join(projectDir, filename), Buffer.from(await response.arrayBuffer()));
    images.push({
      src: `portfolio/adobe/${project.slug}/${filename}`,
      alt: image.alt || `${project.heading} sample ${index + 1}`
    });
  }

  projects.push({
    slug: project.slug,
    title: project.heading,
    description: cleanParagraphs(project.paragraphs),
    links: project.links.filter((link) => link.href && !link.href.includes('portfolio.adobe.com')),
    images,
    embeds: project.media
      .filter((item) => item.tag === 'iframe' && item.src)
      .map((item) => item.src)
  });

  console.log(`${project.heading}: ${images.length} images`);
}

await writeFile(dataPath, `${JSON.stringify(projects, null, 2)}\n`);
console.log(`Wrote ${dataPath}`);
