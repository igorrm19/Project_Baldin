import type { TServicesMessage } from "../@types/TSserviceMessage";

const apiBaseUrl = (import.meta.env['VITE_API_BASE_URL'] as string | undefined) ?? (import.meta.env.PROD ? 'https://project-baldin.vercel.app/api' : 'http://localhost:3000');

export const servicesURL = {
    url: `${apiBaseUrl}/users`,
}

export const servicesMessage: TServicesMessage = {
    success: "User created successfully",
    error: "Operation failed",
    update: "User updated successfully",
    delete: "User deleted successfully",
    get: "User fetched successfully",
}

export const servicesHeaders = {
    contentType: "application/json",
    accept: "application/json",
    authorization: "Bearer "
}
