//==== MiddleWares ====//
const _multer = require('../MiddleWares/multer-configuration');
const _responseLogger = require('../MiddleWares/response-logger');
//=====================//

//===== Controllers =====//
const _articleController = require("../Controllers/articleController");
const _authController = require("../Controllers/authController");
const _commentController = require("../Controllers/commentController");
const _messageController = require("../Controllers/messageController");
const _relationController = require("../Controllers/relationController");
const _userController = require("../Controllers/userController");
const _utController = require("../Controllers/utController");

//===============================//

//===== DAL - QueryServices =====//
const _articleQueryService = require("../DAL/articleQueryService");
const _commentQueryService = require("../DAL/commentQueryService");
const _messageQueryService = require("../DAL/messageQueryService");
const _relationQueryService = require("../DAL/relationQueryService");
const _userQueryService = require("../DAL/userQueryService");
const _utQueryService = require("../DAL/userQueryService");
//===============================//

//===== BLL - ApplicationServices =====//
const _userApplicationService = require("../BLL/userApplicationService");
//===============================//

//===== Initialisation du router =====//
const express = require("express");
const multer = require('multer');
const router = express.Router();
//====================================//

//===== Global routes =====//
router.get("/test", (req, res, next) => {
  res.status(200).json({ message: "L'API à répondu correctement bonjour" });
  _responseLogger(req);
});

//#region [SCHEMA]

  //USER
  //Get user model schema
  router.get("/user/schema", async function (req, res, next) {
    var data = await _userQueryService.getSchema();
    res.status(200).json(data);
    _responseLogger(req);
  });

  //Get user model schema
  router.get("/user/schema/detailled", async function (req, res, next) {
    var data = await _userQueryService.getDetailledSchema();
    res.status(200).json(data);
    _responseLogger(req);
  });

  //ARTICLE
  //Get article model schema
  router.get("/article/schema", async function (req, res, next) {
    var data = await _articleController.getSchema();
    res.status(200).json(data);
    _responseLogger(req);
  });

  //Get article model detailled schema
  router.get("/article/schema/detailled", async function (req, res, next) {
    var data = await _articleController.getDetailledSchema();
    _responseLogger(req);
    res.status(200).json(data);
  });

  //COMMENT
  //Get comment model schema
  router.get("/comment/schema", async function (req, res, next) {
    var data = await _commentQueryService.getSchema();
    _responseLogger(req);
    res.status(200).json(data);
  });

  //Get comment model detailled schema
  router.get("/comment/schema/detailled", async function (req, res, next) {
    var data = await _commentQueryService.getDetailledSchema();
    _responseLogger(req);
    res.status(200).json(data);
  });

  //MESSAGE
  //Get message model schema
  router.get("/message/schema", async function (req, res, next) {
    var data = await _messageController.getSchema();
    _responseLogger(req);
    res.status(200).json(data);
  });

  //Get message model detailled schema
  router.get("/message/schema/detailled", async function (req, res, next) {
    var data = await _messageController.getDetailledSchema();
    _responseLogger(req);
    res.status(200).json(data);
  });

  //RELATION
  //Get relation model schema
  router.get("/relation/schema", async function (req, res, next) {
    var data = await _relationController.getSchema();
    _responseLogger(req);
    res.status(200).json(data);
  });

  //Get relation model detailled schema
  router.get("/relation/schema/detailled", async function (req, res, next) {
    var data = await _relationController.getDetailledSchema();
    _responseLogger(req);
    res.status(200).json(data);
  });

  //UTable
  //Get UTable model schema
  router.get("/ut/schema", async function (req, res, next) {
    var data = await _utController.getSchema();
    _responseLogger(req);
    res.status(200).json(data);
  });

  //Get UTable model detailled schema
  router.get("/ut/schema/detailled", async function (req, res, next) {
    var data = await _utController.getDetailledSchema();
    _responseLogger(req);
    res.status(200).json(data);
  });


//#endregion

//#region [AUTH]

