"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
var mongoose_1 = require("mongoose");
var schema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    tokens: [{ type: String }],
    role: { type: mongoose_1.Schema.Types.ObjectId },
});
var UserModel = (0, mongoose_1.model)("User", schema);
exports.UserModel = UserModel;
