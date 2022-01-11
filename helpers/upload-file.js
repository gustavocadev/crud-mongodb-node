const { v4: uuidv4 } = require("uuid");

const path = require("path");

const uploadFileHelper = (
    files,
    allowedExtensions = ["png", "jpg", "jpeg", "gif"],
    directory = ""
) => {
    return new Promise((resolve, reject) => {
        const { file } = files;

        const nameCutOff = file.name.split(".");
        const extension = nameCutOff[nameCutOff.length - 1];

        // const allowedExtensions = ["png", "jpg", "jpeg", "gif"];
        if (!allowedExtensions.includes(extension)) {
            return reject(
                `La extension ${extension} no es valida, las validas son: ${allowedExtensions}`
            );
        }

        const temporalName = `${uuidv4()}.${extension}`;
        const uploadPath = path.join(
            __dirname,
            "../uploads/",
            directory,
            temporalName
        );

        file.mv(uploadPath, (err) => {
            if (err) {
                return reject(err);
            }

            return resolve(temporalName);
        });
    });
};

module.exports = {
    uploadFileHelper,
};
