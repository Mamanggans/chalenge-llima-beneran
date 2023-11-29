const express = require('express')
const route = express.Router()
const { getBankAccounts, accountpost, updateBankAccount, removeAccount } = require('../controller/user.controller')
const { CheckPostAccount } = require('../middleware/middleware')

route.get('/', getBankAccounts)
route.post('/', CheckPostAccount, accountpost)
route.put('/:id', updateBankAccount)
route.delete('/:id', removeAccount)


module.exports = route