export default {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    roots: ['<rootDir>/fox', '<rootDir>/src', '<rootDir>/backEnd'],
    testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
    collectCoverageFrom: [
        'fox/**/*.ts',
        'src/**/*.ts',
        'backEnd/**/*.ts',
        '!fox/**/*.test.ts',
        '!src/**/*.test.ts',
        '!backEnd/**/*.test.ts',
        '!fox/**/*.d.ts',
        '!src/**/*.d.ts',
        '!backEnd/**/*.d.ts',
        '!fox/**/test/**',
        '!fox/core/src/@types/**/*.ts',
        '!fox/core/src/module/dom/AFD/**',
        '!src/vite-env.d.ts',
        '!backEnd/src/config/createAdmin.ts'
    ],
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov'],
    coverageThreshold: {
        global: {
            branches: 99,
            functions: 99,
            lines: 99,
            statements: 99
        }
    },
    coveragePathIgnorePatterns: [
        '/fox/test/', 
        '/fox/core/src/@types/', 
        '/fox/core/src/module/dom/AFD/',
        'servicesConstants.ts'
    ],
    transform: {
        '^.+\\.(ts|tsx)$': ['ts-jest', { 
            tsconfig: 'tsconfig.jest.json',
            diagnostics: {
                ignoreCodes: [1343]
            }
        }]
    },
    passWithNoTests: true,
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleNameMapper: {
        '\\.html\\?raw$': '<rootDir>/__mocks__/rawLoaderMock.js',
        '^.+\\.css$': '<rootDir>/__mocks__/styleMock.js',
        '^(\\.\\.?/.*)\\.js$': '$1'
    }
};
