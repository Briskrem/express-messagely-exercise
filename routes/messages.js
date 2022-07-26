const express = require('express')
const router = express.Router()
const db = require('../db')
const Message = require('../models/message')


/** GET /:id - get detail of message.
 *
 * => {message: {id,
 *               body,
 *               sent_at,
 *               read_at,
 *               from_user: {username, first_name, last_name, phone},
 *               to_user: {username, first_name, last_name, phone}}
 *
 * Make sure that the currently-logged-in users is either the to or from user.
 *
 **/

 router.get('/:id', async (req, res, next)=>{
    console.log(req.params.id, 'reqqqy')
    const messages = await Message.get(req.params.id)
    console.log(messages, 'messages')
    return res.json({messages})
})



/** POST / - post message.
 *
 * {to_username, body} =>
 *   {message: {id, from_username, to_username, body, sent_at}}
 *
 **/

router.post('/', async(req, res, next)=>{
    let {from_username, to_username, body} = req.body
    let results = await Message.create({from_username, to_username, body})
    return res.json({results})
})


/** POST/:id/read - mark message as read:
 *
 *  => {message: {id, read_at}}
 *
 * Make sure that only the intended recipient can mark as read.
 *
 **/

router.post('/:id/read', async (req,res,next)=>{
    let id = req.params.id
    let results = await Message.markRead(id)
    console.log(results,'results')
    return res.json({results})
})

module.exports = router;