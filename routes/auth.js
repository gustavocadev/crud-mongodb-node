const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers/auth");
const { validateInputs } = require("../middlewares/validate-inputs");

const router = Router();

router.post(
    "/login",
    [
        check("email", "El correo es obligatorio").isEmail(),
        check("password", "La contraseña es obligatoria").not().isEmpty(),
        validateInputs,
    ],
    login
);

module.exports = router;
