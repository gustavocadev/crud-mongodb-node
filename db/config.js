const mongoose = require("mongoose");

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN);
        console.log("connectado 🚀");
    } catch (error) {
        console.log(error);
        throw new Error("Error a la hora de connectar a la base de datos :(");
    }
};

module.exports = {
    dbConnection,
};
