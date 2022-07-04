const allArticle = require('../pages/utils/articleManager');

test('allArticle get all article', () => {
  expect(() => allArticle()).toBe(!null);
});