const express = require('express')
const router = express.Router()
const User = require('../models/user')

/** POST /login - login: {username, password} => {token}
 *
 * Make sure to update their last-login!
 *
 **/

router.post('/login', async (req, res, next)=>{
    let {username , password} = req.body 
    let results = await User.authenticate({username, password})
    return res.json({results})
})


/** POST /register - register user: registers, logs in, and returns token.
 *
 * {username, password, first_name, last_name, phone} => {token}.
 *
 *  Make sure to update their last-login!
 */

 router.post('/register', async (req, res, next)=>{
    console.log('regiser')
    let {username, password, first_name, last_name, phone} = req.body
    let results = await User.register({username, password, first_name, last_name, phone})
    console.log(results,'results')
    return res.json(results);
})





module.exports = router