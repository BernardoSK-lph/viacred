const sequelize = require("./index");

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexão com o PostgreSQL estabelecida com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao conectar no banco:", error);
  }
}

testConnection();