import loginSchema from './login.schema.js';

describe('Login Schema', () => {
    it('should validate a valid login payload', () => {
        const payload = { email: 'TEST@test.com', password: 'password123' };
        const result = loginSchema.safeParse(payload);
        expect(result.success).toBe(true);
        if (result.success) {
            expect(result.data.email).toBe('test@test.com');
        }
    });

    it('should fail if email is invalid', () => {
        const payload = { email: 'invalid-email', password: 'password123' };
        const result = loginSchema.safeParse(payload);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues[0]?.message).toBe('Invalid email address');
        }
    });

    it('should fail if password is too short', () => {
        const payload = { email: 'test@test.com', password: 'short' };
        const result = loginSchema.safeParse(payload);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues[0]?.message).toBe('Password must be at least 8 characters long');
        }
    });
});
