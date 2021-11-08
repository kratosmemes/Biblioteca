const express = require('express');
const router = express.Router();

router.use(require('./registro.route'));
router.use(require('./login.route'));

module.exports = router;