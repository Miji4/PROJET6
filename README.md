# SO PEKOCKO 

Dans le cadre de ma formation de Développeur web chez Openclassroom, ce projet consiste en la création du backend d'une application de critique gastronomique pour une agence de sauces Sopekocko le côté front-end étant déjà fourni.
J'ai donc réalisé le back end de l'application en Api rest avec Nodejs et Express.

# Identité
So Pekocko est une entreprise familiale de 10 salariés. Son activité principale est la création de sauces piquantes dont la composition est tenue secrète. Forte de son succès, l’entreprise souhaite se développer et créer une application web, dans laquelle les utilisateurs pourront ajouter leurs sauces préférées et liker ou disliker les sauces proposées par les autres.

# Exigences concernant la sécurité
L’API doit respecter le RGPD et les standards OWASP :

Le mot de passe des utilisateurs doit être chiffré.
2 types de droits administrateur à la base de données doivent être définis : un accès pour supprimer ou modifier des tables, et un accès pour éditer le contenu de la base de données.
La sécurité de la base de données MongoDB (à partir d’un service tel que MongoDB Atlas) doit être faite de telle sorte que le validateur puisse lancer l’application depuis sa machine.
L’authentification est renforcée sur les routes requises.
Les mots de passe sont stockés de manière sécurisée.
Les adresses mails de la base de données sont uniques et un plugin Mongoose approprié est utilisé pour s’assurer de leur caractère unique et rapporter des erreurs.
Erreurs API
Toute erreur doit être renvoyée telle quelle, sans aucune modification ni ajout. Si nécessaire, utiliser une nouvelle Erreur().

# Routes API
Toutes les routes relatives à la sauce doivent exiger une demande authentifiée (contenant un jeton valide dans son en-tête d'autorisation : "Bearer ").

# Technologies utilisées
Node, Express, MongoDB.

# Tester le site en local

Le projet a été généré avec Angular CLI version 7.0.2.

Pour faire fonctionner le projet, vous devez installer node-sass à part.

# Development server
Pour se connecter au frontend démarrer ng serve pour avoir accès au serveur de développement. Rendez-vous sur http://localhost:4200/. L'application va se recharger automatiquement si vous modifiez un fichier source.

Pour le backend de l'application lancer node server ou nodemon server après avoir installé NodeJs et les packages npm...

# Connection a MongoDB
Pour vous connecter à la base de donnée avec votre compte mongoDB, completer le fichier .env-prod en entrer votre identifiant et mot de passe de connection a MongoDB. Ensuite renommer le fichier .env-prod en .env . 
