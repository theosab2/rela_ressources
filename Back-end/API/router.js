//==== MiddleWares ====//
const _multer = require('../MiddleWares/multer-configuration');
//=====================//

//===== Controllers =====//
const _utController = require("../Controllers/utController");

//===============================//

//===== DAL - QueryServices =====//
const _articleQueryService = require("../DAL/articleQueryService");
const _commentQueryService = require("../DAL/commentQueryService");
const _userQueryService = require("../DAL/userQueryService");
//===============================//

//===== BLL - ApplicationServices =====//
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

//#region [SCHEMA]

  //USER
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

  //ARTICLE
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

  //COMMENT
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
  router.post("/article/create", _multer.articleImage, async function (req, res, next) {

    var articleObject = {};
  
    if(req.file == undefined || req.file == null){
      articleObject = req.body.article
    }
    else{
      articleObject = {
        ...JSON.parse(req.body.article),
        articleImage:`${req.protocol}://${req.get('host')}/article-image/${req.file.filename}`
      }
    }    

    var articleCreationQueryResult = await _articleQueryService.createArticle(
      articleObject
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

//#region [COMMENT]

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

//#region [UTable]

  //Get query object template
  router.get("/ut/all/:code", async function (req, res, next) {
    let code = req.params.code;
    var data = await _utController.getAllByCode(code);
    res.status(200).json(data);
  });

//#endregion

module.exports = router;
