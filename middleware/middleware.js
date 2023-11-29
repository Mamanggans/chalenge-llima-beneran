
const { ResponseTemplate } = require('../helper/template.helper')
const Joi = require('joi');
// function PrintSuccess(req, res, next) {
//     const { } = req.params.id
//     console.log(`nyoba akses`)
//     next()
// }

// function PrintSuccessRoute(req, res, next) {

//     console.log(` berhasil lewat reoute `)
//     next()
// }

function CheckPost(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().alphanum().max(255).required(),
        email: Joi.string().email().required(),
        password: Joi.string().alphanum().required(),
        identity_type: Joi.string().required(),
        identity_number: Joi.string().required(),
        address: Joi.string().required()
    })

    const { error } = schema.validate(req.body)
    if (error) {
        let respErr = ResponseTemplate(null, 'invalid request',
            error.details[0].message, 400)
        res.json(respErr)
        return
    }

    next()
}


function CheckPostAccount(req, res, next) {
    // Definisikan skema validasi menggunakan Joi
    // user_id Int
    // bank_name String
    // Bank_account_money String
    // balance           Int
    const schema = Joi.object({
    bank_name: Joi.string().alphanum().max(255).required(),
      user_id: Joi.number().required(),
      Bank_account_money: Joi.number().required(),
      balance: Joi.number().required(),
    });
  
    // Lakukan validasi terhadap req.body menggunakan skema
    const { error } = schema.validate(req.body);
  
    // Jika terjadi kesalahan validasi, kirim respons error
    if (error) {
      const errorMessage = error.details[0].message;
      const response = {
        success: false,
        message: "Invalid request",
        error: errorMessage,
        statusCode: 400,
      };
  
      res.status(400).json(response);
    } else {
      // Jika validasi berhasil, lanjutkan ke middleware berikutnya
      next();
    }
  }
  


module.exports = {
    CheckPost,
    CheckPostAccount
}