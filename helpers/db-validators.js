const { Category, Product } = require("../models");
const Role = require("../models/role");

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

const existsCategory = async (id) => {
    const existsCategory = await Category.findById(id);
    if (!existsCategory) {
        throw new Error("El id no existe");
    }
};

const existsProduct = async (id) => {
    const existsProduct = await Product.findById(id);
    if (!existsProduct) {
        throw new Error("El id no existe");
    }
};

/*
validate allowed collections
*/
const allowedCollections = (collection, collections) => {
    const isInclude = collections.includes(collection);
    if (!isInclude) {
        throw new Error(
            `La collection ${collection} no es permitida ${collections}`
        );
    }
    return true;
};

module.exports = {
    isValidRole,
    existsEmail,
    existsUserById,
    existsCategory,
    existsProduct,
    allowedCollections,
};
