"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toAddressResponse = toAddressResponse;
function toAddressResponse(address) {
    return {
        id: address.id,
        street: address.street,
        city: address.city,
        province: address.province,
        country: address.country,
        postal_code: address.postal_code,
    };
}
