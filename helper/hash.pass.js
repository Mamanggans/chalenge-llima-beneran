const bcrypt = require('bcrypt')

function HashPassword(password){

    const saltParse = parseInt(process.env.SALT_ROUNDS)
    const salt = bcrypt.genSaltSync(saltParse)
    const hash = bcrypt.hashSync(password, salt)
    return hash
}




module.exports ={
    HashPassword,
}