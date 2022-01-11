const { isValidObjectId } = require("mongoose");
const { User, Category, Product } = require("../models");

const allowedCollections = ["users", "categories", "products", "roles"];

const searchUsers = async (term = "", res = "") => {
    const isMongoId = isValidObjectId(term);

    if (isMongoId) {
        const user = await User.findById(term);
        return res.json({
            results: user ? [user] : [],
        });
    }

    const regex = new RegExp(term, "i");

    const users = await User.find({
        $or: [{ name: regex }, { email: regex }],
        $and: [{ state: true }],
    });

    res.json({
        results: users,
    });
};

const searchCategories = async (term = "", res) => {
    const isMongoId = isValidObjectId(term);

    if (isMongoId) {
        const category = await Category.findById(term);
        return res.json({
            results: category ? [product] : [],
        });
    }

    const regex = new RegExp(term, "i");

    const categories = await Category.find({
        $or: [{ name: regex }],
        $and: [{ state: true }],
    });

    res.json(categories);
};

const searchProducts = async (term = "", res) => {
    const isMongoId = isValidObjectId(term);

    if (isMongoId) {
        const product = await Product.findById(term).populate(
            "category",
            "name"
        );
        return res.json({
            results: product ? [product] : [],
        });
    }

    const regex = new RegExp(term, "i");

    const products = await Product.find({
        $or: [{ name: regex }],
        $and: [{ state: true }],
    }).populate("category", "name");

    res.json(products);
};

const search = (req, res) => {
    const { collection, term } = req.params;

    if (!allowedCollections.includes(collection)) {
        return res.status(400).json({
            msg: `las colecciones permitidas son ${allowedCollections}`,
        });
    }
    switch (collection) {
        case "users":
            searchUsers(term, res);
            break;
        case "categories":
            searchCategories(term, res);
            break;
        case "products":
            searchProducts(term, res);
            break;
        case "roles":
            break;
        default:
            res.status(500).json({
                msg: "se le olvidó hacer esta búsqueda",
            });
            break;
    }
};

module.exports = { search };
