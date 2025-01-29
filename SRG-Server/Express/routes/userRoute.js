const express = require('express');
const { createUser, getAllUser, getUserByEmail } = require('../controllers/userController');
const router = express.Router();

router.post('/create', createUser);
// router.get('/get', getAllUser);
router.post('/login', getUserByEmail);

module.exports = router;