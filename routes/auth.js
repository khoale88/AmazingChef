/**
 * created by khoa on 10/28/2017
 * routing for authentication-related api like login
 */
let express = require('express');
let auth = express.Router();

/**
 * GET login form
 */
auth.get('/login', (req, res) => {
    res.render('auth/login');
});

/**
 * Handle login info
 */
auth.post('/login', (req, res) => {
    let body = req.body;
    if(body.username === 'admin' && body.password==='admin'){
        req.session.admin = true;
        req.session.login = true;
        req.session.logTime = new Date().getTime() / 1000;
        res.redirect('/');
    } else {
        res.sendStatus(401);
    }
});

// module.exports.isAmin = (req, res, next) => {
//     let now = new Date().getTime() / 1000;
//     // session valid for 60 mins only
//     if (req.session.admin && now - req.session.logTime <= 3600) {
//         next();
//     } else {
//         res.redirect('/auth/login');
//     }
// };

module.exports = auth;