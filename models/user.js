const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "El nombre es requerido"],
    },
    email: {
        type: String,
        required: [true, "El correo es obligatorio"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatorio"],
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        // enum: ["ADMIN_ROLE", "USER_ROLE"],
    },
    state: {
        type: Boolean,
        default: true,
    },
    google: {
        type: String,
        default: false,
    },
});

UserSchema.methods.toJSON = function () {
    const { __v, password, ...user } = this.toObject();
    return user;
};

const UserModel = model("Usuario", UserSchema);

module.exports = UserModel;
