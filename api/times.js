
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const ids = [
    295114, 22845712, 1667349, 431514, 272336, 2827906, 18767307, 44845957, 44730884, 47668576,
    50359784, 47794095, 1294522, 9441345, 26086353, 10392741, 15915, 299125, 8842639, 19191394,
    207131, 2238134, 1646843, 254144, 340238, 8295951, 49122213, 271219, 396913, 390492,
    6762375, 47841417, 20953551, 6877095, 1002672, 5249257, 19415623, 1567740, 29174951, 28912126
  ];

  const resultados = [];

  for (const id of ids) {
    try {
      const response = await fetch(`https://api.cartola.globo.com/time/id/${id}`);
      const data = await response.json();
      resultados.push({
        id: data.time.time_id,
        nome: data.time.nome,
        nome_cartola: data.time.nome_cartola,
        escudo_url: data.time.escudo_url_svg || data.time.escudo_url,
        pontos: data.pontos,
        patrimonio: data.patrimonio
      });
    } catch (e) {
      console.error("Erro ao buscar ID", id, e);
    }
  }

  res.status(200).json(resultados);
}
