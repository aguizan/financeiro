// Service worker: faz o app abrir sem internet e receber atualizações.
// Ao publicar uma nova versão, troque o número abaixo (v1 → v2…).
const VERSAO = "cf-v1";
const ARQUIVOS = [
  "./",
  "./index.html",
  "./support.js",
  "./vendor/react.production.min.js",
  "./vendor/react-dom.production.min.js",
  "./vendor/zxing.min.js",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/apple-touch-icon.png",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSAO).then((c) => c.addAll(ARQUIVOS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((nomes) => Promise.all(nomes.filter((n) => n !== VERSAO && n !== "cf-fontes").map((n) => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // Fontes do Google: usa a cópia guardada e atualiza em segundo plano.
  if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com") {
    e.respondWith(
      caches.open("cf-fontes").then((c) =>
        c.match(req).then((guardada) => {
          const rede = fetch(req).then((r) => { if (r.ok || r.type === "opaque") c.put(req, r.clone()); return r; }).catch(() => guardada);
          return guardada || rede;
        })
      )
    );
    return;
  }

  if (url.origin !== self.location.origin) return;

  // Página principal: tenta a internet primeiro (para pegar atualizações); sem internet, usa a cópia.
  const ehPagina = req.mode === "navigate" || url.pathname.endsWith("/") || url.pathname.endsWith("/index.html");
  if (ehPagina) {
    e.respondWith(
      fetch(req)
        .then((r) => { const copia = r.clone(); caches.open(VERSAO).then((c) => c.put(req, copia)); return r; })
        .catch(() => caches.match(req).then((r) => r || caches.match("./index.html")))
    );
    return;
  }

  // Demais arquivos: cópia guardada primeiro.
  e.respondWith(
    caches.match(req).then((r) => r || fetch(req).then((resp) => {
      if (resp.ok) { const copia = resp.clone(); caches.open(VERSAO).then((c) => c.put(req, copia)); }
      return resp;
    }))
  );
});
