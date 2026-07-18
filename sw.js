const CACHE_PREFIX='riyoshi-glossary-';
const CACHE=CACHE_PREFIX+'v3-0-0-layout-fix' ;
const ASSETS=['./','./index.html','./style.css','./manifest.webmanifest','./glossaryData.js','./glossaryQuizData.js','./glossaryApp.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).catch(()=>{}));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith(CACHE_PREFIX)&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(fetch(e.request).then(res=>{if(e.request.url.startsWith(self.location.origin)&&res&&res.ok){const copy=res.clone();caches.open(CACHE).then(c=>c.put(e.request,copy)).catch(()=>{});}return res;}).catch(()=>caches.match(e.request).then(r=>r||(e.request.mode==='navigate'?caches.match('./index.html'):undefined))));});
