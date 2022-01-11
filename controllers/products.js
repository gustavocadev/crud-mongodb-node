const { response } = require("express");
const Product = require("../models/product");

// getProducts - total - paginado - populate
const getProducts = async (req, res) => {
    const [total, products] = await Promise.all([
        Product.countDocuments(),
        Product.find().populate("user", "name").populate("category", "name"),
    ]);

    res.json({ total, products });
};

const getProduct = async (req, res) => {
    const { id } = req.params;

    const product = await Product.findById(id)
        .populate("user", "name")
        .populate("category", "name");

    res.json(product);
};

// create Product
const createProduct = async (req, res = response) => {
    const { state, user, ...body } = req.body;
    const productDB = await Product.findOne({ name: body.name });

    if (productDB) {
        return res.status(400).json({
            msg: `El producto ${productDB.name}, ya existe`,
        });
    }

    const data = {
        ...body,
        name: body.name.toUpperCase(),
        user: req.user._id,
    };

    const newProduct = new Product(data);
    await newProduct.save();

    res.json(newProduct);
};

// update Product
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { state, user, ...data } = req.body;

    if (data.name) {
        data.name = data.name.toUpperCase();
    }
    data.user = req.user._id;
    const product = await Product.findByIdAndUpdate(id, data, {
        new: true,
    });

    res.json(product);
};

// delete Product - state:false
const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const productDeleted = await Product.findByIdAndUpdate(
        id,
        {
            state: false,
        },
        { new: true }
    );

    res.json(productDeleted);
};

module.exports = {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
};
