import supertest from "supertest";
import { AddressTest, ContactTest, UserTest } from "./test-util";
import { logger } from "../application/logging";
import { web } from "../application/web";

describe("GET /api/contacts/:contactId/addresses", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.create();
  });

  afterEach(async () => {
    await AddressTest.deleteAll();
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("should be able to create address", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .post(`/api/contacts/${contact.id}/addresses`)
      .set("X-API-TOKEN", "test")
      .send({
        street: "Jalan perintis",
        city: "Makassar",
        province: "Sulsel",
        country: "Indonesia",
        postal_code: "9950",
      });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.street).toBe("Jalan perintis");
    expect(response.body.data.city).toBe("Makassar");
    expect(response.body.data.province).toBe("Sulsel");
    expect(response.body.data.country).toBe("Indonesia");
    expect(response.body.data.postal_code).toBe("9950");
  });

  it("should reject create new address if request invalid", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .post(`/api/contacts/${contact.id}/addresses`)
      .set("X-API-TOKEN", "test")
      .send({
        street: "Jalan perintis",
        city: "Makassar",
        province: "Sulsel",
        country: "",
        postal_code: "",
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it("should reject create new address if contact is not found", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .post(`/api/contacts/${contact.id + 1}/addresses`)
      .set("X-API-TOKEN", "test")
      .send({
        street: "Jalan perintis",
        city: "Makassar",
        province: "Sulsel",
        country: "Indonesia",
        postal_code: "9950",
      });

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });
});

describe("GET /api/contats/:contactId/address/addressId", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.create();
    await AddressTest.create();
  });

  afterEach(async () => {
    await AddressTest.deleteAll();
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("should be able to get address", async () => {
    const contact = await ContactTest.get();
    const address = await AddressTest.get();

    const response = await supertest(web)
      .get(`/api/contacts/${contact.id}/addresses/${address.id}`)
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.street).toBe(address.street);
    expect(response.body.data.city).toBe(address.city);
    expect(response.body.data.province).toBe(address.province);
    expect(response.body.data.country).toBe(address.country);
    expect(response.body.data.postal_code).toBe(address.postal_code);
  });

  it("should reject get address if address is not found", async () => {
    const contact = await ContactTest.get();
    const address = await AddressTest.get();

    const response = await supertest(web)
      .get(`/api/contacts/${contact.id}/addresses/${address.id + 1}`)
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });
});

describe("PUT /api/contacts/:contactId/addresses/:addressId", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.create();
    await AddressTest.create();
  });

  afterEach(async () => {
    await AddressTest.deleteAll();
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("should be able to update address", async () => {
    const contact = await ContactTest.get();
    const address = await AddressTest.get();

    const response = await supertest(web)
      .put(`/api/contacts/${contact.id}/addresses/${address.id}`)
      .set("X-API-TOKEN", "test")
      .send({
        street: "Jalan Perintis Kemerdekaan",
        city: "Kota Makassar",
        province: "Sulawesi Selatan",
        country: "Indonesia",
        postal_code: "9980",
      });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBe(address.id);
    expect(response.body.data.street).toBe("Jalan Perintis Kemerdekaan");
    expect(response.body.data.city).toBe("Kota Makassar");
    expect(response.body.data.province).toBe("Sulawesi Selatan");
    expect(response.body.data.country).toBe("Indonesia");
    expect(response.body.data.postal_code).toBe("9980");
  });

  it("should reject update address if data is invalid", async () => {
    const contact = await ContactTest.get();
    const address = await AddressTest.get();

    const response = await supertest(web)
      .put(`/api/contacts/${contact.id}/addresses/${address.id}`)
      .set("X-API-TOKEN", "test")
      .send({
        street: "Jalan Perintis Kemerdekaan",
        city: "Kota Makassar",
        province: "Sulawesi Selatan",
        country: "",
        postal_code: "",
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it("should reject update address if address is not found", async () => {
    const contact = await ContactTest.get();
    const address = await AddressTest.get();

    const response = await supertest(web)
      .put(`/api/contacts/${contact.id}/addresses/${address.id + 1}`)
      .set("X-API-TOKEN", "test")
      .send({
        street: "Jalan Perintis Kemerdekaan",
        city: "Kota Makassar",
        province: "Sulawesi Selatan",
        country: "Indonesia",
        postal_code: "9980",
      });

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });
});

describe("DELETE /api/contacts/:contactId/addresses/:addressId", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.create();
    await AddressTest.create();
  });

  afterEach(async () => {
    await AddressTest.deleteAll();
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("should be able to delete address", async () => {
    const contact = await ContactTest.get();
    const address = await AddressTest.get();

    const response = await supertest(web)
      .delete(`/api/contacts/${contact.id}/addresses/${address.id}`)
      .set("X-API-TOKEN", "test")
      .send({
        street: "Jalan Perintis Kemerdekaan",
        city: "Kota Makassar",
        province: "Sulawesi Selatan",
        country: "Indonesia",
        postal_code: "9980",
      });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data).toBe("Ok");
  });

  it("should reject delete address if address is not found", async () => {
    const contact = await ContactTest.get();
    const address = await AddressTest.get();

    const response = await supertest(web)
      .delete(`/api/contacts/${contact.id}/addresses/${address.id + 1}`)
      .set("X-API-TOKEN", "test")
      .send({
        street: "Jalan Perintis Kemerdekaan",
        city: "Kota Makassar",
        province: "Sulawesi Selatan",
        country: "Indonesia",
        postal_code: "9980",
      });

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });

  it("should reject delete address if contact is not found", async () => {
    const contact = await ContactTest.get();
    const address = await AddressTest.get();

    const response = await supertest(web)
      .delete(`/api/contacts/${contact.id + 1}/addresses/${address.id}`)
      .set("X-API-TOKEN", "test")
      .send({
        street: "Jalan Perintis Kemerdekaan",
        city: "Kota Makassar",
        province: "Sulawesi Selatan",
        country: "Indonesia",
        postal_code: "9980",
      });

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });
});

describe("GET /api/contacts/:contactId/addresses", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.create();
    await AddressTest.create();
  });

  afterEach(async () => {
    await AddressTest.deleteAll();
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("should be able to list address", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .get(`/api/contacts/${contact.id}/addresses`)
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
  });

  it("should reject list address if contact is not found", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .get(`/api/contacts/${contact.id + 1}/addresses`)
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });
});
