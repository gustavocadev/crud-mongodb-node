const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");

const validateJWT = async (req, res, next) => {
    const token = req.header("x-token");

    if (!token) {
        return res.status(401).json({
            msg: "No hay token en la petición",
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY);

        const user = await UserModel.findById(uid);

        if (!user) {
            return res.status(401).json({
                msg: "Token no valido - usuario no existen en DB",
            });
        }

        // verificar si el uid tiene el estado en false
        if (!user.state) {
            return res.status(401).json({
                msg: "Token no valido - usuario con estado: false",
            });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: " Token no valido",
        });
    }
};

module.exports = { validateJWT };
