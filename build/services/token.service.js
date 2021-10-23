"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
function generateToken(user) {
    return (0, jsonwebtoken_1.sign)({
        data: JSON.stringify({
            email: user.email,
            _id: user._id,
        }),
    }, process.env.JWT_SECRET, { expiresIn: Number.parseInt(process.env.JWT_EXPIRES_IN) });
}
exports.generateToken = generateToken;
function verifyToken(token) {
    var payload = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
    return typeof payload !== "string" ? payload.data : payload;
}
exports.verifyToken = verifyToken;
