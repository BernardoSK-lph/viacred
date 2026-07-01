const { DataTypes } = require('sequelize');
const sequelize = require('../database/index');

const Resposta = sequelize.define('Resposta', {

    nps: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validade: {
            min: 0,
            max: 10
        }
    },
    avaliacao_ambiente: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5
        }
    },
    avaliacao_atendimento: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5
        }
    },
    avaliacao_espera: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validade: {
            min: 1,
            max: 5
        }
    },
    cpf: {
        type: DataTypes.STRING(11),
        allowNull: true
    },
    comentario: {
    type: DataTypes.STRING(600),
    allowNull: true
    }
}, {
    tableName: 'resposta',
    timestamps: true,
});

module.exports = Resposta;