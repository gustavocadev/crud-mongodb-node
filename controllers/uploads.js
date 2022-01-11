const { uploadFileHelper } = require("../helpers");
const cloudinary = require("cloudinary").v2;

cloudinary.config(process.env.CLOUDINARY_UR);

const path = require("path");
const fs = require("fs");

const { User, Product } = require("../models");

const uploadFile = async (req, res) => {
    try {
        const fileName = await uploadFileHelper(req.files, undefined, "images");

        res.json(fileName);
    } catch (error) {
        res.status(400).json({
            error,
        });
    }
};

const updateImage = async (req, res) => {
    const { id, collection } = req.params;

    let model;

    switch (collection) {
        case "users":
            model = await User.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: "no existe un usuario con el id" + id,
                });
            }
            break;

        case "products":
            model = await Product.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: "no existe un producto con el id" + id,
                });
            }
            break;
        default:
            res.status(500).json({
                msg: "Se me olvido validar eso",
            });
    }

    // clear previous images
    if (model.img) {
        const pathImage = path.join(
            __dirname,
            "../uploads",
            collection,
            model.img
        );
        if (fs.existsSync(pathImage)) {
            fs.unlinkSync(pathImage);
        }
    }

    try {
        const name = await uploadFileHelper(req.files, undefined, collection);
        model.img = name;
        await model.save();
    } catch (error) {
        res.status(400).json({ error });
    }

    res.json(model);
};

const updateImageCloudinary = async (req, res) => {
    const { id, collection } = req.params;

    let model;

    switch (collection) {
        case "users":
            model = await User.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: "no existe un usuario con el id" + id,
                });
            }
            break;

        case "products":
            model = await Product.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: "no existe un producto con el id" + id,
                });
            }
            break;
        default:
            res.status(500).json({
                msg: "Se me olvido validar eso",
            });
    }

    // clear previous images
    if (model.img) {
        // delete
        const arrayOfUrl = model.img.split("/");
        const fullName = arrayOfUrl[arrayOfUrl.length - 1];
        const [public_id] = fullName.split(".");
        await cloudinary.uploader.destroy(public_id);
    }

    const { tempFilePath } = req.files.file;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
    model.img = secure_url;
    await model.save();
    res.json(secure_url);
};

const showImage = async (req, res) => {
    const { id, collection } = req.params;

    let model;

    switch (collection) {
        case "users":
            model = await User.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: "no existe un usuario con el id" + id,
                });
            }
            break;

        case "products":
            model = await Product.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: "no existe un producto con el id" + id,
                });
            }
            break;
        default:
            res.status(500).json({
                msg: "Se me olvido validar eso",
            });
    }

    // clear previous images
    if (model.img) {
        const pathImage = path.join(
            __dirname,
            "../uploads",
            collection,
            model.img
        );
        if (fs.existsSync(pathImage)) {
            res.sendFile(pathImage);
            return;
        }
    }

    const pathImage = path.join(__dirname, "../assets/no-image.jpg");

    res.sendFile(pathImage);
};

module.exports = {
    uploadFile,
    updateImage,
    showImage,
    updateImageCloudinary,
};
