let khoa = require('express').Router();

// khoa.all('/khoa', (req, res, next) => next());

khoa.get("/", (req, res) => res.render("khoa", {}));