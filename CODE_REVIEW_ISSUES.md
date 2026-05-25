# Code Review Issues

The following technical issues were identified during the static analysis of the codebase. You can copy the content of each issue and create them in the GitHub repository.

---

## Issue 1: [Security] JWT Tokens stored in localStorage

### Description
In `src/App/shared/features/login/services/loginServices.ts`, the authentication tokens (`payload.token`) and user data are being stored directly in `localStorage` inside the `loginUser` method.

Storing sensitive data such as JWTs in `localStorage` exposes the application to Cross-Site Scripting (XSS) attacks. If an attacker manages to inject malicious JavaScript into the application, they can easily extract the token and hijack the user session.

### Impact
High. Session hijacking via XSS.

### Proposed Solution
1. Refactor the backend authentication flow to send the JWT inside an `httpOnly`, `Secure`, and `SameSite` cookie instead of returning it in the JSON payload.
2. Remove `localStorage.setItem("token", payload.token)` from the frontend `LoginServices`.
3. The frontend should rely on the browser automatically attaching the `httpOnly` cookie in subsequent requests (using `credentials: 'include'`, which is already configured in the fetch calls).

---

## Issue 2: [Bug/Logic] Conflicting Authorization Logic in `updateUser` Endpoint

### Description
There is a logic flaw regarding role-based access control (RBAC) in the update user flow. 
In `backEnd/src/routes/user.router.ts`, the `PUT /users/:id` route is protected by the `isAdmin` middleware:
`router.put('/users/:id', userUpdateLimiter, validityUpdateUser, auth, isAdmin, updateUser);`

However, inside `backEnd/src/controller/user.controller.ts` (in the `updateUser` function), there is a strict check verifying if the requesting user is the owner of the profile:
`if (req.params['id'] !== (req as Request & { user?: { id: string } }).user?.id) { res.status(403).json({ error: "Access forbidden" }); return; }`

Because of these two combined constraints, **only an Admin can update a profile, and the Admin can ONLY update their own profile**. Normal users cannot update their profiles (due to `isAdmin`), and Admins cannot update other users' profiles (due to the ID check).

### Impact
High. It prevents the intended functionality of either users updating their own data or admins managing users.

### Proposed Solution
Determine the exact business requirement:
- **If users should update their own profiles:** Remove the `isAdmin` middleware from the `PUT /users/:id` route.
- **If admins should update any profile:** Keep `isAdmin`, but remove or modify the ID check inside the controller to allow bypassing if the user role is `admin`.

Example fix in `user.controller.ts`:
```typescript
const isOwner = req.params['id'] === req.user?.id;
const isAdmin = req.user?.role === 'admin';

if (!isOwner && !isAdmin) {
    res.status(403).json({ error: "Access forbidden" });
    return;
}
```

---

## Issue 3: [Architecture] Repetitive Fetch Logic and Error Handling in `LoginServices`

### Description
The `LoginServices` class in `src/App/shared/features/login/services/loginServices.ts` contains significant code duplication. The methods `getUser`, `loginUser`, `postUser`, `putUser`, and `deleteUser` all repeat the same structure:
1. Setting up the URL.
2. Invoking `fetch` with `credentials` and `headers`.
3. Catching non-ok responses and parsing error messages.
4. Catching and re-throwing network exceptions.
5. Calling `this.wipeCredentials()` in `finally`.

### Impact
Low/Medium. High maintenance overhead. Any changes to the API communication layer (e.g., adding a new header, changing error formats) will require modifications across 5 different methods.

### Proposed Solution
Extract the base fetch logic into a private helper method inside `LoginServices` or a separate `HttpClient` service.

```typescript
private async request<T>(endpoint: string, options: RequestInit): Promise<T> {
    try {
        const response = await fetch(`${this.url}${endpoint}`, {
            ...options,
            headers: { ...this.getHeaders(), ...options.headers },
            credentials: 'include'
        });
        
        if (!response.ok) {
            const errBody = await response.json().catch(() => ({}));
            throw new Error(errBody.error ?? errBody.message ?? servicesMessage.error);
        }
        
        return await response.json() as T;
    } catch (error) {
        if (error instanceof Error && error.message !== "Network error") throw error;
        throw new Error(servicesMessage.error, { cause: error });
    } finally {
        this.wipeCredentials();
    }
}
```

---

## Issue 4: [Code Quality] Implicit Object Mutation in `validateUpdatePayload`

### Description
In `backEnd/src/controller/user.controller.ts`, the `validateUpdatePayload` function validates the request body but also implicitly mutates the `updateData` object passed by reference.
While this works in JavaScript/TypeScript, mutating objects passed as arguments is considered an anti-pattern (side-effect) and makes the data flow harder to trace, potentially leading to bugs in the future.

### Impact
Low. Code readability and maintainability issue.

### Proposed Solution
Refactor `validateUpdatePayload` to be a pure function that returns the validated partial object instead of mutating an external object.

```typescript
const validateUpdatePayload = async (req: Request, res: Response): Promise<Record<string, unknown> | null> => {
    // ... validation logic
    // if invalid, return null and send res.status(...)
    
    return {
        ...(name && { name }),
        ...(email && { email }),
        ...(password && { password: await bcrypt.hash(password, 10) })
    };
};
```
And in `updateUser`:
```typescript
const updateData = await validateUpdatePayload(req, res);
if (!updateData) return;
```
