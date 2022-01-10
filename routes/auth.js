const { Router } = require("express");
const { check } = require("express-validator");
const { login, googleSignin } = require("../controllers/auth");
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

router.post(
    "/google",
    [
        check("id_token", "El id token es necesario").not().isEmpty(),
        validateInputs,
    ],
    googleSignin
);

module.exports = router;
