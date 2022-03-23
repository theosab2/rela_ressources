//===== DAL - QueryServices =====//
const _articleQueryService = require("../DAL/articleQueryService");
const _categoryQueryService = require("../DAL/categoryQueryService");
const _commentQueryService = require("../DAL/commentQueryService");
const _roleQueryService = require("../DAL/roleQueryService");
const _userQueryService = require("../DAL/userQueryService");
//===============================//

//===== BLL - QueryServices =====//
const _articleApplicationService = require("../BLL/articleApplicationService");
const _categoryApplicationService = require("../BLL/categoryApplicationService");
const _commentApplicationService = require("../BLL/commentApplicationService");
const _roleApplicationService = require("../BLL/roleApplicationService");
const _userApplicationService = require("../BLL/userApplicationService");
//===============================//

//===== Initialisation du router =====//
const express = require("express");
const router = express.Router();
//====================================//

//===== Global routes =====//
router.get("/test", (req, res, next) => {
  res.status(200).json({ message: "L'API à répondu correctement" });
});

//#region [AUTH]

//Inscription
router.post("/auth/register", async function (req, res, next) {
  var userCreationQueryResult = await _userQueryService.createUser(
    req.body.user
  );
  res.status(userCreationQueryResult.statusCode).json(userCreationQueryResult);
});

//Connexion
router.post("/auth/login", async function (req, res, next) {
  var authenticationResult =
    await _userApplicationService.handleAuthenticationRequest(
      req.body.identifier,
      req.body.password
    );
  res.status(authenticationResult.statusCode).json(authenticationResult);
});

//Déconnexion
router.post("/auth/logout/:userId", async function (req, res, next) {
  var logoutResult = await _userQueryService.disconnectUser(req.params.userId);
  res.status(logoutResult.statusCode).json(logoutResult);
});

//#endregion

// ========================================================== //

//#region [USER]

//#region [SCHEMA]

//Get user model schema
router.get("/user/schema", async function (req, res, next) {
  var data = await _userQueryService.getUserSchema();
  res.status(200).json(data);
});

//Get user model schema
router.get("/user/schema/detailled", async function (req, res, next) {
  var data = await _userQueryService.getDetailledUserSchema();
  res.status(200).json(data);
});

//#endregion

//#region [QUERY]

//Get query object template
router.get("/users/query", async function (req, res, next) {
  var data = await _userQueryService.getQueryTemplate();
  res.status(200).json(data);
});

//Get list of users from query in request body
router.post("/users/query", async function (req, res, next) {
  var data = await _userQueryService.queryUsers(req.body);
  res.status(200).json(data);
});

//#endregion

//#region [GET RESSOURCES]

//Get all users
router.get("/users/all", async function (req, res, next) {
  var data = await _userQueryService.getAllUsers();
  res.status(200).json(data);
});

//Get user by ID
router.get("/user/:id", async function (req, res, next) {
  var data = await _userQueryService.getUserById(req.params.id);
  res.status(200).json(data);
});

//#endregion

//#region [UPDATE RESSOURCES]

//Suppression d'un utilisateur
router.post("/user/delete/:userId", async function (req, res, next) {
  // Sera à modifier, on ne supprime pas une entité, on la désactive (mev)
  var deleteResult = await _userQueryService.deleteUser(req.params.userId);
  res.status(deleteResult.statusCode).json(deleteResult);
});

//Mise à jour d'un utilisateur
router.put("/user/:userId", async function (req, res, next) {
  var updateResult = await _userQueryService.updateUser(
    req.params.userId,
    req.body.user
  );
  res.status(updateResult.statusCode).json(updateResult);
});

//#endregion

//#endregion

// ========================================================== //

//#region [ARTICLE]

//#region [SCHEMA]

//Get article model schema
router.get("/article/schema", async function (req, res, next) {
  var data = await _articleQueryService.getArticleSchema();
  res.status(200).json(data);
});

//Get article model detailled schema
router.get("/article/schema/detailled", async function (req, res, next) {
  var data = await _articleQueryService.getDetailledArticleSchema();
  res.status(200).json(data);
});

//#endregion

//#region [QUERY]

//Get query object template
router.get("/articles/query", async function (req, res, next) {
  var data = await _articleQueryService.getQueryTemplate();
  res.status(200).json(data);
});

