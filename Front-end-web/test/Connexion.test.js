const allArticle = require('../pages/login/login');

test('allArticle get all article', () => {
  expect(() => ComponentConnexion("Mauvais mail","Mauvais mdp")).toEqual("Mauvais identifiant ou mot de passe");
});