import { servicesHeaders, servicesMessage, servicesURL } from "../constants/servicesConstants";


export class LoginServices {
    private readonly url = servicesURL.url;
    private email: string;
    private password: string;
    private name: string | undefined;

    constructor(email: string = "", password: string = "", name?: string) {
        this.email = email;
        this.password = password;
        this.name = name;
    }

    private getHeaders(): Record<string, string> {
        const headers: Record<string, string> = {
            'Content-Type': servicesHeaders.contentType,
        };

        const token = localStorage.getItem("token");
        if (typeof token === 'string' && token !== '') {
            headers['Authorization'] = `${servicesHeaders.authorization}${token}`;
        }

        const csrfMeta = document.querySelector('meta[name="csrf-token"]');
        const csrfContent = csrfMeta?.getAttribute('content');
        if (csrfMeta === null || csrfContent === null || csrfContent === "" || csrfContent === undefined || csrfContent === "{{ csrf_token() }}") {
            return headers;
        }
        headers['X-CSRF-Token'] = csrfContent;
        return headers;
    }

    private wipeCredentials(): void {
        this.email = "";
        this.password = "";
    }

    async getUser(): Promise<unknown> {
        try {
            // First try to get from localStorage for immediate result
            const localUser = localStorage.getItem("user");
            if (typeof localUser === 'string' && localUser !== '') {
                return JSON.parse(localUser);
            }

            // Fallback to API if needed
            const meUrl = this.url.replace('/users', '/me');
            const response = await fetch(meUrl, {
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

    async loginUser(): Promise<{ token: string, user: unknown }> {
        try {
            const loginUrl = this.url.replace('/users', '/login');
            const response = await fetch(loginUrl, {
                method: "POST",
                headers: this.getHeaders(),
                credentials: 'include',
                body: JSON.stringify({
                    email: this.email,
                    password: this.password
                }),
            });
            if (!response.ok) {
                const errBody = await response.json().catch(() => ({})) as { error?: string, message?: string };
                throw new Error(errBody.error ?? errBody.message ?? servicesMessage.error);
            }
            const payload = await response.json() as { token: string, user: unknown };
            localStorage.setItem("token", payload.token);
            if (payload.user !== undefined && payload.user !== null) {
                localStorage.setItem("user", JSON.stringify(payload.user));
            }
            return payload;
        } catch (error) {
            console.log(error);
            if (error instanceof Error && error.message !== "Network error") throw error;
            throw new Error(servicesMessage.error, { cause: error });
        } finally {
            this.wipeCredentials();
        }
    }

    async postUser(): Promise<unknown> {
        try {
            const response = await fetch(this.url, {
                method: "POST",
                headers: this.getHeaders(),
                credentials: 'include',
                body: JSON.stringify({
                    name: this.name,
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

    async putUser(): Promise<unknown> {
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

    async deleteUser(): Promise<unknown> {
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
