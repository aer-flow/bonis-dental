import fs from 'node:fs';
import path from 'node:path';

const HEADER_MARKER = '<!-- Header cu efect de glassmorphism / transparent la scroll -->';

function sanitizeBodyAttributes(attrs = '') {
  const classMatch = attrs.match(/\sclass=(['"])(.*?)\1/i);
  if (!classMatch) {
    return attrs.trim();
  }

  const cleanedClasses = classMatch[2]
    .split(/\s+/)
    .filter(Boolean)
    .filter((token) => !/^(blog|logged-in|admin-bar|no-customize-support|customize-support|wp-theme-[\w-]+)$/.test(token));

  let nextAttrs = attrs.replace(classMatch[0], '');
  if (cleanedClasses.length) {
    nextAttrs += ` class="${cleanedClasses.join(' ')}"`;
  }

  return nextAttrs.trim();
}

function sanitizeHtml(html) {
  let next = html;

  next = next.replace(/<html\b([^>]*)\blang=(['"])en-US\2([^>]*)>/i, '<html$1lang="ro"$3>');
  next = next.replace(/<title>\s*My WordPress Website\s*<\/title>/i, '<title>Bonis Dental</title>');

  next = next.replace(/<style\b[^>]*id=(['"])(?:wp-[^'"]+|global-styles-inline-css|classic-theme-styles-inline-css)\1[^>]*>[\s\S]*?<\/style>\s*/gi, '');
  next = next.replace(/<script\b[^>]*id=(['"])wp-emoji-settings\1[^>]*>[\s\S]*?<\/script>\s*/gi, '');
  next = next.replace(/<script\b[^>]*>\s*[\s\S]*?wp_customize_support_script[\s\S]*?<\/script>\s*/gi, '');
  next = next.replace(/<script\b[^>]*>\s*[\s\S]*?wpEmojiSettingsSupports[\s\S]*?<\/script>\s*/gi, '');
  next = next.replace(/<script\b[^>]*type=(['"])module\1[^>]*>[\s\S]*$/i, '');
  next = next.replace(/<link\b[^>]*rel=(['"])https:\/\/api\.w\.org\/\1[^>]*>\s*/gi, '');
  next = next.replace(/<meta\b[^>]*name=(['"])generator\1[^>]*content=(['"])WordPress[^>]*>\s*/gi, '');
  next = next.replace(/<link\b[^>]*dns-prefetch[^>]*href=(['"])\/\/(?:127\.0\.0\.1|192\.168\.[^'"]+)\1[^>]*>\s*/gi, '');
  next = next.replace(/<script\b[^>]*src=(['"])\1[^>]*id=(['"])hoverintent-js-js\2[^>]*><\/script>\s*/gi, '');
  next = next.replace(/\/wp-content\/themes\/bonis-dental\/assets\//g, '/assets/');

  next = next.replace(/<body([^>]*)>[\s\S]*?(<!-- Header cu efect de glassmorphism \/ transparent la scroll -->)/i, (_, attrs, marker) => {
    const cleanAttrs = sanitizeBodyAttributes(attrs);
    const serializedAttrs = cleanAttrs ? ` ${cleanAttrs}` : '';
    return `<body${serializedAttrs}>\n${marker}`;
  });

  next = next.replace(/\n{3,}/g, '\n\n');

  if (!/<\/body>/i.test(next)) {
    next = `${next.trimEnd()}\n</body>\n`;
  }

  if (!/<\/html>/i.test(next)) {
    next = `${next.trimEnd()}\n</html>\n`;
  }

  return next;
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(fullPath));
      continue;
    }
    if (entry.isFile() && entry.name.endsWith('.html')) {
      files.push(fullPath);
    }
  }

  return files;
}

export function sanitizeDirectory(rootDir) {
  for (const file of walk(rootDir)) {
    const current = fs.readFileSync(file, 'utf8');
    const cleaned = sanitizeHtml(current);
    if (cleaned !== current) {
      fs.writeFileSync(file, cleaned);
    }
  }
}

const isEntrypoint = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname);

if (isEntrypoint) {
  const rootDir = process.argv[2] ? path.resolve(process.argv[2]) : process.cwd();
  sanitizeDirectory(rootDir);
}
