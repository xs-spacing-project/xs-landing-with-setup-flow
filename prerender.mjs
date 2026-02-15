import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.resolve(__dirname, 'dist');
const templateHtml = fs.readFileSync(path.resolve(distPath, 'index.html'), 'utf-8');

// Routes to prerender — these are the pages Google Play's crawler needs to see
const routesToPrerender = [
  '/privacy-policy',
  '/privacy-policy-detailed',
  '/terms-of-service',
  '/terms-of-use',
  '/contact',
  '/delete-account',
  '/refund-and-cancellation-policy',
];

// Load the SSR bundle built by Vite
const { render } = await import(path.resolve(distPath, 'server', 'entry-server.js'));

for (const route of routesToPrerender) {
  const appHtml = render(route);

  // Inject the rendered HTML into the template
  const html = templateHtml.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

  // Write to dist/<route>/index.html so the server serves it at the correct path
  const routeDir = path.resolve(distPath, route.slice(1)); // remove leading /
  fs.mkdirSync(routeDir, { recursive: true });
  fs.writeFileSync(path.resolve(routeDir, 'index.html'), html);

  console.log(`Pre-rendered: ${route}`);
}

console.log('Prerendering complete!');
