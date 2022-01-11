const { response } = require("express");
const Category = require("../models/category");

// getCategories - total - paginado - populate

const getCategories = async (req, res) => {
    const [users, total] = await Promise.all([
        Category.countDocuments({ state: true }),
        Category.find({ state: true }).populate("user", "name"),
    ]);

    res.json({ total, users });
};

const getCategory = async (req, res) => {
    const { id } = req.params;

    const category = await Category.findById(id).populate("user", "name");
    res.json({ category });
};

const createCategory = async (req, res = response) => {
    const name = req.body.name.toUpperCase();
    const categoryDB = await Category.findOne({ name });

    if (categoryDB) {
        return res.status(400).json({
            msg: `la categoria ${categoryDB}, ya existe`,
        });
    }
    // Generar la data para guardar
    const data = {
        name,
        user: req.user._id,
    };

    const category = new Category(data);
    // save db
    await category.save();

    res.status(201).json(category);
};

// update category

const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { state, user, ...data } = req.body;

    data.name = data.name.toUpperCase();
    data.user = req.user._id;
    const categoryNameUpdated = await Category.findByIdAndUpdate(id, data, {
        new: true,
    });
    res.json(categoryNameUpdated);
};

// delete category - state:false

const deleteCategory = async (req, res) => {
    const { id } = req.params;
    const categoryDeleted = await Category.findByIdAndUpdate(
        id,
        {
            state: false,
        },
        { new: true }
    );
    res.json(categoryDeleted);
};

module.exports = {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory,
};
