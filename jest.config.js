export default {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    roots: ['<rootDir>/fox', '<rootDir>/src'],
    testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
    collectCoverageFrom: [
        'fox/**/*.ts',
        'src/**/*.ts',
        '!fox/**/*.test.ts',
        '!src/**/*.test.ts',
        '!fox/**/*.d.ts',
        '!src/**/*.d.ts',
        '!fox/**/test/**',
        '!fox/core/src/@types/**/*.ts',
        '!src/vite-env.d.ts'
    ],
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov'],
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100
        }
    },
    coveragePathIgnorePatterns: [
        '/fox/test/', 
        '/fox/core/src/@types/', 
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
        'servicesConstants$': '<rootDir>/__mocks__/constantsMock.js'
    }
};
