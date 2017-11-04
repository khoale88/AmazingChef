/**
 * created by khoa on 10/28/2017
 * routing for authentication-related api like login
 */
let express = require('express');
let auth = express.Router();
var registeredUsers = [];
/**
 * GET login form
 */
auth.get('/login', (req, res) => {
    res.render('auth/login');
});

auth.get('/register', (req, res) => {
    res.render('auth/register');
});

auth.post('/register', function(req, res)
{
    if(!req.body.username || !req.body.password || !req.body.confirmpassword )
    {
         res.sendStatus(401);
    } 
    else if(req.body.password !== req.body.confirmpassword )
    {
         res.sendStatus(401);
    }
    else 
    {
        // Create an array of users with matching usernames.
        var matches = registeredUsers.filter(function(user)
                      {
                          return user.username === req.body.username;
                      });
    if (matches.length > 0)
        {
             res.sendStatus(401);
        }
        
        // Register a new user.
        else
        {
            var newUser = { username: req.body.username, 
                            password: req.body.password };
            registeredUsers.push(newUser);
            console.log("New user:"); console.log(newUser);
            console.log("Registered users:"); console.log(registeredUsers);
            res.redirect('/');
        }
    }
});

/**
 * Handle login info
 */
auth.post('/login', (req, res) => {
    let body = req.body;
    // Create an array of users with matching usernames.
     var matches = registeredUsers.filter(function(user)
                      {
                          return user.username === req.body.username && user.password === body.password;
                      });
    if (matches.length > 0)
        {
            req.session.admin = true;
        req.session.login = true;
        req.session.logTime = new Date().getTime() / 1000;
        res.redirect('/');
        }
    else if (body.username === 'admin' && body.password==='admin')
    {
        req.session.admin = true;
        req.session.login = true;
        req.session.logTime = new Date().getTime() / 1000;
        res.redirect('/');
    }
    else {
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