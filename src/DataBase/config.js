const mongoose = require('mongoose');

const ConnectionDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONEXION, {
      useNewUrlParser: true,
    });
    console.log('Database connection established');
  } catch (error) {
    console.log(`Database not connecterd, error: ${error}`);
  }
};

module.exports = {
  ConnectionDB,
};