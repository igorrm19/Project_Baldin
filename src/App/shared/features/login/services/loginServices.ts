import { servicesHeaders, servicesMessage, servicesURL } from "../constants/servicesConstants";
import type { ILoginServices } from "../@types/servicesTypes";

export class LoginServices implements ILoginServices {
    private readonly url = servicesURL.url;
    public email: string;
    public password: string;


    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }

    async getUser() {
        try {
            const response = await fetch(this.url);
            if (!response.ok) {
                throw new Error(servicesMessage.error);
            }
            const payload = await response.json() as unknown;
            return payload;
        } catch (error) {
            console.log(error);
            throw new Error(servicesMessage.error);
        }
    }

    async postUser() {
        try {
            const response = await fetch(this.url, {
                method: "POST",
                headers: {
                    'Content-Type': servicesHeaders.contentType,
                },
                body: JSON.stringify({
                    email: this.email,
                    password: this.password
                }),
            });
            if (!response.ok) {
                throw new Error(servicesMessage.error);
            }
            const payload = await response.json() as unknown;
            return payload;
        } catch (error) {
            console.log(error);
            throw new Error(servicesMessage.error);
        }
    }

    async putUser() {
        try {
            const response = await fetch(this.url, {
                method: "PUT",
                headers: {
                    'Content-Type': servicesHeaders.contentType,
                },
                body: JSON.stringify({
                    email: this.email,
                    password: this.password
                }),
            });
            if (!response.ok) {
                throw new Error(servicesMessage.error);
            }
            const payload = await response.json() as unknown;
            return payload;
        } catch (error) {
            console.log(error);
            throw new Error(servicesMessage.error);
        }
    }

    async deleteUser() {
        try {
            const response = await fetch(this.url, {
                method: "DELETE",
                headers: {
                    'Content-Type': servicesHeaders.contentType,
                },
                body: JSON.stringify({
                    email: this.email,
                    password: this.password
                }),
            });
            if (!response.ok) {
                throw new Error(servicesMessage.error);
            }
            const payload = await response.json() as unknown;
            return payload;
        } catch (error) {
            console.log(error);
            throw new Error(servicesMessage.error);
        }
    }
}
