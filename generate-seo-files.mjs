import { readFileSync, writeFileSync } from 'node:fs';

const readJson = (relativePath) =>
    JSON.parse(readFileSync(new URL(relativePath, import.meta.url), 'utf-8'));

const site = readJson('../src/app/data/site.json');
const navigation = readJson('../src/app/data/navigation.json');
const projects = readJson('./src/app/data/projects.json');

if (!site.url || !site.url.startsWith('https://')) {
    throw new Error('site.json : "url" doit être renseignée et commencer par https://');
}

const slugs = projects.map((project) => project.slug);
const duplicates = slugs.filter((slug, index) => slugs.indexOf(slug) !== index);
if (duplicates.length > 0) {
    throw new Error(`projects.json : slug en double : ${[...new Set(duplicates)].join(',')}`);
}

const baseUrl = site.url.replace(/\/$/, '');

const paths = [
    ...navigation.map((link) => link.path),
    ...slugs.map((slug) => `'/realisations/${slug}`),
];

const escapeXml = (text) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const urls =[...new Set(paths)]
    .map((path) => ` <url><loc>${escapeXml(baseUrl + path)}</loc></url>`)
    .join('\n');

const sitemap = `<?xml version ="1.0" encoding="UTF-8"?>
<urlset xmls="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

const robots = `User-agent: *
Allow: /
    
Sitemap: ${baseUrl}/sitemap.xml
`;

const publicFile = (name) => new URL(`../public/${name}`, import.meta.url);

writeFileSync(publicFile('sitemap.xml', sitemap));
writeFileSync(publicFile('robots.txt'), robots);

console.log(`SEO : ${paths.length} URL écrites dans public/sitemap.xml et public/robots.txt`);