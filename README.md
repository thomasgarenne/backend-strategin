INSTALLATION LOCALE 

CLONER LE REPOSITORY

-> git clone https://github.com/thomasgarenne/backend-strategin

INSTALLER LES DEPENDANCES

-> npm install

CONFIGURER LE FICHIER .env

-> NODE_ENV=developpement
-> DEV_DATABASE_URL=mongodb://localhost:27017/<nomDeVotreBDD>
-> SECRET_KEY=<votreCléSecretePourGénérerLesTokens>

CONFIGURER CORS

-> const corsOptions = {
      origin: '<adresse du site depuis lequel son éffectués les requêtes>',
      ...,
    };

EXECUTER

-> npm run dev
