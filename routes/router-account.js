import {
    loginAdmin
} from "../controllers/accounts/admin.js"
import {
    editProdcutById,
    getProducts,
    postProducts,
    deleteProductById,
    getProductById
} from "../controllers/products/product.js";
import express from "express";
import { getCategoris } from "../controllers/categories/category.js";
import multer from "multer";
import { auth } from "../controllers/accounts/auth.js";


const router = express();


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/images");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const filterImage = (req, file, cb) => {
    if (
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpeg"
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const uploadImage = multer({
    storage: storage,
    fileFilter: filterImage,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
});




router.post("/api/v1/login", loginAdmin);

router.use(auth)

// product
router.get("/api/v1/product", getProducts);
router.get("/api/v1/product/:id", getProductById);
router.post("/api/v1/product", uploadImage.single("photo"), postProducts);
router.put("/api/v1/product/:id",uploadImage.single("photo"), editProdcutById);
router.delete("/api/v1/product/:id", deleteProductById);
// categori
router.get("/api/v1/category", getCategoris);


export default router