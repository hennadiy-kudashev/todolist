var express = require('express');

exports.register = function (app) {
    var apiRouter = express.Router();

    //restricted to use application/json content type only for non-GET requests.
    apiRouter.use(function (req, res, next) {
        if (!req.accepts('json')) {
            return res.status(406).end();
        }
        res.contentType('application/json');
        next();
    });
    rootRequire('controller/todoController').redirect(apiRouter);
    app.use('/api', apiRouter);
};