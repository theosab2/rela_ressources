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
const express = require('express');
const router = express.Router();
//====================================//

//===== Global routes =====//
    router.get('/test', (req, res, next) => {
        res.status(200).json({ message:"L'API à répondu correctement" });
    });

//#region [AUTH]

    //Inscription
    router.post('/auth/register', async function(req, res, next){
        var userCreationQueryResult = await _userQueryService.createUser(req.body.user)
        res.status(userCreationQueryResult.statusCode).json(userCreationQueryResult);
    });

    //Connexion
    router.post('/auth/login', async function(req, res, next){
        var authenticationResult = await _userApplicationService.handleAuthenticationRequest(req.body.identifier,req.body.password);
        res.status(authenticationResult.statusCode).json(authenticationResult);
    });

    //Déconnexion
    router.post('/auth/logout/:userId', async function(req, res, next){
        var logoutResult = await _userQueryService.disconnectUser(req.params.userId);
        res.status(logoutResult.statusCode).json(logoutResult);
    });
    
//#endregion

//#region [ARTICLE]

    //#region [SCHEMA]

        //Get article model schema
        router.get('/article/schema', async function(req, res, next){
            var data = await _articleQueryService.getArticleSchema();
            res.status(200).json(data);
        });

        //Get article model schema
        router.get('/article/schema/detailled', async function(req, res, next){
            var data = await _articleQueryService.getDetailledArticleSchema();
            res.status(200).json(data);
        });

    //#endregion

    //#region [QUERY]

        //Get query object template
        router.get('/articles/query', async function(req, res, next){
            var data = await _articleQueryService.getQueryTemplate();
            res.status(200).json(data);
        });

        //Get list of articles from query in request body
        router.post('/articles/query', async function(req, res, next){
            var data = await _articleQueryService.queryArticles(req.body);
            res.status(200).json(data);
        });

    //#endregion

    //#region [GET RESSOURCES]

        //Get all articles
        router.get('/articles/all', async function(req, res, next){
            var data = await _articleQueryService.getAllArticles();
            res.status(200).json(data);
        });


        //Get article by ID
        router.get('/article/:id', async function(req, res, next){
            var data = await _articleQueryService.getArticleById(req.params.id);
            res.status(200).json(data);
        });

    //#endregion

    //#region [UPDATE RESSOURCES]

        //Création d'un article
        router.post('/article/create', async function(req, res, next){
            var articleCreationQueryResult = await _articleQueryService.createArticle(req.body.article)
            res.status(articleCreationQueryResult.statusCode).json(articleCreationQueryResult);
        });

        //Suppression d'un article
        router.post('/article/delete/:articleId', async function(req, res, next){ // Sera à modifier, on ne supprime pas une entité, on la désactive (mev)
            var deleteResult = await _articleQueryService.deleteArticle(req.params.articleId);
            res.status(deleteResult.statusCode).json(deleteResult);
        });

        //Mise à jour d'un article
        router.put('/article/:articleId', async function(req, res, next){
            var updateResult = await _articleQueryService.updateArticle(req.params.articleId,req.body.article);
            res.status(updateResult.statusCode).json(updateResult);
        });

    //#endregion

//#endregion

// ========================================================== //

//#region [USER]

    //#region [SCHEMA]

        //Get user model schema
        router.get('/user/schema', async function(req, res, next){
            var data = await _userQueryService.getUserSchema();
            res.status(200).json(data);
        });

        //Get user model schema
        router.get('/user/schema/detailled', async function(req, res, next){
            var data = await _userQueryService.getDetailledUserSchema();
            res.status(200).json(data);
        });

    //#endregion

    //#region [QUERY]

        //Get query object template
        router.get('/users/query', async function(req, res, next){
            var data = await _userQueryService.getQueryTemplate();
            res.status(200).json(data);
        });

        //Get list of users from query in request body
        router.post('/users/query', async function(req, res, next){
            var data = await _userQueryService.queryUsers(req.body);
            res.status(200).json(data);
        });

    //#endregion

    //#region [GET RESSOURCES]

        //Get all users
        router.get('/users/all', async function(req, res, next){
            var data = await _userQueryService.getAllUsers();
            res.status(200).json(data);
        });


        //Get user by ID
        router.get('/user/:id', async function(req, res, next){
            var data = await _userQueryService.getUserById(req.params.id);
            res.status(200).json(data);
        });

    //#endregion

    //#region [UPDATE RESSOURCES]

        //Suppression d'un utilisateur
        router.post('/user/delete/:userId', async function(req, res, next){ // Sera à modifier, on ne supprime pas une entité, on la désactive (mev)
            var deleteResult = await _userQueryService.deleteUser(req.params.userId);
            res.status(deleteResult.statusCode).json(deleteResult);
        });

        //Mise à jour d'un utilisateur
        router.put('/user/:userId', async function(req, res, next){
            var updateResult = await _userQueryService.updateUser(req.params.userId,req.body.user);
            res.status(updateResult.statusCode).json(updateResult);
        });

    //#endregion

//#endregion

module.exports = router;

