import $APP from "bootstrapp";
import { html } from "lit-html";
import T from "/node_modules/@bootstrapp/types/index.js";
import Router from "/node_modules/@bootstrapp/router/index.js";

import "/models/schema.js";
import "/extensions/pages/runtime/website-page.js";

const slug = $APP.manifest.websiteSlug;
$APP.routes.set({
  "/": {
    name: "website-home",
    component: () => html`<bsp-website-page .slug=${slug} pagePath="/"></bsp-website-page>`,
  },
  "/:path+": {
    name: "website-page",
    component: (params) => html`<bsp-website-page .slug=${slug} .pagePath=${"/" + params.path}></bsp-website-page>`,
  },
});

$APP.define("app-container", {
  tag: "app-container",
  properties: {
    currentRoute: T.object({ sync: Router }),
  },
  render() {
    const { route, params } = this.currentRoute || Router.currentRoute || {};
    if (!route) return html``;
    return typeof route.component === "function"
      ? route.component(params)
      : route.component;
  },
});
