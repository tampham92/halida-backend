
const express = require('express');
const router = express.Router();
const storeCtr = require('../controllers/StoreController');
const authCtr = require('../controllers/AuthController');
const indexCtr = require('../controllers/IndexController')

const entryPoint = '/api';

router.get('/', indexCtr.showStore);

router.post(`${entryPoint}/login`, authCtr.login);

router.get(`${entryPoint}/stores`, storeCtr.getStores);
router.post(`${entryPoint}/stores`, storeCtr.addStore);
router.delete(`${entryPoint}/stores/:id`, storeCtr.deleteStore);
router.put(`${entryPoint}/stores/:id`, storeCtr.updateStore);

module.exports = router;