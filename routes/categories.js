const { Router } = require("express");
const { check } = require("express-validator");
const {
    createCategory,
    getCategory,
    getCategories,
    updateCategory,
    deleteCategory,
} = require("../controllers/categories");
const { existsCategory } = require("../helpers/db-validators");
const { validateJWT } = require("../middlewares");
const { validateInputs } = require("../middlewares/validate-inputs");
const { Category } = require("../models");

const router = Router();

router.get("/", getCategories);

// get by id - public
router.get(
    "/:id",
    [
        check("id", "no es un id de mongo valido").isMongoId(),
        check("id").custom((id) => existsCategory(id)),
        validateInputs,
    ],
    getCategory
);

// create new category private
router.post(
    "/",
    [
        validateJWT,
        check("name", "El nombre es obligatorio").not().isEmpty(),
        validateInputs,
    ],
    createCategory
);

// update private, anybody with a jwt
router.put(
    "/:id",
    [
        validateJWT,
        check("name", "El nombre es obligatorio").not().isEmpty(),
        check("id").custom((id) => existsCategory(id)),
        validateInputs,
    ],
    updateCategory
);

// delete a category - admin
router.delete(
    "/:id",
    [
        validateJWT,
        check("id", "no es un id de mongo valido").isMongoId(),
        check("id").custom((id) => existsCategory(id)),
        validateInputs,
    ],
    deleteCategory
);

module.exports = router;