//Inscription
router.post("/auth/register",_multer.avatarImage, async function (req, res, next) {

  if(req.file != undefined & req.file != null){
    req.body.user = {
      ...JSON.parse(req.body.user),
      photoUrl : `${req.protocol}://${req.get('host')}/avatar-image/${req.file.filename}`
    };
  }

  var userCreationQueryResult = await _userController.create(
    req.body
  );
  _responseLogger(req);
  res.status(userCreationQueryResult.statusCode).json(userCreationQueryResult);
});

//Connexion
router.post("/auth/login", async function (req, res, next) {
  var authenticationResult =
    await _userApplicationService.handleAuthenticationRequest(
      req.body.identifier,
      req.body.password
    );
  _responseLogger(req);
  res.status(authenticationResult.statusCode).json(authenticationResult);
});

//Déconnexion
router.post("/auth/logout/:userId", async function (req, res, next) {
  var logoutResult = await _userQueryService.disconnectUser(req.params.userId);
  _responseLogger(req);
  res.status(logoutResult.statusCode).json(logoutResult);
});

//#endregion

// ========================================================== //

//#region [USER]

//#region [QUERY]

//Get query object template
router.get("/users/query", async function (req, res, next) {
  var data = await _userQueryService.getQueryTemplate();
  _responseLogger(req);
  res.status(200).json(data);
});

//Get list of users from query in request body
router.post("/users/query", async function (req, res, next) {
  var data = await _userQueryService.query(req.body);
  _responseLogger(req);
  res.status(200).json(data);
});

//#endregion

//#region [GET RESSOURCES]

//Get all users
router.get("/users/all", async function (req, res, next) {
  var data = await _userQueryService.getAll();
  _responseLogger(req);
  res.status(200).json(data);
});

//Get user by ID
router.get("/user/:id", async function (req, res, next) {
  var data = await _userQueryService.getUserById(req.params.id);
  _responseLogger(req);
  res.status(200).json(data);
});

//#endregion

//#region [UPDATE RESSOURCES]

//Suppression d'un utilisateur
router.post("/user/delete/:userId", async function (req, res, next) {
  // Sera à modifier, on ne supprime pas une entité, on la désactive (mev)
  var deleteResult = await _userQueryService.deleteUser(req.params.userId);
  _responseLogger(req);
  res.status(deleteResult.statusCode).json(deleteResult);
});

//Mise à jour d'un utilisateur
router.put("/user/:userId",_multer.avatarImage, async function (req, res, next) {

  if(req.file != undefined & req.file != null){
    req.body.user = {
      ...JSON.parse(req.body.user),
      photoUrl : `${req.protocol}://${req.get('host')}/avatar-image/${req.file.filename}`
    };
  }
  else{
    try {
      req.body.user = {
        ...JSON.parse(req.body.user)
      };
    } catch (error) {
      console.log(error)
    }
    
  }
  
  var updateResult = await _userQueryService.updateUser(
    req.params.userId,
    req.body.user
  );
  _responseLogger(req);
  res.status(updateResult.statusCode).json(updateResult);
});

//Ajout / suppression d'un amis d'un utilisateur
router.post("/user/toggle-friend/:userId/:friendId", async function (req, res, next) {
  var updateResult = await _userQueryService.toggleFriend(
    req.params.userId,
    req.params.friendId
  );
  _responseLogger(req);
  res.status(updateResult.statusCode).json(updateResult);
});

//Ajout / suppression d'une ressource d'un utilisateur
router.post("/user/toggle-favorite/:userId/:favoriteId", async function (req, res, next) {
  var updateResult = await _userQueryService.toggleFavorite(
    req.params.userId,
    req.params.favoriteId
  );
  _responseLogger(req);
  res.status(updateResult.statusCode).json(updateResult);
});

//#endregion

//#endregion

// ========================================================== //

//#region [ARTICLE]

//#region [QUERY]

