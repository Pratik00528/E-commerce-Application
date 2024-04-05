import express from "express";
import { isAdmin, requireSignIn } from './../middlewares/authMiddleware.js';
import { createProductController, deleteProductController, getProductController, getSingleProductController, productFiltersController, productPhotoController, updateProductController } from "../controllers/productController.js";
import formidable from "express-formidable"; // Package for parsing images

const router = express.Router();

// Routes
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController);

// Get all products
router.get('/get-product', getProductController);

// Get single product
router.get('/get-product/:slug', getSingleProductController)

// Get product photo
router.get('/product-photo/:pid', productPhotoController)

// Delete product
router.delete('/delete-product/:pid', deleteProductController)

// Update product
router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(), updateProductController);

// Filter product
router.post('/product-filters', productFiltersController);

export default router; 