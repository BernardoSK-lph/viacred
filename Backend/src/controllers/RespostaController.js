const Resposta = require('../models/Resposta');
const { Op } = require('sequelize');

module.exports = {
  // 1. FUNÇÃO PARA SALVAR A PESQUISA (POST)
  async store(req, res) {
    try {
      const { nps, avaliacao_ambiente, avaliacao_atendimento, avaliacao_espera, cpf, comentario } = req.body;

      // Cria o registro no banco de dados usando o Modelo
      const novaResposta = await Resposta.create({
        nps,
        avaliacao_ambiente,
        avaliacao_atendimento,
        avaliacao_espera,
        cpf,
        comentario
      });

      // Retorna sucesso para o Frontend com os dados salvos
      return res.status(201).json({
        mensagem: 'Pesquisa salva com sucesso!',
        dados: novaResposta
      });
    } catch (error) {
      console.error('Erro ao salvar resposta:', error);
      return res.status(500).json({ erro: 'Erro interno ao salvar os dados.' });
    }
  },

  // 2. FUNÇÃO PARA GERAR O RELATÓRIO (GET)
  async relatorio(req, res) {
  try {
    const respostas = await Resposta.findAll();
    if (respostas.length === 0) return res.json({ total_avaliacoes: 0, nps_score: 0, ambiente: 0, atendimento: 0, espera: 0 });

    const total = respostas.length;
    const promotores = respostas.filter(r => r.nps >= 9).length;
    const detratores = respostas.filter(r => r.nps <= 6).length;

    return res.json({
      total_avaliacoes: total,
      nps_score: Math.round(((promotores - detratores) / total) * 100),
      ambiente: (respostas.reduce((acc, r) => acc + r.avaliacao_ambiente, 0) / total).toFixed(1),
      atendimento: (respostas.reduce((acc, r) => acc + r.avaliacao_atendimento, 0) / total).toFixed(1),
      espera: (respostas.reduce((acc, r) => acc + r.avaliacao_espera, 0) / total).toFixed(1)
    });
  } catch (error) {
    return res.status(500).json({ erro: 'Erro ao gerar relatório' });
  }
},

  async listarTudo(req, res) {
    try{

        const todasRespostas = await Resposta.findAll({
            order: [['createdAt', 'DESC']]
        })

        if(todasRespostas.length === 0) {
        return res.status(200).json([]);
        }

        return res.json(todasRespostas);

    } catch (error) {
        console.error('Erro ao buscar lista de respostas:', error);
        return res.status(500).json({erro: 'Erro interno ao buscar lista de respostas.'});
    }
  }
};