//Get query object template
router.get("/articles/query", async function (req, res, next) {
  var data = await _articleController.getQueryTemplate();
  _responseLogger(req);
  res.status(200).json(data);
});

//Get list of articles from query in request body
router.post("/articles/query", async function (req, res, next) {
  var data = await _articleController.query(req.body);
  _responseLogger(req);
  res.status(200).json(data);
});

//#endregion

//#region [GET RESSOURCES]

//Get all articles
router.get("/articles/all", async function (req, res, next) {
  var data = await _articleController.getAll();
  _responseLogger(req);
  res.status(200).json(data);
});

//Get article by ID
router.get("/article/:id", async function (req, res, next) {
  var data = await _articleController.getOne(req.params.id);
  _responseLogger(req);
  res.status(200).json(data);
});

//#endregion

//#region [UPDATE RESSOURCES]
  //Création d'un article
  router.post("/article/create", _multer.articleImage, async function (req, res, next) {     

    if(req.file != undefined & req.file != null){
      console.log(req);
      req.body.article = {
        ...JSON.parse(req.body.article),
        image : `${req.protocol}://${req.get('host')}/article-image/${req.file.filename}`
      };
    }
    else{
      req.body.article = {
        ...JSON.parse(req.body.article)
      }
    }

    var articleCreationQueryResult = await _articleController.create(
      req.body
    );

    _responseLogger(req);
      res
        .status(articleCreationQueryResult.statusCode)
        .json(articleCreationQueryResult);
  });

  router.post("/article/set-content-media/:articleId",_multer.contentMedia ,async function (req, res, next) {         
    if(req.file != undefined & req.file != null){
      req.body.content = {
        ...JSON.parse(req.body.content),
        mediaUrl : `${req.protocol}://${req.get('host')}/contents-medias/${req.file.filename}`
      };
    }
    else
    {
      req.body.content = {
        ...JSON.parse(req.body.content)
      };
    }
      
    var contentSetQueryResult = await _articleController.setContent(
      req.params.articleId,
      req.body
    );
    
    _responseLogger(req);
    res
    .status(contentSetQueryResult.statusCode)
    .json(contentSetQueryResult);

  });

//Suppression d'un article
router.post("/article/delete/:articleId", async function (req, res, next) {
  // Sera à modifier, on ne supprime pas une entité, on la désactive (mev)
  var deleteResult = await _articleQueryService.deleteArticle(
    req.params.articleId
  );
  
  _responseLogger(req);
  res.status(deleteResult.statusCode).json(deleteResult);
});

//Mise à jour d'un article
router.put("/article/:articleId",_multer.articleImage, async function (req, res, next) {
  if(req.file != undefined & req.file != null){
    console.log(req);
    req.body.article = {
      ...JSON.parse(req.body.article),
      image : `${req.protocol}://${req.get('host')}/article-image/${req.file.filename}`
    };
  }
  else{
    req.body.article = {
      ...JSON.parse(req.body.article)
    }
  }
  
  var updateResult = await _articleQueryService.updateOne(
    req.params.articleId,
    req.body.article
  );
  
  _responseLogger(req);
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
  _responseLogger(req);
  res.status(200).json(data);
});

//Get list of comments from query in request body
router.post("/comments/query", async function (req, res, next) {
  console.log(req.body);

  var data = await _commentQueryService.queryComments(req.body);
  _responseLogger(req);
  res.status(200).json(data);
});

//#endregion

//#region [GET RESSOURCES]

//Get all comments
router.get("/comments/all", async function (req, res, next) {
  var data = await _commentQueryService.getAllComments();
  _responseLogger(req);
  res.status(200).json(data);
});

//Get comment by ID
router.get("/comment/:id", async function (req, res, next) {
  var data = await _commentQueryService.getCommentById(req.params.id);
  _responseLogger(req);
  res.status(200).json(data);
});

//#endregion

//#region [UPDATE RESSOURCES]