//Get list of articles from query in request body
router.post("/articles/query", async function (req, res, next) {
  var data = await _articleQueryService.queryArticles(req.body);
  res.status(200).json(data);
});

//#endregion

//#region [GET RESSOURCES]

//Get all articles
router.get("/articles/all", async function (req, res, next) {
  var data = await _articleQueryService.getAllArticles();
  res.status(200).json(data);
});

//Get article by ID
router.get("/article/:id", async function (req, res, next) {
  var data = await _articleQueryService.getArticleById(req.params.id);
  res.status(200).json(data);
});

//#endregion

//#region [UPDATE RESSOURCES]

//Création d'un article
router.post("/article/create", async function (req, res, next) {
  var articleCreationQueryResult = await _articleQueryService.createArticle(
    req.body.article
  );
  res
    .status(articleCreationQueryResult.statusCode)
    .json(articleCreationQueryResult);
});

//Suppression d'un article
router.post("/article/delete/:articleId", async function (req, res, next) {
  // Sera à modifier, on ne supprime pas une entité, on la désactive (mev)
  var deleteResult = await _articleQueryService.deleteArticle(
    req.params.articleId
  );
  res.status(deleteResult.statusCode).json(deleteResult);
});

//Mise à jour d'un article
router.put("/article/:articleId", async function (req, res, next) {
  var updateResult = await _articleQueryService.updateArticle(
    req.params.articleId,
    req.body.article
  );
  res.status(updateResult.statusCode).json(updateResult);
});

//#endregion

//#endregion

// ========================================================== //

//#region [ROLE]

//#region [SCHEMA]

//Get role model schema
router.get("/role/schema", async function (req, res, next) {
  var data = await _roleQueryService.getRoleSchema();
  res.status(200).json(data);
});

//Get role model detailled schema
router.get("/role/schema/detailled", async function (req, res, next) {
  var data = await _roleQueryService.getDetailledRoleSchema();
  res.status(200).json(data);
});

//#endregion

//#region [QUERY]

//Get query object template
router.get("/roles/query", async function (req, res, next) {
  var data = await _roleQueryService.getQueryTemplate();
  res.status(200).json(data);
});

//Get list of roles from query in request body
router.post("/roles/query", async function (req, res, next) {
  var data = await _roleQueryService.queryRoles(req.body);
  res.status(200).json(data);
});

//#endregion

//#region [GET RESSOURCES]

//Get all roles
router.get("/roles/all", async function (req, res, next) {
  var data = await _roleQueryService.getAllRoles();
  res.status(200).json(data);
});

//Get role by ID
router.get("/role/:id", async function (req, res, next) {
  var data = await _roleQueryService.getRoleById(req.params.id);
  res.status(200).json(data);
});

//#endregion

//#region [UPDATE RESSOURCES]

//Création d'un role
router.post("/role/create", async function (req, res, next) {
  var roleCreationQueryResult = await _roleQueryService.createRole(
    req.body.role
  );
  res.status(roleCreationQueryResult.statusCode).json(roleCreationQueryResult);
});

//Suppression d'un role
router.post("/role/delete/:roleId", async function (req, res, next) {
  // Sera à modifier, on ne supprime pas une entité, on la désactive (mev)
  var deleteResult = await _roleQueryService.deleteRole(req.params.roleId);
  res.status(deleteResult.statusCode).json(deleteResult);
});

//Mise à jour d'un role
router.put("/role/:roleId", async function (req, res, next) {
  var updateResult = await _roleQueryService.updateRole(
    req.params.roleId,
    req.body.role
  );
  res.status(updateResult.statusCode).json(updateResult);
});

//#endregion

//#endregion

// ========================================================== //

//#region [CATEGORY]

//#region [SCHEMA]

//Get category model schema
router.get("/category/schema", async function (req, res, next) {
  var data = await _categoryQueryService.getCategorySchema();
  res.status(200).json(data);
});

//Get category model detailled schema
router.get("/category/schema/detailled", async function (req, res, next) {
  var data = await _categoryQueryService.getDetailledCategorySchema();
  res.status(200).json(data);
});

//Get user model schema
router.get("/user/schema/detailled", async function (req, res, next) {
  var data = await _userQueryService.getDetailledUserSchema();
  res.status(200).json(data);
});

