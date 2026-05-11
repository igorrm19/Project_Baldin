const USER_ROLES = {
    ADMIN: 'admin',
    USER: 'user'
} as const;

const MESSAGES_USER = {
    SUCCESS: 'User created successfully',
    ERROR: 'Failed to create user',
    UPDATE: 'User updated successfully',
    DELETE: 'User deleted successfully',
    GET: 'User fetched successfully',
    LOGIN: 'User logged in successfully',
    LOGOUT: 'User logged out successfully',
    LOGIN_FAILED: 'User login failed'
} as const;


export { USER_ROLES, MESSAGES_USER };