//Création d'un comment
router.post("/comment/create", async function (req, res, next) {
  var commentCreationQueryResult = await _commentQueryService.createComment(
    req.body.comment
  );
  _responseLogger(req);
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
  _responseLogger(req);
  res.status(deleteResult.statusCode).json(deleteResult);
});

//Mise à jour d'un comment
router.put("/comment/:commentId", async function (req, res, next) {
  var updateResult = await _commentQueryService.updateComment(
    req.params.commentId,
    req.body.comment
  );
  _responseLogger(req);
  res.status(updateResult.statusCode).json(updateResult);
});

//#endregion

//#endregion

// ========================================================== //

//#region [MESSAGE]

  //#region [GET RESSOURCES]

  router.get("/messages/all", async function (req, res, next) {
    var data = await _messageController.getAll();
    _responseLogger(req);
    res.status(200).json(data);
  });

  router.get("/messages/all-by-relation/:relation_id", async function (req, res, next) {
    var data = await _messageController.getAllByRelation(req.params.relation_id);
    _responseLogger(req);
    res.status(200).json(data);
  });

  //#endregion

  //#region [QUERY]

  //Get query object template
  router.get("/messages/query", async function (req, res, next) {
    var data = await _messageController.getQueryTemplate();
    _responseLogger(req);
    res.status(200).json(data);
  });

  //Get list of messages from query in request body 
  router.post("/messages/query", async function (req, res, next) {
    var data = await _messageController.query(req.body);
    _responseLogger(req);
    res.status(200).json(data);
  });

  //#endregion

  //#region [UPDATE RESSOURCES]

  router.post("/message/create", async function (req, res, next) {
    var creationResult = await _messageController.create(req.body);
    _responseLogger(req);
    res.status(200).json(creationResult);
  });

  //#endregion

//#endregion

// ========================================================== //

//#region [RELATION]

  //#region [GET RESSOURCES]

  router.get("/relations/all", async function (req, res, next) {
    var data = await _relationController.getAll();
    _responseLogger(req);
    res.status(200).json(data);
  });

  //#endregion

  //#region [QUERY]

  //Get query object template
  router.get("/relations/query", async function (req, res, next) {
    var data = await _relationController.getQueryTemplate();
    _responseLogger(req);
    res.status(200).json(data);
  });

  //Get list of relations from query in request body 
  router.post("/relations/query", async function (req, res, next) {
    var data = await _relationController.query(req.body);
    _responseLogger(req);
    res.status(200).json(data);
  });

  //#endregion

  //#region [UPDATE RESSOURCES]

  router.post("/relation/create", async function (req, res, next) {
    var creationResult = await _relationController.create(req.body);
    _responseLogger(req);
    res.status(200).json(creationResult);
  });

  router.put("/relation/:relationId", async function (req, res, next) {
    
    var updateResult = await _relationQueryService.updateOne(
      req.params.relationId,
      req.body.relation
    );
    _responseLogger(req);
    res.status(updateResult.statusCode).json(updateResult);
  });

  //#endregion

//#endregion

// ========================================================== //

//#region [UTable]

  //#region [GET RESSOURCES]

    //Get all uts by code
    router.get("/uts/all/:code", async function (req, res, next) {
      let code = req.params.code;
      var data = await _utController.getAllByCode(code);
      _responseLogger(req);
      res.status(200).json(data);
    });

  //#endregion


  //#region [QUERY]

  //Get query object template
  router.get("/uts/query", async function (req, res, next) {
    var data = await _utController.getQueryTemplate();
    _responseLogger(req);
    res.status(200).json(data);
  });

  //Get list of relations from query in request body 
  router.post("/uts/query", async function (req, res, next) {
    var data = await _utController.query(req.body);
    _responseLogger(req);
    res.status(200).json(data);
  });

  //#endregion

  //#region [UPDATE RESSOURCES]

  router.post("/ut/create", async function (req, res, next) {
    var creationResult = await _utController.create(req.body);
    _responseLogger(req);
    res.status(200).json(creationResult);
  });
  
  //#endregion

//#endregion

module.exports = router;

