export default {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    roots: ['<rootDir>/src'],
    testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
    collectCoverageFrom: [
        'src/**/*.ts',
        '!src/**/*.test.ts',
        '!src/**/*.d.ts',
        '!src/vite-env.d.ts'
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
        '\\.html\\?raw$': '<rootDir>/__mocks__/rawLoaderMock.cjs',
        '^.+\\.css$': '<rootDir>/__mocks__/styleMock.cjs',
        '^(\\.\\.?/.*)\\.js$': '$1'
    }
};
