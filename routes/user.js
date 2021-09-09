const express = require("express");
const router = express.Router();
const user = require("../controller/userController");
const userToken = require("../middleware/checkToken")

// guest route
router.post('/login',user.login)


// authorite routes
router.post('/create',userToken,user.create)
router.put('/',userToken,user.update)
router.post('/fetch',userToken,user.fetch)
router.delete('/delete/:id',userToken,user.delete)






module.exports = router
