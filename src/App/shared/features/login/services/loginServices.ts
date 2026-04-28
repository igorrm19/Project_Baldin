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
        const csrfContent = csrfMeta?.getAttribute('content');
        if (csrfMeta === null || csrfContent === null || csrfContent === "" || csrfContent === undefined) {
            throw new Error("Sessão Expirada. Atualize a página.");
        }
        headers['X-CSRF-Token'] = csrfContent;
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
                const errBody = await response.json().catch(() => ({})) as { message?: string };
                throw new Error(errBody.message ?? servicesMessage.error);
            }
            const payload = await response.json() as unknown;
            return payload;
        } catch (error) {
            console.log(error);
            if (error instanceof Error && error.message !== "Network error") throw error;
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
                const errBody = await response.json().catch(() => ({})) as { message?: string };
                throw new Error(errBody.message ?? servicesMessage.error);
            }
            const payload = await response.json() as unknown;
            return payload;
        } catch (error) {
            console.log(error);
            if (error instanceof Error && error.message !== "Network error") throw error;
            // istanbul ignore next
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
                const errBody = await response.json().catch(() => ({})) as { message?: string };
                throw new Error(errBody.message ?? servicesMessage.error);
            }
            const payload = await response.json() as unknown;
            return payload;
        } catch (error) {
            console.log(error);
            if (error instanceof Error && error.message !== "Network error") throw error;
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
                const errBody = await response.json().catch(() => ({})) as { message?: string };
                throw new Error(errBody.message ?? servicesMessage.error);
            }
            const payload = await response.json() as unknown;
            return payload;
        } catch (error) {
            console.log(error);
            if (error instanceof Error && error.message !== "Network error") throw error;
            throw new Error(servicesMessage.error, { cause: error });
        } finally {
            this.wipeCredentials();
        }
    }
}
