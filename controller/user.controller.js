// const { Client } = require("pg");

// const {Prisma, PrismaClient} = require('@prisma/Client')
const {ResponseTemplate} = require('../helper/template.helper')
const {PrismaClient, Prisma} = require('@prisma/client')
const {HashPassword} = require('../helper/hash.pass')
const prisma = new PrismaClient(); 

// function User(req, res){
//     let resp = ResponseTemplate(null, success, null, 200)
//     res.json(resp)
// }

async function UserPost(req, res){
    // const {name, email, password} = req.body
    const { name, email, password, identity_type, identity_number, address } = req.body;
    const hashPass = await HashPassword(password)

  try {
    const newUser = await prisma.User.create({
      data: {
        name,
        email,
        password : hashPass,
      //   Profile: {
      //     create: profile
      //   }
      // },
      // include: {
      //   Profile: true
      // }
        Profile: {
          create: {
            identity_type,
            identity_number,
            address,
          },
        },
      },
    });
    let resp = ResponseTemplate(newUser, "success", null, 200);
    res.json(resp);
    return;
  } catch (error) {
    console.log(error);
    let resp = ResponseTemplate(null, "internal server error", error, 500);
    res.json(resp);
    return;
  }
}
async function GetAllAccount(req, res) {
  // try {
  //   const User = await prisma.user.findMany({
  //     include: {
  //       Profile: true
  //     }
  const { name, email, password, 
    // identity_type, identity_number, address
  } = req.body;
  const payload = {}

  if (name) {
      payload.name = name
  } 
  if (email) {
    payload.email = email
  }
  if (password) {
    payload.password = password
  }
  // if (identity_type) {
  //   payload.identity_type = identity_type
  // }
  // if (identity_number) {
  //   payload.identity_number = identity_number
  // }
  // if (address) {
  //   payload.address = address
  // }
  // const newUser = await prisma.profile.create({
    try {
      // const currentPage = parseInt(page) || 1
      // const itemsPerPage = parseInt(perPage) || 10

      // const totalRecords = await prisma.User.count();
      const user = await prisma.User.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          password: true,
        },
        where: payload,
        });
        let resp = ResponseTemplate(user, "success", null, 200);
        res.json(resp);
        return;
      } catch (error) {
        let resp = ResponseTemplate(null, "internal server error", error, 500);
        res.json(resp);
        return;
      }
    }

    
async function retrieveUserbyId(req, res) {
  const { user_id } = req.params;
  try {
    const userData = await prisma.User.findUnique({
      where: {
        id: Number(user_id),
      },
      include: {
        Profile: true,
      },
    });

    if (!userData) {
      let response = ResponseTemplate(null, "User not found", null, 404);
      res.json(response);
      return;
    }
    let response = ResponseTemplate(userData, "success", null, 200);
    res.json(response);
    return;
  } catch (error) {
    console.log(error);
    let response;
    if (error instanceof Prisma.PrismaClientKnownRequestError) {

      response = ResponseTemplate(null, "Database error", error.message, 500);
    } else {
      response = ResponseTemplate(null, "internal server error", error, 500);
    }
    res.json(response);
    return;
  }
}

async function updateUserById(req, res) {
  try {
    const { name, email, password } = req.body;
    const { user_id } = req.params;

    const payload = {};

    if (!name && !email && !password) {
      return res.status(400).json({
        success: false,
        message: "Bad request. Please provide at least one field to update.",
      });
    }

    if (name) {
      payload.name = name;
    }

    if (email) {
      payload.email = email;
    }

    if (password) {
      const hashPass = await HashPassword(password);
      payload.password = hashPass;
    }

    const updatedUser = await prisma.User.update({
      where: {
        id: Number(user_id),
      },
      data: payload,
    });

    let response = ResponseTemplate(updatedUser, "success", null, 200);
    res.json(response);
    return;
  } catch (error) {
    console.log(error);
    let response;
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      response = ResponseTemplate(null, "Database error", error.message, 500);
    } else {
      response = ResponseTemplate(null, "internal server error", error, 500);
    }
    res.json(response);
    return;
  }
}


