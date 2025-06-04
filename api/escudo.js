import got from 'got';

export default async function handler(req, res) {
  const rawQuery = req.url.split('?')[1];
  const escudoUrl = new URLSearchParams(rawQuery).get('url');

  if (!escudoUrl || !escudoUrl.startsWith("https://")) {
    return res.status(400).json({ error: "URL inválida" });
  }

  try {
    const stream = got.stream(escudoUrl);
    stream.on('response', (response) => {
      res.setHeader("Content-Type", response.headers['content-type'] || 'image/svg+xml');
      res.setHeader("Access-Control-Allow-Origin", "*");
      stream.pipe(res);
    });
    stream.on('error', () => {
      res.status(502).json({ error: "Erro ao buscar escudo" });
    });
  } catch {
    res.status(500).json({ error: "Erro inesperado" });
  }
}
