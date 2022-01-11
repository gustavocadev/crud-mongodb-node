const validateFile = (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        res.status(400).json({ msg: "Mo hay archivos subidos - validateFile" });
        return;
    }

    next();
};

module.exports = {
    validateFile,
};
