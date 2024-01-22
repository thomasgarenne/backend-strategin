require('dotenv').config();
const mongoose = require("mongoose");

const databaseURL = process.env.NODE_ENV === 'production' ? process.env.PROD_DATABASE_URL : process.env.DEV_DATABASE_URL;

mongoose.connect(databaseURL)
	.then(() => {
   		console.log('Connecté à la base de données MongoDB');
  	})
  	.catch((error) => {
    	console.error('Erreur de connexion à MongoDB :', error.message);
  	});

mongoose.connection.on('error', (err) => {
  	console.error('Erreur de connexion MongoDB :', err.message);
});

module.exports = mongoose;