async function deleteUser(req, res) {
  
    const { user_id } = req.params;
    try {
    const deletedUser = await prisma.users.delete({
      where: {
        user_id: Number(user_id),
      },
    });

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const response = {
      success: true,
      message: "User deleted successfully.",
      data: deletedUser,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error deleting user:", error);
    const response = {
      success: false,
      message: "Internal server error.",
      error: error.message || "An error occurred while processing your request.",
    };

    res.status(500).json(response);
  }
}
//----------------------------------------------------------------------------------------------------------------//

async function getBankAccounts(req, res) {
  try {
    // user_id Int
    // bank_name String
    // Bank_account_money String
    const { user_id, bank_name, Bank_account_money, balance } = req.query;

    const payload = {};

    if (user_id) {
      payload.user_id = user_id;
    }

    if (bank_name) {
      payload.bank_name = bank_name;
    }

    if (Bank_account_money) {
      payload.Bank_account_money = Bank_account_money;
    }

    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const skip = (page - 1) * perPage;

    const accounts = await prisma.bank_account.findMany({
      skip,
      take: perPage,
      where: payload,
      select: {
        id: true,
        user_id: true,
        bank_name: true,
        Bank_account_money: true,
        balance: true,
      },
    });

    const totalAccounts = await prisma.bank_account.count({ where: payload });
    const totalPages = Math.ceil(totalAccounts / perPage);


    let response = ResponseTemplate(accounts, "success", null, 200);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching bank accounts:", error);
    const response = {
      success: false,
      message: "Internal server error.",
      error: error.message || "An error occurred while processing your request.",
    };

    res.status(500).json(response);
  }
}

async function accountpost(req, res) {
  try {
    // Ambil data dari req.body
    // user_id Int
    // bank_name String
    // Bank_account_money String
    // balance           Int
    const { user_id, bank_name, Bank_account_money, balance } = req.body;

    // Persiapkan payload untuk operasi create
    const payload = {
      user_id: parseInt(user_id),
      bank_name,
      Bank_account_money,
      balance,
    };

    // Lakukan operasi create menggunakan Prisma
    const createdAccount = await prisma.bank_account.create({
      data: payload,
    });

    // Buat respons sukses
    const response = {
      success: true,
      message: "Account created successfully.",
      data: createdAccount,
    };

    // Kirim respons JSON ke client
    res.status(200).json(response);
  } catch (error) {
    // Tangani kesalahan dengan baik
    console.error("Error creating account:", error);
    
    // Buat respons kesalahan
    const response = {
      success: false,
      message: "Internal server error.",
      error: error.message || "An error occurred while processing your request.",
    };

    // Kirim respons JSON ke client
    res.status(500).json(response);
  }
}

async function updateBankAccount(req, res) {
  try {
    // Extract data from req.body and req.params
    const { user_id, bank_name, Bank_account_money, balance } = req.body;
    const { id } = req.params; // Make sure to get the 'id' from req.params

    // Prepare payload for the update operation
    const payload = {};

    // Validate at least one field is provided for update
    if (!user_id && !bank_name && !Bank_account_money && !balance) {
      return res.status(400).json({
        success: false,
        message: "Bad request. Please provide at least one field to update.",
      });
    }

    // Add the provided fields to the payload if available
    if (user_id) {
      payload.user_id = user_id;
    }
    if (bank_name) {
      payload.bank_name = bank_name;
    }
    if (Bank_account_money) {
      payload.Bank_account_money = Bank_account_money;
    }
    if (balance) {
      payload.balance = balance;
    }

    // Perform the update operation using Prisma
    const updatedAccount = await prisma.bank_account.update({
      where: {
        id: Number(user_id), // Add the 'id' parameter to the where clause
      },
      data: payload,
    });

    // Create a success response
    const response = {
      success: true,
      message: "Account updated successfully.",
      data: updatedAccount,
    };

    // Send the JSON response to the client
    res.status(200).json(response);
  } catch (error) {
    // Handle errors appropriately
    console.error("Error updating account:", error);

    // Create an error response
    const response = {
      success: false,
      message: "Internal server error.",
      error: error.message || "An error occurred while processing your request.",
    };

    // Send the JSON response to the client
    res.status(500).json(response);
  }
}

async function removeAccount(req, res) {
  const { user_id } = req.body;


  try {
    const accountData = await prisma.bank_account.delete({
      where: {
        user_id: Number(user_id),
      },
    });

    if (!accountData) {
      let response = ResponseTemplate(null, "Account not found", null, 404);
      res.json(response);
      return;
    }

    let response = ResponseTemplate(accountData, "Operation successful", null, 200);
    res.json(response);
    return;
  } catch (error) {
    console.error(error);
    let response;
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Handle known Prisma errors
      response = ResponseTemplate(null, "Database error", error.message, 500);
    } else {
      // Handle unknown errors
      response = ResponseTemplate(null, "Internal server error", error, 500);
    }
    res.json(response);
    return;
  }
}

//----------------------------------------------------------------------------------------------------------------//
module.exports = { 
    UserPost,
    GetAllAccount,
    retrieveUserbyId,
    updateUserById,
    deleteUser,
    getBankAccounts,
    accountpost,
    updateBankAccount,
    removeAccount
}



