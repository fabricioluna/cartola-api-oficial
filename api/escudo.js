import got from 'got';
import { URL } from 'url';

export default async function handler(req, res) {
  const reqUrl = new URL(req.url, `http://${req.headers.host}`);
  const escudoUrl = reqUrl.searchParams.get('url');

  if (!escudoUrl || !escudoUrl.startsWith("https://")) {
    return res.status(400).json({ error: "URL inválida" });
  }

  try {
    const stream = got.stream(escudoUrl);
    stream.on('response', (response) => {
      res.setHeader("Content-Type", response.headers['content-type']);
      res.setHeader("Access-Control-Allow-Origin", "*");
      stream.pipe(res);
    });
    stream.on('error', () => res.status(500).json({ error: "Erro ao buscar escudo" }));
  } catch {
    res.status(500).json({ error: "Erro inesperado" });
  }
}
