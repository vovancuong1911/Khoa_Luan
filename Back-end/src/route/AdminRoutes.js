const express = require('express');
const router = express.Router();

const ControllerAdmin = require('../controller/ControllerAdmin/ControllerAdmin');
const ControllerJwt = require('../controller/jwt/ControllerJWT');

router.get('/api/auth/me', ControllerAdmin.GetDataAuth);

router.get('/api/getorder', ControllerAdmin.GetDataOrder);
router.get('/api/datauser', ControllerAdmin.GetUser);
router.post('/api/addproduct', ControllerAdmin.AddProduct);
router.post('/api/deleteproduct', ControllerAdmin.DeleteProduct);
router.post('/api/editproduct', ControllerAdmin.EditProduct);
router.post('/api/checkproduct', ControllerAdmin.checkProduct);

module.exports = router;
