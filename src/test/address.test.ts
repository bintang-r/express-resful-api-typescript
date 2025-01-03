import supertest from "supertest";
import { AddressTest, ContactTest, UserTest } from "./test-util";
import { logger } from "../application/logging";
import { web } from "../application/web";

describe("GET /api/contacts/:contactId(//d+)/addresses", () => {
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
