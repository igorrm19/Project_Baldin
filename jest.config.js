export default {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    roots: ['<rootDir>/fox'],
    testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
    collectCoverageFrom: [
        'fox/**/*.ts',
        '!fox/**/*.test.ts',
        '!fox/**/*.d.ts',
        '!fox/**/test/**',
        '!fox/core/src/@types/**/*.ts',
    ],
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov'],
    coverageThreshold: {
        global: {
            branches: 85,
            functions: 85,
            lines: 85,
            statements: 85
        }
    },
    coveragePathIgnorePatterns: ['/fox/test/', '/fox/core/src/@types/'],
    transform: {
        '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: 'tsconfig.jest.json' }]
    },
    passWithNoTests: true,
    moduleNameMapper: {
        '^.+\\.html\\?raw$': '<rootDir>/__mocks__/rawLoaderMock.js',
        '^.+\\.css$': '<rootDir>/__mocks__/styleMock.js'
    }
};
