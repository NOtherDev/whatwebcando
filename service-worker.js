!function(){"use strict";const e=[{pattern:/^\/$/},{pattern:/^\/privacy.html\/?$/},{pattern:/^\/articles\/?$/},{pattern:/^\/articles\/([^\/]+?)\/?$/},{pattern:/^\/([^\/]+?).html\/?$/}];importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js"),workbox.setConfig({debug:!1}),workbox.googleAnalytics.initialize();const t=["client/PromoBox.ad64a895.js","client/Meta.f0c7970d.js","client/Article.15023632.js","client/privacy.html.1bc7fa33.js","client/index.47cb3db4.js","client/index.f80f9b8d.js","client/[slug].9eef5fad.js","client/index.2469c7e4.js","client/prism.3f2b0748.js","client/index.238a0c11.js","client/client.cfd81244.js","client/[feature].html.a087e98d.js","client/main.321128354.css","client/index.2469c7e4.css","client/Article.15023632.css","client/PromoBox.ad64a895.css","client/index.f80f9b8d.css","client/Article.15023632.css","client/[slug].9eef5fad.css","client/Article.15023632.css","client/PromoBox.ad64a895.css","client/prism.3f2b0748.css","client/[feature].html.a087e98d.css","client/prism.3f2b0748.css"].concat(["service-worker-index.html",".DS_Store",".well-known/assetlinks.json","CNAME","Material-Design-Icons.woff","_config.yml","articleimgs/.DS_Store","articleimgs/adult-books-business-coffee.pexels.jpg","articleimgs/analogue-console-control.pexels.jpg","articleimgs/beige-map.pexels.jpg","articleimgs/black-camera-mounted-on-tripod.pexels.jpg","articleimgs/black-tablet-computer.pexels.jpg","articleimgs/camera-permissions.png","articleimgs/choosing-between-PWA-or-Native-which-is-better-for-you_visual.jpg","articleimgs/chrome-switch-disable-cache.png","articleimgs/chrome-switch-update-on-reload.png","articleimgs/floor-plan-on-table.pexels.jpg","articleimgs/gold-padlock-locking-door.pexels.jpg","articleimgs/letter-envelopes.pexels.jpg","articleimgs/phone-taking-photo-selfie.pexels.jpg","articleimgs/street-lights.pexels.jpg","articleimgs/sw-updates-1.png","articleimgs/sw-updates-2.png","articleimgs/sw-updates-3.png","articleimgs/sw-updates-4.png","articleimgs/tracking-hs-visits-installs.png","articleimgs/when-is-a-website-better-than-an-app-when-its-a-progressive-web-app-of-course_lead.jpg","articleimgs/who-can-benefit-from-a-progressive-web-app-lead.jpg","headerbg-large.jpg","headerbg.jpg","icon-120x120.png","icon-144x144.png","icon-152x152.png","icon-180x180.png","icon-192x192.png","icon-32x32.png","icon-512x512.png","icon-76x76.png","icon-96x96.png","images/share-image.png","manifest.json","placeholder.png","sw.js"]).filter(e=>!e.endsWith(".DS_Store")).filter(e=>!e.startsWith("articleimgs/")).filter(e=>!e.startsWith(".well-known/")).filter(e=>"images/share-image.png"!==e).filter(e=>"CNAME"!==e).filter(e=>"_config.yml"!==e).concat(["https://fonts.gstatic.com/s/sourcesanspro/v13/6xK3dSBYKcSV-LCoeQqfX1RYOo3qOK7lujVj9w.woff2","https://fonts.gstatic.com/s/sourcesanspro/v13/6xKydSBYKcSV-LCoeQqfX1RYOo3ig4vwlxdu3cOWxw.woff2","articles.json","service-worker-index.html"]),s=new Set(t);self.addEventListener("install",e=>{e.waitUntil(caches.open("cache1598245378144").then(e=>e.addAll([...s])))}),self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(async e=>{for(const t of e)"cache1598245378144"!==t&&await caches.delete(t);self.clients.claim()}))});const i=e=>(e=e.toLowerCase()).endsWith(".jpg")||e.endsWith(".jpeg")||e.endsWith(".png");self.addEventListener("fetch",t=>{if("GET"!==t.request.method||t.request.headers.has("range"))return;const s=new URL(t.request.url);s.protocol.startsWith("http")&&(s.hostname===self.location.hostname&&s.port!==self.location.port||(s.origin!==self.origin||s.pathname.endsWith(".json")||!e.find(e=>e.pattern.test(s.pathname))?"only-if-cached"!==t.request.cache&&t.respondWith(caches.open("offline1598245378144").then(async e=>{const c=await caches.match(t.request);if(c)return c;const n=await fetch(t.request);if(n.ok)e.put(t.request,n.clone());else if(i(s.pathname))return caches.match("/placeholder.png");return n}).catch(e=>i(s.pathname)?caches.match("/placeholder.png"):new Response(e,{status:499}))):t.respondWith(caches.match("service-worker-index.html"))))}),self.addEventListener("message",async e=>{if("refresh"===e.data){await self.skipWaiting(),(await self.clients.matchAll({type:"window",includeUncontrolled:!0})).forEach(e=>{e.navigate(e.url)})}})}();
