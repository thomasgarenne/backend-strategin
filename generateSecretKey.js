const fs = require('fs');
const crypto = require('crypto');

const generateSecretKey = () => {
  return crypto.randomBytes(32).toString('hex');
};

try {
  // Générer une nouvelle clé secrète
  const secretKey = generateSecretKey();

  // Stocker la clé secrète dans le fichier .env
  const envContent = `\nSECRET_KEY=${secretKey}`;

  // Ajouter au fichier .env sans remplacer le contenu existant
  fs.appendFile('.env', envContent, { flag: 'a' }, (err) => {
    if (err) throw err;
    console.log('La clé secrète a été générée et ajoutée dans le fichier .env.');
  });
} catch (error) {
  console.error('Une erreur s\'est produite :', error.message);
}