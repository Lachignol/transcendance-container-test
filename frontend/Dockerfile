# Utilise l'image officielle Nginx comme base
FROM nginx:latest

# Copie les fichiers du dossier 'html' local dans le dossier racine du serveur web Nginx
# (optionnel si vous avez du contenu statique à servir)
COPY html/ /usr/share/nginx/html/


RUN chmod -R 755 /usr/share/nginx/html/
RUN chmod 644 /usr/share/nginx/html/
# Expose le port 80 pour accéder au service web
EXPOSE 8080

# Commande par défaut pour lancer nginx en mode non daemon (au premier plan)
CMD ["nginx", "-g", "daemon off;"]

