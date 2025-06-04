
import got from 'got';

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url || !url.startsWith("https://")) {
    return res.status(400).json({ error: "URL inválida" });
  }

  try {
    const stream = got.stream(url);
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
