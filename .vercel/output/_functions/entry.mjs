import { renderers } from './renderers.mjs';
import { a as actions } from './chunks/_noop-actions_CfKMStZn.mjs';
import { c as createExports } from './chunks/entrypoint_Bhhs0Zfl.mjs';
import { manifest } from './manifest_C9egL2py.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/admin/dashboard.astro.mjs');
const _page2 = () => import('./pages/admin/diagnostico.astro.mjs');
const _page3 = () => import('./pages/admin/especies/editar/_id_.astro.mjs');
const _page4 = () => import('./pages/admin/especies/nuevo.astro.mjs');
const _page5 = () => import('./pages/admin/especies.astro.mjs');
const _page6 = () => import('./pages/admin/productos/editar/_id_.astro.mjs');
const _page7 = () => import('./pages/admin/productos/lotes.astro.mjs');
const _page8 = () => import('./pages/admin/productos/nuevo.astro.mjs');
const _page9 = () => import('./pages/admin/productos.astro.mjs');
const _page10 = () => import('./pages/admin.astro.mjs');
const _page11 = () => import('./pages/api/admin/import-products.astro.mjs');
const _page12 = () => import('./pages/carrito.astro.mjs');
const _page13 = () => import('./pages/consejos.astro.mjs');
const _page14 = () => import('./pages/contacto.astro.mjs');
const _page15 = () => import('./pages/especies.astro.mjs');
const _page16 = () => import('./pages/lista-deseos.astro.mjs');
const _page17 = () => import('./pages/nosotros.astro.mjs');
const _page18 = () => import('./pages/producto/_id_.astro.mjs');
const _page19 = () => import('./pages/productos.astro.mjs');
const _page20 = () => import('./pages/proyectos.astro.mjs');
const _page21 = () => import('./pages/recomendaciones.astro.mjs');
const _page22 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/.pnpm/astro@5.5.4_@types+node@22.13.10_jiti@2.4.2_lightningcss@1.29.2_rollup@4.36.0_typescript@5.8.2_yaml@2.7.0/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/admin/dashboard.astro", _page1],
    ["src/pages/admin/diagnostico.astro", _page2],
    ["src/pages/admin/especies/editar/[id].astro", _page3],
    ["src/pages/admin/especies/nuevo.astro", _page4],
    ["src/pages/admin/especies/index.astro", _page5],
    ["src/pages/admin/productos/editar/[id].astro", _page6],
    ["src/pages/admin/productos/lotes.astro", _page7],
    ["src/pages/admin/productos/nuevo.astro", _page8],
    ["src/pages/admin/productos/index.astro", _page9],
    ["src/pages/admin/index.astro", _page10],
    ["src/pages/api/admin/import-products.js", _page11],
    ["src/pages/carrito.astro", _page12],
    ["src/pages/consejos/index.astro", _page13],
    ["src/pages/contacto.astro", _page14],
    ["src/pages/especies.astro", _page15],
    ["src/pages/lista-deseos.astro", _page16],
    ["src/pages/nosotros.astro", _page17],
    ["src/pages/producto/[id].astro", _page18],
    ["src/pages/productos.astro", _page19],
    ["src/pages/proyectos/index.astro", _page20],
    ["src/pages/recomendaciones.astro", _page21],
    ["src/pages/index.astro", _page22]
]);
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions,
    middleware: undefined
});
const _args = {
    "middlewareSecret": "7ff156f3-3f5d-4d04-b643-949433e04837",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
