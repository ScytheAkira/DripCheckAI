import express from "express";
import formidableMiddleware from "express-formidable";

const router = express.Router();

// Import controllers
import { addProduct,
    updateProductDetails,
    removeProduct,
    fetchProducts,
    fetchProductById,
    fetchAllProducts,
    fetchNewProducts,
    filterProducts
} from "../controllers/productController.js";

// Import middleware
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js"; // Correct filename capitalization

// Define routes
router.post("/test", (req, res) => {
    res.send("Temporary route works!");
});
router
    .route('/')
    .get(fetchProducts)
    .post(authenticate, authorizeAdmin, formidableMiddleware(), addProduct); // Correct route definition

router.route('/allproducts').get(fetchAllProducts)
router.get('/new', fetchNewProducts)
router
    .route('/:id')
    .get(fetchProductById)
    .put(authenticate, authorizeAdmin, formidableMiddleware(), updateProductDetails)
    .delete(authenticate, authorizeAdmin, removeProduct)

    router
        .route('/filtered-products')
        .post(filterProducts);
export default router;
