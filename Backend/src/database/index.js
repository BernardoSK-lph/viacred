const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('viacred_db', 'postgres', '123456789', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false
});

const Resposta = require('../models/Resposta');

sequelize.sync({ alter: true })
  .then(() => console.log('Tabela de respostas sincronizada com sucesso!'))
  .catch(err => console.error('Erro ao sincronizar tabelas:', err));

module.exports = sequelize;