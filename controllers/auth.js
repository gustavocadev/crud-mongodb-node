const bcryptjs = require("bcryptjs");
const { generateJWT } = require("../helpers/generate-jwt");
const UserModel = require("../models/user");

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // verificar si existe el email
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                msg: "Usuario / password no son correctos - email",
            });
        }
        // verificar si el usuario esta activo
        if (!user.state) {
            return res.status(400).json({
                msg: "Usuario / password no son correctos - state: false",
            });
        }
        // Verificar la contraseña
        const validatePassoword = bcryptjs.compareSync(password, user.password);
        if (!validatePassoword) {
            return res.status(400).json({
                msg: "Usuario / password no son correctos - password",
            });
        }

        // Generar el JWT
        const token = await generateJWT(user.id);
        res.json({
            user,
            token,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Hable con el admin",
        });
    }
};

module.exports = { login };
