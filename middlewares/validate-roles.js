const isAdminRole = (req, res, next) => {
    if (!req.user) {
        return res.status(500).json({
            msg: "se quiere verificar el rol sin validar el token primero",
        });
    }
    const { role, name } = req.user;

    if (role !== "ADMIN_ROLE") {
        return res.status(401).json({
            msg: `${name} no es administrador`,
        });
    }

    next();
};

const hasRole = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(500).json({
                msg: "se quiere verificar el rol sin validar el token primero",
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(401).json({
                msg: `el servicio require uno de estos dos: ${roles}`,
            });
        }
        next();
    };
};

module.exports = {
    isAdminRole,
    hasRole,
};
