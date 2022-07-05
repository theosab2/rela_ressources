const allArticle = require('../pages/login/ComponentConnexion');

test('allArticle get all article', () => {
  expect(() => ComponentConnexion("Mauvais mail","Mauvais mdp")).toEqual("Mauvais identifiant ou mot de passe");
});