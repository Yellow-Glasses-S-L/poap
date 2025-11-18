import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import autoprefixer from 'autoprefixer';
import path from 'path';
import fs from 'fs';
import handlebars from 'handlebars';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

const pages = {"drop-mintcodes":{"outputDir":"./drop-mintcodes","lang":"en","title":"Drop MintCodes","cacheVersion":31,"meta":[{"name":"title","content":"Drop MintCodes"},{"name":"description","content":"Page to display and manage mint codes filtered by selected DropId with statistics, filters, and detailed code information."},{"name":"keywords","content":"mint codes, drop, filter, statistics, supabase, drop mintcodes"},{"itemprop":"name","content":"Drop MintCodes"},{"itemprop":"description","content":"Page to display and manage mint codes filtered by selected DropId with statistics, filters, and detailed code information."},{"name":"twitter:card","content":"summary"},{"name":"twitter:title","content":"Drop MintCodes Management"},{"name":"twitter:description","content":"Manage and view mint codes for a selected drop with filtering and statistics."},{"property":"og:title","content":"Drop MintCodes Management"},{"property":"og:description","content":"Manage and view mint codes for a selected drop with filtering and statistics."},{"property":"og:type","content":"website"},{"name":"robots","content":"index, follow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://ab8ab927-d481-4797-88c8-fe76e2d47a31.weweb-preview.io/drop-mintcodes/"},{"rel":"alternate","hreflang":"en","href":"https://ab8ab927-d481-4797-88c8-fe76e2d47a31.weweb-preview.io/drop-mintcodes/"}]},"wlmj-test/:param/:param":{"outputDir":"./wlmj-test/:param/:param","lang":"en","cacheVersion":31,"meta":[{"name":"twitter:card","content":"summary"},{"property":"og:type","content":"website"},{"name":"robots","content":"index, follow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://ab8ab927-d481-4797-88c8-fe76e2d47a31.weweb-preview.io/wlmj-test/:param/:param/"},{"rel":"alternate","hreflang":"en","href":"https://ab8ab927-d481-4797-88c8-fe76e2d47a31.weweb-preview.io/wlmj-test/:param/:param/"}]},":param/index/:param":{"outputDir":"./:param/index/:param","lang":"en","cacheVersion":31,"meta":[{"name":"twitter:card","content":"summary"},{"property":"og:type","content":"website"},{"name":"robots","content":"index, follow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://ab8ab927-d481-4797-88c8-fe76e2d47a31.weweb-preview.io/:param/index/:param/"},{"rel":"alternate","hreflang":"en","href":"https://ab8ab927-d481-4797-88c8-fe76e2d47a31.weweb-preview.io/:param/index/:param/"}]},"home":{"outputDir":"./home","lang":"en","cacheVersion":31,"meta":[{"name":"twitter:card","content":"summary"},{"property":"og:type","content":"website"},{"name":"robots","content":"index, follow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://ab8ab927-d481-4797-88c8-fe76e2d47a31.weweb-preview.io/home/"},{"rel":"alternate","hreflang":"en","href":"https://ab8ab927-d481-4797-88c8-fe76e2d47a31.weweb-preview.io/home/"}]},"index":{"outputDir":"./","lang":"en","cacheVersion":31,"meta":[{"name":"twitter:card","content":"summary"},{"property":"og:type","content":"website"},{"name":"robots","content":"index, follow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://ab8ab927-d481-4797-88c8-fe76e2d47a31.weweb-preview.io/"},{"rel":"alternate","hreflang":"en","href":"https://ab8ab927-d481-4797-88c8-fe76e2d47a31.weweb-preview.io/"}]}};

// Read the main HTML template
const template = fs.readFileSync(path.resolve(__dirname, 'template.html'), 'utf-8');
const compiledTemplate = handlebars.compile(template);

// Generate an HTML file for each page with its metadata
Object.values(pages).forEach(pageConfig => {
    // Compile the template with page metadata
    const html = compiledTemplate({
        title: pageConfig.title,
        lang: pageConfig.lang,
        meta: pageConfig.meta,
        scripts: {
            head: pageConfig.scripts.head,
            body: pageConfig.scripts.body,
        },
        alternateLinks: pageConfig.alternateLinks,
        cacheVersion: pageConfig.cacheVersion,
        baseTag: pageConfig.baseTag,
    });

    // Save output html for each page
    if (!fs.existsSync(pageConfig.outputDir)) {
        fs.mkdirSync(pageConfig.outputDir, { recursive: true });
    }
    fs.writeFileSync(`${pageConfig.outputDir}/index.html`, html);
});

const rollupOptionsInput = {};
for (const pageName in pages) {
    rollupOptionsInput[pageName] = path.resolve(__dirname, pages[pageName].outputDir, 'index.html');
}

export default defineConfig(() => {
    return {
        plugins: [nodePolyfills({ include: ['events', 'stream', 'string_decoder'] }), vue()],
        base: "/",
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
            },
        },
        css: {
            preprocessorOptions: {
                scss: {
                    api: 'modern-compiler',
                },
            },
            postcss: {
                plugins: [autoprefixer],
            },
        },
        build: {
            chunkSizeWarningLimit: 10000,
            rollupOptions: {
                input: rollupOptionsInput,
                onwarn: (entry, next) => {
                    if (entry.loc?.file && /js$/.test(entry.loc.file) && /Use of eval in/.test(entry.message)) return;
                    return next(entry);
                },
                maxParallelFileOps: 900,
            },
        },
        logLevel: 'warn',
    };
});
