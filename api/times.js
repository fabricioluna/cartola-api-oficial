export default async function handler(req, res) {
  const ids = [
    295114, 18767307, 44845957, 1294522, 44730884, 50359784, 22845712,
    431514, 10392741, 8842639, 1646843, 19191394, 207131, 299125,
    47668576, 272336, 1667349, 390492, 396913, 2238134, 6877095, 49122213,
    20953551, 47841417, 6762375, 340238, 254144, 2827906, 9441345, 15915,
    47794095, 271219, 26086353, 829551, 5249257, 1002672, 8842638,
    19415623, 1567740
  ];

  try {
    const promises = ids.map(id =>
      fetch(`https://api.cartola.globo.com/time/id/${id}`).then(resp => resp.json())
    );
    const times = await Promise.all(promises);
    const resultado = times.map(time => ({
      nome: time.nome,
      nome_cartola: time.nome_cartola,
      pontos: time.pontos,
      patrimonio: time.patrimonio,
      escudo_url: time.escudo_url,
      escudo_url_svg: time.escudo_url_svg
    }));
    res.status(200).json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar times' });
  }
}
