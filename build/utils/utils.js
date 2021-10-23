"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateHttpResponse = exports.compareHash = exports.hashedText = exports.validateEmail = void 0;
var bcrypt_1 = require("bcrypt");
function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
exports.validateEmail = validateEmail;
function hashedText(password, saltRounds) {
    return (0, bcrypt_1.hashSync)(password, saltRounds);
}
exports.hashedText = hashedText;
function compareHash(plainText, hashedText) {
    return (0, bcrypt_1.compareSync)(plainText, hashedText);
}
exports.compareHash = compareHash;
function generateHttpResponse(code, msg, payload) {
    if (payload === void 0) { payload = null; }
    return {
        code: code,
        msg: msg,
        payload: payload,
    };
}
exports.generateHttpResponse = generateHttpResponse;
