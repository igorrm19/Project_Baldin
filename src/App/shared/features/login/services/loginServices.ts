import { servicesHeaders, servicesMessage, servicesURL } from "../constants/servicesConstants";


export class LoginServices {
    private readonly url = servicesURL.url;
    private email: string;
    private password: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }

    private getHeaders(): Record<string, string> {
        const headers: Record<string, string> = {
            'Content-Type': servicesHeaders.contentType,
        };
        const csrfMeta = document.querySelector('meta[name="csrf-token"]');
        if (csrfMeta) {
            headers['X-CSRF-Token'] = csrfMeta.getAttribute('content') ?? '';
        }
        return headers;
    }

    private wipeCredentials() {
        this.email = "";
        this.password = "";
    }

    async getUser() {
        try {
            const response = await fetch(this.url, {
                method: "GET",
                headers: this.getHeaders(),
                credentials: 'include'
            });
            if (!response.ok) {
                throw new Error(servicesMessage.error);
            }
            const payload = await response.json() as unknown;
            return payload;
        } catch (error) {
            console.log(error);
            throw new Error(servicesMessage.error, { cause: error });
        } finally {
            this.wipeCredentials();
        }
    }

    async postUser() {
        try {
            const response = await fetch(this.url, {
                method: "POST",
                headers: this.getHeaders(),
                credentials: 'include',
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
            throw new Error(servicesMessage.error, { cause: error });
        } finally {
            this.wipeCredentials();
        }
    }

    async putUser() {
        try {
            const response = await fetch(this.url, {
                method: "PUT",
                headers: this.getHeaders(),
                credentials: 'include',
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
            throw new Error(servicesMessage.error, { cause: error });
        } finally {
            this.wipeCredentials();
        }
    }

    async deleteUser() {
        try {
            const response = await fetch(this.url, {
                method: "DELETE",
                headers: this.getHeaders(),
                credentials: 'include',
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
            throw new Error(servicesMessage.error, { cause: error });
        } finally {
            this.wipeCredentials();
        }
    }
}
