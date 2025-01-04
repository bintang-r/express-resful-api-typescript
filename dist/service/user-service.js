"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const database_1 = require("../application/database");
const response_error_1 = require("../error/response-error");
const user_model_1 = require("../model/user-model");
const user_validation_1 = require("../validation/user-validation");
const validation_1 = require("../validation/validation");
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
class UserService {
    static register(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const registerRequest = validation_1.Validation.validate(user_validation_1.UserValidation.REGISTER, request);
            // check exists username
            const totalUserWithSameUsername = yield database_1.prismaClient.user.count({
                where: {
                    username: registerRequest.username,
                },
            });
            if (totalUserWithSameUsername != 0) {
                throw new response_error_1.ResponseError(400, "Username already exists");
            }
            // hasing password
            registerRequest.password = yield bcrypt_1.default.hash(registerRequest.password, 10);
            // adding data
            const user = yield database_1.prismaClient.user.create({
                data: registerRequest,
            });
            // make a response
            return (0, user_model_1.toUserResponse)(user);
        });
    }
    static login(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const loginRequest = validation_1.Validation.validate(user_validation_1.UserValidation.LOGIN, request);
            // Find user by username
            let user = yield database_1.prismaClient.user.findUnique({
                where: {
                    username: loginRequest.username,
                },
            });
            // Validate user and password
            if (!user ||
                !(yield bcrypt_1.default.compare(loginRequest.password, user.password))) {
                throw new response_error_1.ResponseError(401, "Invalid credentials");
            }
            // Update user's token
            user = yield database_1.prismaClient.user.update({
                where: {
                    username: loginRequest.username,
                },
                data: {
                    token: (0, uuid_1.v4)(),
                },
            });
            return (0, user_model_1.toUserResponse)(user);
        });
    }
    static get(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, user_model_1.toUserResponse)(user);
        });
    }
    static update(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateRequest = validation_1.Validation.validate(user_validation_1.UserValidation.UPDATE, request);
            // check field name
            if (updateRequest.name) {
                user.name = updateRequest.name;
            }
            // hasing password
            if (updateRequest.password) {
                user.password = yield bcrypt_1.default.hash(updateRequest.password, 10);
            }
            const result = yield database_1.prismaClient.user.update({
                where: {
                    username: user.username,
                },
                data: user,
            });
            return (0, user_model_1.toUserResponse)(result);
        });
    }
    static logout(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.prismaClient.user.update({
                where: {
                    username: user.username,
                },
                data: {
                    token: null,
                },
            });
            return (0, user_model_1.toUserResponse)(result);
        });
    }
}
exports.UserService = UserService;
