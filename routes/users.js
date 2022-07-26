const User = require('../models/user')
const express = require('express')
const router = express.Router()
const db = require('../db')

/** GET / - get list of users.
 *
 * => {users: [{username, first_name, last_name, phone}, ...]}
 *
 **/

router.get('/', async (req,res,next)=>{
    console.log('users-routes')
    let results = await User.all()
    console.log(results,'results/routes')
    res.json({results})
})



/** GET /:username - get detail of users.
 *
 * => {user: {username, first_name, last_name, phone, join_at, last_login_at}}
 *
 **/

router.get('/:username', async (req,res,next)=>{
    console.log(req.params)
    let results = await User.get(req.params.username)
    console.log(results,'results-routes')
    return res.json({results})
})


/** GET /:username/to - get messages to user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 from_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/

router.get('/:username/to', async (req,res,next)=>{
    let results = await User.messagesTo(req.params.username)
    console.log(results,'results-routes')
    return res.json({results})
})


/** GET /:username/from - get messages from user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 to_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/

module.exports = router