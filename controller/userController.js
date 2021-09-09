const {
  create,
  update,
  login,
  fetch,
  deleteUser
} = require("../services/user/userService")

module.exports = {    

  create: async(req, res) => {
    try {
      ReS(res,await create(req),200)
    } catch (error) {
      ReE(res, error, 422, "userController Controller >>> create method");
    }
  },
  update:async(req, res) => {
    try {
      ReS(res,await update(req),200)
    } catch (error) {
      ReE(res, error, 422, "userController Controller >>> update method");
    }
  },
  login: async(req, res) => {
    try {
      ReS(res,await login(req),200)
    } catch (error) {
      ReE(res, error, 422, "userController Controller >>> login method");
    }
  },
  fetch: async(req, res) => {
    try {
      ReS(res,await fetch(req),200)
    } catch (error) {
      ReE(res, error, 422, "userController Controller >>> fetch method");
    }
  },
  delete: async(req, res) => {
    try {
      ReS(res,await deleteUser(req),200)
    } catch (error) {
      ReE(res, error, 422, "userController Controller >>> delete method");
    }
  },
}