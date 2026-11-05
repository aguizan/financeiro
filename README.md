# Controle financeiro

App de controle financeiro pessoal que funciona no navegador e pode ser instalado na tela inicial do celular (Android e iPhone). Funciona sem internet.

**Os dados ficam só no aparelho de cada pessoa.** Nada é enviado para servidor nenhum. Use o botão **Backup** para guardar uma cópia (WhatsApp, Google Drive, e-mail) e o botão **Abrir** para restaurar.

## Publicar no GitHub Pages

1. Entre em <https://github.com> e crie uma conta, se ainda não tiver.
2. Clique em **New repository** (botão verde "New" ou no "+" no alto da tela).
   - Nome: `controle-financeiro` (ou outro, sem espaços).
   - Marque **Public**.
   - Clique em **Create repository**.
3. Na página do repositório, clique em **uploading an existing file**.
4. Descompacte o .zip no computador e **arraste todo o conteúdo da pasta** (não a pasta em si) para a página: `index.html`, `support.js`, `sw.js`, `manifest.webmanifest`, `.nojekyll`, `README.md` e as pastas `icons` e `vendor`.
   - Se o navegador não deixar arrastar pastas, use o GitHub Desktop ou envie as pastas uma de cada vez em "Add file › Upload files".
5. Clique em **Commit changes**.
6. Vá em **Settings › Pages**. Em "Branch", escolha **main** e a pasta **/ (root)** e clique em **Save**.
7. Espere 1 ou 2 minutos e recarregue a página: o endereço aparece no alto, no formato
   `https://SEU-USUARIO.github.io/controle-financeiro/`

Esse é o link para mandar pelo WhatsApp.

## Como as pessoas instalam

- **Android (Chrome):** abrir o link, tocar em **Instalar app** (botão no topo) ou no menu ⋮ › **Instalar app / Adicionar à tela inicial**.
- **iPhone:** abrir o link **no Safari**, tocar em **Compartilhar** › **Adicionar à Tela de Início**.

## Publicar uma atualização

1. Envie os arquivos alterados para o repositório (Add file › Upload files › Commit changes).
2. Abra o `sw.js` no GitHub (ícone de lápis) e troque `const VERSAO = "cf-v1";` para `"cf-v2"` (e assim por diante a cada atualização). Isso faz os aparelhos baixarem a versão nova.
3. Quem já tem o app recebe a atualização ao abrir o app com internet (às vezes é preciso fechar e abrir de novo).

Os dados de quem já usa o app **não são apagados** por uma atualização.

## Arquivos

| Arquivo | Para que serve |
|---|---|
| `index.html` | O app (telas e lógica) |
| `support.js` | Motor que monta as telas |
| `vendor/` | Biblioteca React (cópia local, para funcionar sem internet) |
| `sw.js` | Faz o app abrir sem internet e receber atualizações |
| `manifest.webmanifest` | Nome, cores e ícones do app instalado |
| `icons/` | Ícones do app |
| `.nojekyll` | Diz ao GitHub Pages para publicar os arquivos como estão |
