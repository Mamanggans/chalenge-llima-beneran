const express = require('express')
const route = express.Router()
const userRoute = require('./user.route')
const accountRoute = require("./akun.routes");
const morgan = require('morgan')

route.use(morgan('dev'))

// router.get('/ping', (req, res) => {
//     const pong = 'PING' || 'void'
//     res.render('index', {
//         pong
//     })
//     return
// })

// router.post('/signup', (req, res) => {
//     const pong = 'PING' || 'void'
//     res.render('register')
//     return
// })

// router.use('/user', userRoute)
route.use("/api/v1/users", userRoute);
route.use("/api/v1/accounts", accountRoute);





module.exports = route