import type { TServicesMessage } from "../@types/TSserviceMessage";

export const servicesURL = {
    url: 'http://localhost:3000/users',
}

export const servicesMessage: TServicesMessage = {
    success: "User created successfully",
    error: "Failed to create user",
    update: "User updated successfully",
    delete: "User deleted successfully",
    get: "User fetched successfully",
}

export const servicesHeaders = {
    contentType: "application/json",
    accept: "application/json",
    authorization: "Bearer "
}
