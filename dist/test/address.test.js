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
const supertest_1 = __importDefault(require("supertest"));
const test_util_1 = require("./test-util");
const logging_1 = require("../application/logging");
const web_1 = require("../application/web");
describe("GET /api/contacts/:contactId/addresses", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.UserTest.create();
        yield test_util_1.ContactTest.create();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.AddressTest.deleteAll();
        yield test_util_1.ContactTest.deleteAll();
        yield test_util_1.UserTest.delete();
    }));
    it("should be able to create address", () => __awaiter(void 0, void 0, void 0, function* () {
        const contact = yield test_util_1.ContactTest.get();
        const response = yield (0, supertest_1.default)(web_1.web)
            .post(`/api/contacts/${contact.id}/addresses`)
            .set("X-API-TOKEN", "test")
            .send({
            street: "Jalan perintis",
            city: "Makassar",
            province: "Sulsel",
            country: "Indonesia",
            postal_code: "9950",
        });
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.street).toBe("Jalan perintis");
        expect(response.body.data.city).toBe("Makassar");
        expect(response.body.data.province).toBe("Sulsel");
        expect(response.body.data.country).toBe("Indonesia");
        expect(response.body.data.postal_code).toBe("9950");
    }));
    it("should reject create new address if request invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        const contact = yield test_util_1.ContactTest.get();
        const response = yield (0, supertest_1.default)(web_1.web)
            .post(`/api/contacts/${contact.id}/addresses`)
            .set("X-API-TOKEN", "test")
            .send({
            street: "Jalan perintis",
            city: "Makassar",
            province: "Sulsel",
            country: "",
            postal_code: "",
        });
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    }));
    it("should reject create new address if contact is not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const contact = yield test_util_1.ContactTest.get();
        const response = yield (0, supertest_1.default)(web_1.web)
            .post(`/api/contacts/${contact.id + 1}/addresses`)
            .set("X-API-TOKEN", "test")
            .send({
            street: "Jalan perintis",
            city: "Makassar",
            province: "Sulsel",
            country: "Indonesia",
            postal_code: "9950",
        });
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    }));
});
describe("GET /api/contats/:contactId/address/addressId", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.UserTest.create();
        yield test_util_1.ContactTest.create();
        yield test_util_1.AddressTest.create();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.AddressTest.deleteAll();
        yield test_util_1.ContactTest.deleteAll();
        yield test_util_1.UserTest.delete();
    }));
    it("should be able to get address", () => __awaiter(void 0, void 0, void 0, function* () {
        const contact = yield test_util_1.ContactTest.get();
        const address = yield test_util_1.AddressTest.get();
        const response = yield (0, supertest_1.default)(web_1.web)
            .get(`/api/contacts/${contact.id}/addresses/${address.id}`)
            .set("X-API-TOKEN", "test");
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBeDefined();
        expect(response.body.data.street).toBe(address.street);
        expect(response.body.data.city).toBe(address.city);
        expect(response.body.data.province).toBe(address.province);
        expect(response.body.data.country).toBe(address.country);
        expect(response.body.data.postal_code).toBe(address.postal_code);
    }));
    it("should reject get address if address is not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const contact = yield test_util_1.ContactTest.get();
        const address = yield test_util_1.AddressTest.get();
        const response = yield (0, supertest_1.default)(web_1.web)
            .get(`/api/contacts/${contact.id}/addresses/${address.id + 1}`)
            .set("X-API-TOKEN", "test");
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    }));
});
describe("PUT /api/contacts/:contactId/addresses/:addressId", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.UserTest.create();
        yield test_util_1.ContactTest.create();
        yield test_util_1.AddressTest.create();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.AddressTest.deleteAll();
        yield test_util_1.ContactTest.deleteAll();
        yield test_util_1.UserTest.delete();
    }));
    it("should be able to update address", () => __awaiter(void 0, void 0, void 0, function* () {
        const contact = yield test_util_1.ContactTest.get();
        const address = yield test_util_1.AddressTest.get();
        const response = yield (0, supertest_1.default)(web_1.web)
            .put(`/api/contacts/${contact.id}/addresses/${address.id}`)
            .set("X-API-TOKEN", "test")
            .send({
            street: "Jalan Perintis Kemerdekaan",
            city: "Kota Makassar",
            province: "Sulawesi Selatan",
            country: "Indonesia",
            postal_code: "9980",
        });
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBe(address.id);
        expect(response.body.data.street).toBe("Jalan Perintis Kemerdekaan");
        expect(response.body.data.city).toBe("Kota Makassar");
        expect(response.body.data.province).toBe("Sulawesi Selatan");
        expect(response.body.data.country).toBe("Indonesia");
        expect(response.body.data.postal_code).toBe("9980");
    }));
    it("should reject update address if data is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        const contact = yield test_util_1.ContactTest.get();
        const address = yield test_util_1.AddressTest.get();
        const response = yield (0, supertest_1.default)(web_1.web)
            .put(`/api/contacts/${contact.id}/addresses/${address.id}`)
            .set("X-API-TOKEN", "test")
            .send({
            street: "Jalan Perintis Kemerdekaan",
            city: "Kota Makassar",
            province: "Sulawesi Selatan",
            country: "",
            postal_code: "",
        });
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    }));
    it("should reject update address if address is not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const contact = yield test_util_1.ContactTest.get();
        const address = yield test_util_1.AddressTest.get();
        const response = yield (0, supertest_1.default)(web_1.web)
            .put(`/api/contacts/${contact.id}/addresses/${address.id + 1}`)
            .set("X-API-TOKEN", "test")
            .send({
            street: "Jalan Perintis Kemerdekaan",
            city: "Kota Makassar",
            province: "Sulawesi Selatan",
            country: "Indonesia",
            postal_code: "9980",
        });
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    }));
});
describe("DELETE /api/contacts/:contactId/addresses/:addressId", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.UserTest.create();
        yield test_util_1.ContactTest.create();
        yield test_util_1.AddressTest.create();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.AddressTest.deleteAll();
        yield test_util_1.ContactTest.deleteAll();
        yield test_util_1.UserTest.delete();
    }));
    it("should be able to delete address", () => __awaiter(void 0, void 0, void 0, function* () {
        const contact = yield test_util_1.ContactTest.get();
        const address = yield test_util_1.AddressTest.get();
        const response = yield (0, supertest_1.default)(web_1.web)
            .delete(`/api/contacts/${contact.id}/addresses/${address.id}`)
            .set("X-API-TOKEN", "test")
            .send({
            street: "Jalan Perintis Kemerdekaan",
            city: "Kota Makassar",
            province: "Sulawesi Selatan",
            country: "Indonesia",
            postal_code: "9980",
        });
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data).toBe("Ok");
    }));
    it("should reject delete address if address is not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const contact = yield test_util_1.ContactTest.get();
        const address = yield test_util_1.AddressTest.get();
        const response = yield (0, supertest_1.default)(web_1.web)
            .delete(`/api/contacts/${contact.id}/addresses/${address.id + 1}`)
            .set("X-API-TOKEN", "test")
            .send({
            street: "Jalan Perintis Kemerdekaan",
            city: "Kota Makassar",
            province: "Sulawesi Selatan",
            country: "Indonesia",
            postal_code: "9980",
        });
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    }));
    it("should reject delete address if contact is not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const contact = yield test_util_1.ContactTest.get();
        const address = yield test_util_1.AddressTest.get();
        const response = yield (0, supertest_1.default)(web_1.web)
            .delete(`/api/contacts/${contact.id + 1}/addresses/${address.id}`)
            .set("X-API-TOKEN", "test")
            .send({
            street: "Jalan Perintis Kemerdekaan",
            city: "Kota Makassar",
            province: "Sulawesi Selatan",
            country: "Indonesia",
            postal_code: "9980",
        });
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    }));
});
describe("GET /api/contacts/:contactId/addresses", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.UserTest.create();
        yield test_util_1.ContactTest.create();
        yield test_util_1.AddressTest.create();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.AddressTest.deleteAll();
        yield test_util_1.ContactTest.deleteAll();
        yield test_util_1.UserTest.delete();
    }));
    it("should be able to list address", () => __awaiter(void 0, void 0, void 0, function* () {
        const contact = yield test_util_1.ContactTest.get();
        const response = yield (0, supertest_1.default)(web_1.web)
            .get(`/api/contacts/${contact.id}/addresses`)
            .set("X-API-TOKEN", "test");
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(200);
    }));
    it("should reject list address if contact is not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const contact = yield test_util_1.ContactTest.get();
        const response = yield (0, supertest_1.default)(web_1.web)
            .get(`/api/contacts/${contact.id + 1}/addresses`)
            .set("X-API-TOKEN", "test");
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    }));
});
