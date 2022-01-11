const { Router } = require("express");
const { check } = require("express-validator");
const {
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    getProducts,
} = require("../controllers/products");
const { existsProduct } = require("../helpers/db-validators");
const { validateJWT } = require("../middlewares");
const { validateInputs } = require("../middlewares/validate-inputs");

const router = Router();

router.get("/", getProducts);

// get by id - public
router.get(
    "/:id",
    [
        check("id", "no es un id de mongo valido").isMongoId(),
        check("id").custom((id) => existsProduct(id)),
        validateInputs,
    ],
    getProduct
);

// create new category private
router.post(
    "/",
    [
        validateJWT,
        check("name", "El nombre es obligatorio").not().isEmpty(),
        validateInputs,
    ],
    createProduct
);

// update private, anybody with a jwt
router.put(
    "/:id",
    [
        validateJWT,
        check("category", "No es un id de mongo").isMongoId(),
        check("id").custom((id) => existsProduct(id)),
        validateInputs,
    ],
    updateProduct
);

// delete a category - admin
router.delete(
    "/:id",
    [
        validateJWT,
        check("id", "no es un id de mongo valido").isMongoId(),
        check("id").custom((id) => existsProduct(id)),
        validateInputs,
    ],
    deleteProduct
);

module.exports = router;
