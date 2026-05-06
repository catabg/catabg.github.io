import { access, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import { execFile } from 'node:child_process';
import { join } from 'node:path';
import { promisify } from 'node:util';

const username = 'box_club_col';
const limit = 6;
const outDir = join(process.cwd(), 'public', 'instagram-feed');
const outJson = join(process.cwd(), 'src', 'data', 'instagram-feed.json');

const profileUrl = `https://www.instagram.com/api/v1/users/web_profile_info/?username=${username}`;
const execFileAsync = promisify(execFile);
const curlMaxBuffer = 25 * 1024 * 1024;

async function fetchJson(url, headers = {}) {
  const args = ['--silent', '--show-error', '--location', '--compressed', '--fail'];

  for (const [name, value] of Object.entries(headers)) {
    args.push('--header', `${name}: ${value}`);
  }

  args.push(url);

  try {
    const { stdout } = await execFileAsync('curl', args, { maxBuffer: curlMaxBuffer });
    return JSON.parse(stdout);
  } catch (error) {
    const detail = error.stderr?.trim() || error.stdout?.trim() || error.message;
    throw new Error(`Request failed: ${detail}`);
  }
}

async function downloadImage(url, destination) {
  const args = [
    '--silent',
    '--show-error',
    '--location',
    '--compressed',
    '--fail',
    '--user-agent',
    'Mozilla/5.0',
    '--header',
    `Referer: https://www.instagram.com/${username}/`,
    '--output',
    destination,
    url
  ];

  try {
    await execFileAsync('curl', args, { maxBuffer: curlMaxBuffer });
  } catch (error) {
    const detail = error.stderr?.trim() || error.stdout?.trim() || error.message;
    throw new Error(`Image download failed: ${detail}`);
  }
}

async function fileExists(path) {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

function formatCaption(rawCaption) {
  const cleaned = rawCaption.replace(/\s+/g, ' ').trim();
  if (!cleaned) {
    return '';
  }

  const maxLength = 140;
  if (cleaned.length <= maxLength) {
    return cleaned;
  }

  const sliced = cleaned.slice(0, maxLength);
  const lastSpace = sliced.lastIndexOf(' ');
  const safe = lastSpace > 90 ? sliced.slice(0, lastSpace) : sliced;
  return `${safe.trim()}...`;
}

function isPinnedPost(node) {
  return Array.isArray(node?.pinned_for_users) && node.pinned_for_users.length > 0;
}

function buildPostUrl(node) {
  const route = node?.product_type === 'clips' || node?.__typename === 'GraphVideo' ? 'reel' : 'p';
  return `https://www.instagram.com/${route}/${node.shortcode}/`;
}

async function cleanupOldImages(posts) {
  const keepFiles = new Set(posts.map((post) => `${post.shortcode}.jpg`));
  const currentFiles = await readdir(outDir).catch(() => []);

  await Promise.all(
    currentFiles
      .filter((file) => file.endsWith('.jpg') && !keepFiles.has(file))
      .map((file) => rm(join(outDir, file)))
  );
}

async function main() {
  await mkdir(outDir, { recursive: true });

  let data;
  try {
    data = await fetchJson(profileUrl, {
      'User-Agent': 'Mozilla/5.0',
      'x-ig-app-id': '936619743392459'
    });
  } catch (error) {
    const currentFeed = await readFile(outJson, 'utf8').catch(() => null);
    if (currentFeed) {
      console.warn(`Instagram request failed. Keeping the existing feed. ${error.message}`);
      return;
    }

    throw error;
  }

  const edges = data?.data?.user?.edge_owner_to_timeline_media?.edges ?? [];
  const unpinned = edges.filter(({ node }) => !isPinnedPost(node));
  const pinned = edges.filter(({ node }) => isPinnedPost(node));
  const selected = [...unpinned, ...pinned].slice(0, limit);

  const posts = [];

  for (const edge of selected) {
    const node = edge.node;
    const shortcode = node.shortcode;
    const imageUrl = node.display_url ?? node.thumbnail_src;
    const caption = node.edge_media_to_caption?.edges?.[0]?.node?.text ?? '';
    const localFile = `${shortcode}.jpg`;
    const localPath = join(outDir, localFile);

    try {
      await downloadImage(imageUrl, localPath);
    } catch (error) {
      if (!(await fileExists(localPath))) {
        throw error;
      }

      console.warn(`Reusing existing image for ${shortcode}. ${error.message}`);
    }

    posts.push({
      shortcode,
      postUrl: buildPostUrl(node),
      image: `instagram-feed/${localFile}`,
      caption: formatCaption(caption)
    });
  }

  if (!posts.length) {
    throw new Error('No Instagram posts were available to build the feed.');
  }

  await cleanupOldImages(posts);
  await writeFile(outJson, JSON.stringify(posts, null, 2) + '\n');
  console.log(`Saved ${posts.length} posts to ${outJson}`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
