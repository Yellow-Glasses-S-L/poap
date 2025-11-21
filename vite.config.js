import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import autoprefixer from 'autoprefixer';
import path from 'path';
import fs from 'fs';
import handlebars from 'handlebars';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

const pages = {"404":{"outputDir":"./404","lang":"en","title":"Page Not Found","cacheVersion":81,"meta":[{"name":"title","content":"Page Not Found"},{"name":"description","content":"This is the 404 error page shown when a page is not found."},{"name":"keywords","content":"404,error,page not found,not found"},{"itemprop":"name","content":"Page Not Found"},{"itemprop":"description","content":"This is the 404 error page shown when a page is not found."},{"name":"twitter:card","content":"summary"},{"name":"twitter:title","content":"Page Not Found"},{"name":"twitter:description","content":"The page you are looking for does not exist."},{"property":"og:title","content":"Page Not Found"},{"property":"og:description","content":"The page you are looking for does not exist."},{"property":"og:type","content":"website"},{"name":"robots","content":"index, follow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://experience.poap.studio/404/"},{"rel":"alternate","hreflang":"en","href":"https://experience.poap.studio/404/"}]},"index":{"outputDir":"./","lang":"en","cacheVersion":81,"meta":[{"name":"twitter:card","content":"summary"},{"property":"og:type","content":"website"},{"name":"robots","content":"index, follow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://experience.poap.studio/"},{"rel":"alternate","hreflang":"en","href":"https://experience.poap.studio/"}]},"backoffice":{"outputDir":"./backoffice","lang":"en","cacheVersion":81,"meta":[{"name":"twitter:card","content":"summary"},{"property":"og:type","content":"website"},{"name":"robots","content":"index, follow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://experience.poap.studio/backoffice/"},{"rel":"alternate","hreflang":"en","href":"https://experience.poap.studio/backoffice/"}]},"claim/:param":{"outputDir":"./claim/:param","lang":"en","cacheVersion":81,"meta":[{"name":"twitter:card","content":"summary"},{"property":"og:type","content":"website"},{"name":"robots","content":"index, follow"}],"scripts":{"head":"\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover\">\r\n<meta name=\"apple-mobile-web-app-capable\" content=\"yes\">\r\n<meta name=\"apple-mobile-web-app-status-bar-style\" content=\"black-translucent\">\r\n<meta name=\"theme-color\" content=\"#000000\">\r\n\r\n<style>\r\n  /* Reset básico para todos */\r\n  * {\r\n    -webkit-tap-highlight-color: transparent;\r\n  }\r\n  \r\n  html, body {\r\n    margin: 0;\r\n    padding: 0;\r\n    width: 100%;\r\n  }\r\n  \r\n  body {\r\n    background: #000000;\r\n  }\r\n  \r\n  /* ===== SOLO PARA iOS ===== */\r\n  @supports (-webkit-touch-callout: none) {\r\n    /* Este @supports SOLO funciona en iOS Safari */\r\n    \r\n    html {\r\n      height: 100%;\r\n      overflow-x: hidden;\r\n      -webkit-text-size-adjust: 100%;\r\n    }\r\n    \r\n    body {\r\n      height: 100%;\r\n      overflow-x: hidden;\r\n      position: relative;\r\n      overscroll-behavior: none;\r\n      -webkit-overflow-scrolling: touch;\r\n    }\r\n    \r\n    /* Safe areas para iOS */\r\n    body {\r\n      padding-top: constant(safe-area-inset-top);\r\n      padding-top: env(safe-area-inset-top);\r\n      padding-bottom: constant(safe-area-inset-bottom);\r\n      padding-bottom: env(safe-area-inset-bottom);\r\n    }\r\n    \r\n    /* Fix específico para iOS Safari */\r\n    html {\r\n      height: -webkit-fill-available;\r\n    }\r\n    \r\n    body {\r\n      min-height: 100vh;\r\n      min-height: -webkit-fill-available;\r\n    }\r\n    \r\n    /* Contenedor principal de WeWeb solo en iOS */\r\n    #app, [data-weweb-app], [data-weweb-page] {\r\n      min-height: 100vh;\r\n      min-height: -webkit-fill-available;\r\n      overflow-y: auto;\r\n      -webkit-overflow-scrolling: touch;\r\n    }\r\n  }\r\n  \r\n  /* ===== Barra Glass SOLO en iOS ===== */\r\n  @supports (-webkit-touch-callout: none) {\r\n    .glass-bottom-bar {\r\n      position: fixed;\r\n      bottom: 0;\r\n      left: 0;\r\n      right: 0;\r\n      height: 60px;\r\n      padding-bottom: constant(safe-area-inset-bottom);\r\n      padding-bottom: env(safe-area-inset-bottom);\r\n      background: rgba(255, 255, 255, 0.8);\r\n      backdrop-filter: blur(20px) saturate(180%);\r\n      -webkit-backdrop-filter: blur(20px) saturate(180%);\r\n      border-top: 0.5px solid rgba(255, 255, 255, 0.3);\r\n      z-index: 9999;\r\n      transform: translateZ(0);\r\n      -webkit-transform: translateZ(0);\r\n      display: flex;\r\n      align-items: center;\r\n      justify-content: space-around;\r\n    }\r\n    \r\n    /* Para tema oscuro en iOS */\r\n    @media (prefers-color-scheme: dark) {\r\n      .glass-bottom-bar {\r\n        background: rgba(0, 0, 0, 0.8);\r\n        border-top: 0.5px solid rgba(255, 255, 255, 0.2);\r\n      }\r\n    }\r\n  }\r\n</style>\r\n\r\n<script>\r\n// Detectar si es iOS\r\nconst isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent) && !window.MSStream;\r\n\r\n// Solo aplicar ajustes en iOS\r\nif (isIOS) {\r\n  function setVH() {\r\n    let vh = window.innerHeight * 0.01;\r\n    document.documentElement.style.setProperty('--vh', `${vh}px`);\r\n    document.body.style.height = window.innerHeight + 'px';\r\n  }\r\n  \r\n  setVH();\r\n  window.addEventListener('resize', setVH);\r\n  window.addEventListener('orientationchange', () => {\r\n    setTimeout(setVH, 100);\r\n  });\r\n}\r\n</script>","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://experience.poap.studio/claim/:param/"},{"rel":"alternate","hreflang":"en","href":"https://experience.poap.studio/claim/:param/"}]}};

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
