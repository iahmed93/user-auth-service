"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt_1 = require("bcrypt");
var utils_1 = require("./utils");
describe("utils", function () {
    describe("validateEmail()", function () {
        test("should return true for valid email format", function () {
            var email = "test@test.com";
            var actual = (0, utils_1.validateEmail)(email);
            expect(actual).toBe(true);
        });
        test("should return false for invalid domain format", function () {
            var email = "test@tes";
            var actual = (0, utils_1.validateEmail)(email);
            expect(actual).toBe(false);
        });
        test("should return false for missing @ sign", function () {
            var email = "testtest.com";
            var actual = (0, utils_1.validateEmail)(email);
            expect(actual).toBe(false);
        });
    });
    describe("generateVerificationCode()", function () {
        test("should return code fo 4 digits", function () {
            var actual = (0, utils_1.generateVerificationCode)(4);
            expect(actual.length).toBe(4);
            expect(actual).toMatch(/[0-9]*/);
        });
    });
    describe("hashedText()", function () {
        test("should return hashed text", function () {
            var actual = (0, utils_1.hashedText)("test", 10);
            expect(actual).toContain("$2b$10$");
        });
    });
    describe("compareHash()", function () {
        test("should return true if the plainText is the hashedText", function () {
            var plainText = "test";
            var hashedText = (0, bcrypt_1.hashSync)("test", 10);
            var actual = (0, utils_1.compareHash)(plainText, hashedText);
            expect(actual).toBe(true);
        });
        test("should return false if the plainText is not the hashedText", function () {
            var plainText = "test";
            var hashedText = (0, bcrypt_1.hashSync)("test", 10);
            plainText = "test1";
            var actual = (0, utils_1.compareHash)(plainText, hashedText);
            expect(actual).toBe(false);
        });
    });
});
