const { response, request } = require("express");
const bcryptjs = require("bcryptjs");

const UserModel = require("../models/user");

const usersGet = async (req, res = response) => {
    const { limit = 5, since = 0 } = req.query;
    const query = { state: true };

    const [total, users] = await Promise.all([
        UserModel.countDocuments(query),
        UserModel.find(query).skip(Number(since)).limit(Number(limit)),
    ]);
    res.json({ total, users });
};

const usersPut = async (req = request, res = response) => {
    const { id } = req.params;
    const { password, google, ...body } = req.body;

    // todo validate
    if (password) {
        // hash of the password
        const salt = bcryptjs.genSaltSync();
        body.password = bcryptjs.hashSync(password, salt);
    }

    const user = await UserModel.findByIdAndUpdate(id, body);

    res.json(user);
};

const usersPost = async (req, res) => {
    const { name, email, password, role } = req.body;

    const user = new UserModel({
        name,
        email,
        password,
        role,
    });

    // verify in the email exists

    // hash of the password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    // save data
    await user.save();

    res.json(user);
};

const usersDelete = async (req, res) => {
    const { id } = req.params;

    //delete
    // const user = await UserModel.findByIdAndDelete(id);
    const user = await UserModel.findByIdAndUpdate(id, { state: false });
    res.json({
        user,
    });
};

module.exports = {
    usersGet,
    usersDelete,
    usersPut,
    usersPost,
};
