const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../db/config");

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: "/api/auth",
            search: "/api/search",
            users: "/api/users",
            categories: "/api/categories",
            products: "/api/products",
        };

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
        this.app.use(this.paths.auth, require("../routes/auth"));
        this.app.use(this.paths.users, require("../routes/users"));
        this.app.use(this.paths.categories, require("../routes/categories"));
        this.app.use(this.paths.products, require("../routes/products"));
        this.app.use(this.paths.search, require("../routes/search"));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Running :D");
        });
    }
}

module.exports = Server;
