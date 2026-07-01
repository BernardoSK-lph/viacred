const Resposta = require('../models/Resposta');
const { Op } = require('sequelize');

module.exports = {

  async store(req, res) {
    try {
      const { nei, avaliacao_ambiente, avaliacao_atendimento, avaliacao_espera, cpf, comentario } = req.body;

      const novaResposta = await Resposta.create({
        nei,
        avaliacao_ambiente,
        avaliacao_atendimento,
        avaliacao_espera,
        cpf,
        comentario
      });

      return res.status(201).json({
        mensagem: 'Pesquisa salva com sucesso!',
        dados: novaResposta
      });
    } catch (error) {
      console.error('Erro ao salvar resposta:', error);
      return res.status(500).json({ erro: 'Erro interno ao salvar os dados.' });
    }
  },

  async relatorio(req, res) {
  try {
    const respostas = await Resposta.findAll();
 
    if (respostas.length === 0) return res.json({ total_avaliacoes: 0, nei_media: 0, ambiente: 0, atendimento: 0, espera: 0 });

    const total = respostas.length;

    return res.json({
      total_avaliacoes: total,
      nei_media: (respostas.reduce((acc, r) => acc + r.nei, 0) / total).toFixed(1),
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