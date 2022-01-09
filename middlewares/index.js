const validateInputs = require("../middlewares/validate-inputs");
const validateJWT = require("../middlewares/validate-jwt");
const validateRoles = require("../middlewares/validate-roles");

module.exports = {
    ...validateInputs,
    ...validateJWT,
    ...validateRoles,
};
