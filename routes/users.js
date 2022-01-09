const { Router } = require("express");
const { check } = require("express-validator");
const {
    usersGet,
    usersDelete,
    usersPut,
    usersPost,
} = require("../controllers/users");

const {
    isValidRole,
    existsEmail,
    existsUserById,
} = require("../helpers/db-validators");

const {
    validateInputs,
    validateJWT,
    isAdminRole,
    hasRole,
} = require("../middlewares");

const router = Router();

router.get("/", usersGet);

router.put(
    "/:id",
    [
        check("id", "No es un id valido").isMongoId(),
        check("id").custom((id) => existsUserById(id)),
        check("role").custom((role) => isValidRole(role)),
        validateInputs,
    ],
    usersPut
);

router.post(
    "/",
    [
        check("name", "el nombre es obligatorio").not().isEmpty(),
        check(
            "password",
            "el password es obligatorio y más de 6 letras"
        ).isLength({ min: 6 }),
        check("email", "el correo no es válido").isEmail(),
        // check("role", "No es un rol valido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
        check("role").custom((role) => isValidRole(role)),
        check("email").custom((email) => existsEmail(email)),
        validateInputs,
    ],
    usersPost
);

router.delete(
    "/:id",
    [
        validateJWT,
        isAdminRole,
        hasRole("ADMIN_ROLE", "VENTAS_ROL"),
        check("id", "No es un id valido").isMongoId(),
        check("id").custom((id) => existsUserById(id)),
        validateInputs,
    ],
    usersDelete
);

module.exports = router;
