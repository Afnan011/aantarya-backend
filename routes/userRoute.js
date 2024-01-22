const express = require("express");
const router = express.Router();
const User = require('../model/user')

const {getUser, getUserById, addUser, deleteUser} = require('../controller/userController')
const {verifyToken} = require('../middleware/validation')

router.get("/", verifyToken, getUser);
router.get('/:id',verifyToken, getUserById)

router.post("/", addUser);

router.delete('/:id', deleteUser)





module.exports = router  