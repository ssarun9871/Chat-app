const express = require('express');
const fs = require('fs');
const router = express.Router();


router.get('/login', (req, res, next) => {
    res.send(`<form onsubmit="localStorage.setItem('username',document.getElementById('user').value)"  action='/'method="GET">
             <input id="user" type="text" name="username">
             <button type="submit">Login</button>
             </form>`)
});

router.get('/', (req, res, next) => {
    fs.readFile('./data.txt', 'utf-8', (err, data) => {
        if (err) { console.log(err); }

        else {
            res.send(`
            ${data}<form method = "POST" onsubmit="document.getElementById('user').value=localStorage.getItem('username')">
            <input type="text" placeholder ="message" id="msg" name="message"><br>
            <input type="hidden" id="user" name="username">
            <button type="submit" id="btn"}">submit</button>
            </form>`);
        }
    })
})


router.post('/', (req, res, next) => {
    let username = req.body.username;
    let message = req.body.message
    if (message == undefined) return;

    fs.writeFile('./data.txt', `${username}: ${message} \n`, { flag: 'a' }, (err) => {
        if (err) { console.log(err) }
        else {
            console.log('write successfully')
            res.redirect('/');
        }
    })
})

module.exports = router;
