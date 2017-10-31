let khoa = require('express').Router();

// khoa.all('/khoa', (req, res, next) => next());

khoa.get("/home", (req, res) => res.render("khoa", {}));

module.exports = khoa;