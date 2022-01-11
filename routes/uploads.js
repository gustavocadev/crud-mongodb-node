const { Router } = require("express");
const { check } = require("express-validator");
const {
    uploadFile,
    updateImage,
    showImage,
    updateImageCloudinary,
} = require("../controllers/uploads");
const { allowedCollections } = require("../helpers");
const { validateFile } = require("../middlewares/validate-file");
const { validateInputs } = require("../middlewares/validate-inputs");

const router = Router();

router.post("/", validateFile, uploadFile);

router.put(
    "/:collection/:id",
    [
        validateFile,
        check("id", "El id debe ser de mongo").isMongoId(),
        check("collection").custom((collection) =>
            allowedCollections(collection, ["users", "products"])
        ),
        validateInputs,
    ],
    updateImageCloudinary
);

router.get(
    "/:collection/:id",
    [
        check("id", "El id debe ser de mongo").isMongoId(),
        check("collection").custom((collection) =>
            allowedCollections(collection, ["users", "products"])
        ),
        validateInputs,
    ],
    showImage
);

module.exports = router;
