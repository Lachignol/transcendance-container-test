#!/bin/sh

# Génère ou regenère le client Prisma
npx prisma generate

# Synchronise le schéma avec la base SQLite
npx prisma db push

# A ENLEVER POUR LA PROD
npm run dev

# A METTRE POUR LA PROD
#npm start


