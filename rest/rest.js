var express = require('express');
var router = express.Router();


exports.register = function (app) {
    //restricted to use application/json content type only.
    app.use(function (req, res, next) {
       /* var ALLOWED_CONTENT_TYPE = 'application/json';
        if (!req.headers['content-type'] && req.headers['content-type'] !== ALLOWED_CONTENT_TYPE) {
            return res.status(406).end();
        }
        res.contentType(ALLOWED_CONTENT_TYPE);*/
        next();
    });
    app.use('/api', router);

    rootRequire('rest/controller/todoController').redirect(router);
};