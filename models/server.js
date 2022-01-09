const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../db/config");

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.usersPath = "/api/users";
        this.authPath = "/api/auth";
        // connect dbConnection
        this.connectDB();
        // middleswares
        this.middleswares();

        // routes of my app (gonna be excuted once the class is used)
        this.routes();
    }

    async connectDB() {
        await dbConnection();
    }

    middleswares() {
        // dir public
        this.app.use(express.static("public"));
        // cors
        this.app.use(cors());
        // allow json
        this.app.use(express.json());
    }

    routes() {
        this.app.use(this.authPath, require("../routes/auth"));
        this.app.use(this.usersPath, require("../routes/users"));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Running :D");
        });
    }
}

module.exports = Server;
