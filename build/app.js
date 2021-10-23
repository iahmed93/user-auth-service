"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = require("mongoose");
var dotenv_1 = require("dotenv");
var morgan_1 = __importDefault(require("morgan"));
var user_route_1 = require("./routes/user.route");
var auth_1 = require("./middlewares/auth");
(0, dotenv_1.config)();
var PORT = process.env.PORT || 8000;
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, morgan_1.default)("combined"));
app.use("/api/user", user_route_1.userRouter);
app.use(auth_1.auth);
var url = process.env.DB_URL;
var connectionOptions = {};
(0, mongoose_1.connect)(url, connectionOptions)
    .then(function () {
    console.log("Connected to database");
})
    .catch(function (err) { return console.log(err); });
app.listen(PORT, function () {
    console.log("Server is running at localhost:" + PORT);
});