//#endregion

//#region [QUERY]

//Get query object template
router.get("/categories/query", async function (req, res, next) {
  var data = await _categoryQueryService.getQueryTemplate();
  res.status(200).json(data);
});

//Get list of categories from query in request body
router.post("/categories/query", async function (req, res, next) {
  var data = await _categoryQueryService.queryCategories(req.body);
  res.status(200).json(data);
});

//Get list of users from query in request body
router.post("/users/query", async function (req, res, next) {
  var data = await _userQueryService.queryUsers(req.body);
  res.status(200).json(data);
});

//#endregion

//#region [GET RESSOURCES]


//Get all categories
router.get("/categories/all", async function (req, res, next) {
  var data = await _categoryQueryService.getAllCategories();
  res.status(200).json(data);
});

//Get category by ID
router.get("/category/:id", async function (req, res, next) {
  var data = await _categoryQueryService.getCategoryById(req.params.id);
  res.status(200).json(data);
});

//#endregion

//#region [UPDATE RESSOURCES]

//Création d'un category
router.post("/category/create", async function (req, res, next) {
  var categoryCreationQueryResult = await _categoryQueryService.createCategory(
    req.body.category
  );
  res.status(categoryCreationQueryResult.statusCode).json(categoryCreationQueryResult);
});

//Suppression d'un category
router.post("/category/delete/:categoryId", async function (req, res, next) {
  // Sera à modifier, on ne supprime pas une entité, on la désactive (mev)
  var deleteResult = await _categoryQueryService.deleteCategory(
    req.params.categoryId
  );
  res.status(deleteResult.statusCode).json(deleteResult);
});

//Mise à jour d'un category
router.put("/category/:categoryId", async function (req, res, next) {
  var updateResult = await _categoryQueryService.updateCategory(
    req.params.categoryId,
    req.body.category
  );
  res.status(updateResult.statusCode).json(updateResult);
});

//#endregion

//#endregion

// ========================================================== //

//#region [COMMENT]

//#region [SCHEMA]

//Get comment model schema
router.get("/comment/schema", async function (req, res, next) {
  var data = await _commentQueryService.getCommentSchema();
  res.status(200).json(data);
});

//Get comment model detailled schema
router.get("/comment/schema/detailled", async function (req, res, next) {
  var data = await _commentQueryService.getDetailledCommentSchema();
  res.status(200).json(data);
});

//#endregion

//#region [QUERY]

//Get query object template
router.get("/comments/query", async function (req, res, next) {
  var data = await _commentQueryService.getQueryTemplate();
  res.status(200).json(data);
});

//Get list of comments from query in request body
router.post("/comments/query", async function (req, res, next) {
  var data = await _commentQueryService.queryComments(req.body);
  res.status(200).json(data);
});

//#endregion

//#region [GET RESSOURCES]

//Get all comments
router.get("/comments/all", async function (req, res, next) {
  var data = await _commentQueryService.getAllComments();
  res.status(200).json(data);
});

//Get comment by ID
router.get("/comment/:id", async function (req, res, next) {
  var data = await _commentQueryService.getCommentById(req.params.id);
  res.status(200).json(data);
});

//#endregion

//#region [UPDATE RESSOURCES]

//Création d'un comment
router.post("/comment/create", async function (req, res, next) {
  var commentCreationQueryResult = await _commentQueryService.createComment(
    req.body.comment
  );
  res
    .status(commentCreationQueryResult.statusCode)
    .json(commentCreationQueryResult);
});

//Suppression d'un comment
router.post("/comment/delete/:commentId", async function (req, res, next) {
  // Sera à modifier, on ne supprime pas une entité, on la désactive (mev)
  var deleteResult = await _commentQueryService.deleteComment(
    req.params.commentId
  );
  res.status(deleteResult.statusCode).json(deleteResult);
});

//Mise à jour d'un comment
router.put("/comment/:commentId", async function (req, res, next) {
  var updateResult = await _commentQueryService.updateComment(
    req.params.commentId,
    req.body.comment
  );
  res.status(updateResult.statusCode).json(updateResult);
});

//#endregion

//#endregion

// ========================================================== //

module.exports = router;
