import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import autoprefixer from 'autoprefixer';
import path from 'path';
import fs from 'fs';
import handlebars from 'handlebars';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

const pages = {"404":{"outputDir":"./404","lang":"en","title":"Page Not Found","cacheVersion":122,"meta":[{"name":"title","content":"Page Not Found"},{"name":"description","content":"This is the 404 error page shown when a page is not found."},{"name":"keywords","content":"404,error,page not found,not found"},{"itemprop":"name","content":"Page Not Found"},{"itemprop":"description","content":"This is the 404 error page shown when a page is not found."},{"name":"twitter:card","content":"summary"},{"name":"twitter:title","content":"Page Not Found"},{"name":"twitter:description","content":"The page you are looking for does not exist."},{"property":"og:title","content":"Page Not Found"},{"property":"og:description","content":"The page you are looking for does not exist."},{"property":"og:type","content":"website"},{"name":"robots","content":"index, follow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://experience.poap.studio/404/"},{"rel":"alternate","hreflang":"en","href":"https://experience.poap.studio/404/"}]},"index":{"outputDir":"./","lang":"en","cacheVersion":122,"meta":[{"name":"twitter:card","content":"summary"},{"property":"og:type","content":"website"},{"name":"robots","content":"index, follow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://experience.poap.studio/"},{"rel":"alternate","hreflang":"en","href":"https://experience.poap.studio/"}]},"seb/:param":{"outputDir":"./seb/:param","lang":"en","cacheVersion":122,"meta":[{"name":"twitter:card","content":"summary"},{"property":"og:type","content":"website"},{"name":"robots","content":"index, follow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://experience.poap.studio/seb/:param/"},{"rel":"alternate","hreflang":"en","href":"https://experience.poap.studio/seb/:param/"}]},"testpage1/:param":{"outputDir":"./testpage1/:param","lang":"en","cacheVersion":122,"meta":[{"name":"twitter:card","content":"summary"},{"property":"og:type","content":"website"},{"name":"robots","content":"index, follow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://experience.poap.studio/testpage1/:param/"},{"rel":"alternate","hreflang":"en","href":"https://experience.poap.studio/testpage1/:param/"}]},":param-copy":{"outputDir":"./:param-copy","lang":"en","cacheVersion":122,"meta":[{"name":"twitter:card","content":"summary"},{"property":"og:type","content":"website"},{"name":"robots","content":"index, follow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://experience.poap.studio/:param-copy/"},{"rel":"alternate","hreflang":"en","href":"https://experience.poap.studio/:param-copy/"}]},"backoffice":{"outputDir":"./backoffice","lang":"en","cacheVersion":122,"meta":[{"name":"twitter:card","content":"summary"},{"property":"og:type","content":"website"},{"name":"robots","content":"index, follow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://experience.poap.studio/backoffice/"},{"rel":"alternate","hreflang":"en","href":"https://experience.poap.studio/backoffice/"}]},"template/:param":{"outputDir":"./template/:param","lang":"en","cacheVersion":122,"meta":[{"name":"twitter:card","content":"summary"},{"property":"og:type","content":"website"},{"name":"robots","content":"index, follow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://experience.poap.studio/template/:param/"},{"rel":"alternate","hreflang":"en","href":"https://experience.poap.studio/template/:param/"}]},"mint/:param":{"outputDir":"./mint/:param","lang":"en","cacheVersion":122,"meta":[{"name":"twitter:card","content":"summary"},{"property":"og:type","content":"website"},{"name":"robots","content":"index, follow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://experience.poap.studio/mint/:param/"},{"rel":"alternate","hreflang":"en","href":"https://experience.poap.studio/mint/:param/"}]}};

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
        structuredData: pageConfig.structuredData || null,
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
