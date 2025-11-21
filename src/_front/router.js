import { createRouter, createWebHistory } from 'vue-router';

import wwPage from './views/wwPage.vue';

import { initializeData, initializePlugins, onPageUnload } from '@/_common/helpers/data';

let router;
const routes = [];

function scrollBehavior(to) {
    if (to.hash) {
        return {
            el: to.hash,
            behavior: 'smooth',
        };
    } else {
        return { top: 0 };
    }
}

 
/* wwFront:start */
import pluginsSettings from '../../plugins-settings.json';

// eslint-disable-next-line no-undef
window.wwg_designInfo = {"id":"ab8ab927-d481-4797-88c8-fe76e2d47a31","homePageId":"feefad52-4cc7-4490-aa44-186f64047158","authPluginId":"1fa0dd68-5069-436c-9a7d-3b54c340f1fa","baseTag":null,"defaultTheme":"light","langs":[{"lang":"en","default":true}],"background":{},"workflows":[{"id":"d79b8e2d-68ac-4f8c-946a-93e717cf6b18","name":"Test","actions":{},"trigger":"onload-app"}],"pages":[{"id":"516c84bc-2885-4069-bad1-c4eb8f4ddb8c","linkId":"516c84bc-2885-4069-bad1-c4eb8f4ddb8c","name":"Page404","folder":"","paths":{"en":"404","default":"404"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"179ab4a2-3878-48da-8aec-c5220a5d3661","sectionTitle":"404 Page Container","linkId":"dcfc96bf-5fe6-4102-afea-93ab4a988690"}],"pageUserGroups":[],"title":{"en":"Page Not Found"},"meta":{"desc":{"en":"This is the 404 error page shown when a page is not found."},"keywords":{"en":"404,error,page not found,not found"},"socialDesc":{"en":"The page you are looking for does not exist."},"socialTitle":{"en":"Page Not Found"}},"metaImage":""},{"id":"feefad52-4cc7-4490-aa44-186f64047158","linkId":"feefad52-4cc7-4490-aa44-186f64047158","name":"Home","folder":null,"paths":{"en":"{{client|}}/index/{{id|}}","default":"{{client|}}/index/{{id|}}"},"langs":["en"],"cmsDataSetPath":null,"sections":[],"pageUserGroups":[],"title":{},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":""},{"id":"c2fbd7a8-f945-4741-830e-34fdc539bed0","linkId":"c2fbd7a8-f945-4741-830e-34fdc539bed0","name":"backoffice","folder":null,"paths":{"en":"backoffice","default":"backoffice"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"0b61c1ef-08a7-4815-857d-cf23a66251a9","sectionTitle":"Drop Mint Codes Section","linkId":"5fe77bb0-35df-4888-a6ea-46225f095c9d"},{"uid":"da4e5e8d-44ad-467b-b6ce-9dba739af7fc","sectionTitle":"Global Navigation Bar","linkId":"faf234bf-e15c-4585-b675-e13d8d965e89"},{"uid":"64419586-e45e-4474-8129-236a79aa77be","sectionTitle":"Toast Notification Container","linkId":"d9e2868c-be2c-4c5e-89d2-5c93c5924604"},{"uid":"c85c6698-382c-4a07-ab01-8b8fa75f1b1f","sectionTitle":"Global Loading Overlay","linkId":"5c9a1637-d983-48e6-8ed2-bcf060cbdedb"},{"uid":"d3c0393b-ae9e-41f2-86b5-76283ca48981","sectionTitle":"Drops List Page","linkId":"6786b80d-80b5-4be4-ba72-d7f5c22bd07b"},{"uid":"abb04b3a-de8e-4600-9c7f-ad235a7a7e77","sectionTitle":"Create Drop Page","linkId":"ca7382c6-468c-4b1c-ab27-7b6eeb808f8f"},{"uid":"8f2c869d-d5af-42d3-a06a-f885b7a379b8","sectionTitle":"Drop Detail Page","linkId":"1847296c-3280-49d5-a1e5-82221d53733d"},{"uid":"4c791e41-cebf-4526-87c7-444572b7fc80","sectionTitle":"Section","linkId":"74062498-ee2e-4a33-aa6e-676cbcec7ae3"},{"uid":"26b5e3a4-e002-45c6-91fa-697eb691dd7b","sectionTitle":"Alert","linkId":"7492c234-bc77-4930-84d5-38427b06c1bf"}],"pageUserGroups":[],"title":{"en":"","fr":"Vide | Commencer à partir de zéro"},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":""},{"id":"ed98ee2c-4c5f-4e51-8b4e-8e7a680b6918","linkId":"ed98ee2c-4c5f-4e51-8b4e-8e7a680b6918","name":"mint","folder":null,"paths":{"en":"claim/{{slugormintcode|customdemoflow06}}","default":"claim/{{slugormintcode|customdemoflow06}}"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"e8deec5a-e9e8-4303-813c-00393825f795","sectionTitle":"Root Container","linkId":"65b43a6b-f120-4acc-9168-1f541dd0fb5b"}],"pageUserGroups":[],"title":{},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":""}],"plugins":[{"id":"f9ef41c3-1c53-4857-855b-f2f6a40b7186","name":"Supabase","namespace":"supabase"},{"id":"1fa0dd68-5069-436c-9a7d-3b54c340f1fa","name":"Supabase Auth","namespace":"supabaseAuth"},{"id":"2bd1c688-31c5-443e-ae25-59aa5b6431fb","name":"REST API","namespace":"restApi"}]};
// eslint-disable-next-line no-undef
window.wwg_cacheVersion = 81;
// eslint-disable-next-line no-undef
window.wwg_pluginsSettings = pluginsSettings;
// eslint-disable-next-line no-undef
window.wwg_disableManifest = false;

const defaultLang = window.wwg_designInfo.langs.find(({ default: isDefault }) => isDefault) || {};

const registerRoute = (page, lang, forcedPath) => {
    const langSlug = !lang.default || lang.isDefaultPath ? `/${lang.lang}` : '';
    let path =
        forcedPath ||
        (page.id === window.wwg_designInfo.homePageId ? '/' : `/${page.paths[lang.lang] || page.paths.default}`);

    //Replace params
    path = path.replace(/{{([\w]+)\|([^/]+)?}}/g, ':$1');

    routes.push({
        path: langSlug + path,
        component: wwPage,
        name: `page-${page.id}-${lang.lang}`,
        meta: {
            pageId: page.id,
            lang,
            isPrivate: !!page.pageUserGroups?.length,
        },
        async beforeEnter(to, from) {
            if (to.name === from.name) return;
            //Set page lang
            wwLib.wwLang.defaultLang = defaultLang.lang;
            wwLib.$store.dispatch('front/setLang', lang.lang);

            //Init plugins
            await initializePlugins();

            //Check if private page
            if (page.pageUserGroups?.length) {
                // cancel navigation if no plugin
                if (!wwLib.wwAuth.plugin) {
                    return false;
                }

                await wwLib.wwAuth.init();

                // Redirect to not sign in page if not logged
                if (!wwLib.wwAuth.getIsAuthenticated()) {
                    window.location.href = `${wwLib.wwPageHelper.getPagePath(
                        wwLib.wwAuth.getUnauthenticatedPageId()
                    )}?_source=${to.path}`;

                    return null;
                }

                //Check roles are required
                if (
                    page.pageUserGroups.length > 1 &&
                    !wwLib.wwAuth.matchUserGroups(page.pageUserGroups.map(({ userGroup }) => userGroup))
                ) {
                    window.location.href = `${wwLib.wwPageHelper.getPagePath(
                        wwLib.wwAuth.getUnauthorizedPageId()
                    )}?_source=${to.path}`;

                    return null;
                }
            }

            try {
                await import(`@/pages/${page.id.split('_')[0]}.js`);
                await wwLib.wwWebsiteData.fetchPage(page.id);

                //Scroll to section or on top after page change
                if (to.hash) {
                    const targetElement = document.getElementById(to.hash.replace('#', ''));
                    if (targetElement) targetElement.scrollIntoView();
                } else {
                    document.body.scrollTop = document.documentElement.scrollTop = 0;
                }

                return;
            } catch (err) {
                wwLib.$store.dispatch('front/showPageLoadProgress', false);

                if (err.redirectUrl) {
                    return { path: err.redirectUrl || '404' };
                } else {
                    //Any other error: go to target page using window.location
                    window.location = to.fullPath;
                }
            }
        },
    });
};

for (const page of window.wwg_designInfo.pages) {
    for (const lang of window.wwg_designInfo.langs) {
        if (!page.langs.includes(lang.lang)) continue;
        registerRoute(page, lang);
    }
}

const page404 = window.wwg_designInfo.pages.find(page => page.paths.default === '404');
if (page404) {
    for (const lang of window.wwg_designInfo.langs) {
        // Create routes /:lang/:pathMatch(.*)* etc for all langs of the 404 page
        if (!page404.langs.includes(lang.lang)) continue;
        registerRoute(
            page404,
            {
                default: false,
                lang: lang.lang,
            },
            '/:pathMatch(.*)*'
        );
    }
    // Create route /:pathMatch(.*)* using default project lang
    registerRoute(page404, { default: true, isDefaultPath: false, lang: defaultLang.lang }, '/:pathMatch(.*)*');
} else {
    routes.push({
        path: '/:pathMatch(.*)*',
        async beforeEnter() {
            window.location.href = '/404';
        },
    });
}

let routerOptions = {};

const isProd =
    !window.location.host.includes(
        // TODO: add staging2 ?
        '-staging.' + (process.env.WW_ENV === 'staging' ? import.meta.env.VITE_APP_PREVIEW_URL : '')
    ) && !window.location.host.includes(import.meta.env.VITE_APP_PREVIEW_URL);

if (isProd && window.wwg_designInfo.baseTag?.href) {
    let baseTag = window.wwg_designInfo.baseTag.href;
    if (!baseTag.startsWith('/')) {
        baseTag = '/' + baseTag;
    }
    if (!baseTag.endsWith('/')) {
        baseTag += '/';
    }

    routerOptions = {
        base: baseTag,
        history: createWebHistory(baseTag),
        routes,
    };
} else {
    routerOptions = {
        history: createWebHistory(),
        routes,
    };
}

router = createRouter({
    ...routerOptions,
    scrollBehavior,
});

//Trigger on page unload
let isFirstNavigation = true;
router.beforeEach(async (to, from) => {
    if (to.name === from.name) return;
    if (!isFirstNavigation) await onPageUnload();
    isFirstNavigation = false;
    wwLib.globalVariables._navigationId++;
    return;
});

//Init page
router.afterEach((to, from, failure) => {
    wwLib.$store.dispatch('front/showPageLoadProgress', false);
    let fromPath = from.path;
    let toPath = to.path;
    if (!fromPath.endsWith('/')) fromPath = fromPath + '/';
    if (!toPath.endsWith('/')) toPath = toPath + '/';
    if (failure || (from.name && toPath === fromPath)) return;
    initializeData(to);
});
/* wwFront:end */

export default router;
