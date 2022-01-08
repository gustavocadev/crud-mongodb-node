const Role = require("../models/role");
const UserModel = require("../models/user");

const isValidRole = async (role = "") => {
    console.log(role);
    const existsRole = await Role.findOne({ role });
    console.log(existsRole);
    if (!existsRole) {
        throw new Error(
            `el rol ${role} no está registrado en la base de datos :(`
        );
    }
};

const existsEmail = async (email = "") => {
    const existsEmail = await UserModel.findOne({ email });
    if (existsEmail) {
        throw new Error("El correo ya está registrado");
    }
};

const existsUserById = async (id) => {
    const existsUser = await UserModel.findById(id);
    if (!existsUser) {
        throw new Error("El id no existe");
    }
};

module.exports = {
    isValidRole,
    existsEmail,
    existsUserById,
};
