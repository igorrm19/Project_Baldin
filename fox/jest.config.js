export default {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    roots: ['<rootDir>'],
    testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
    extensionsToTreatAsEsm: ['.ts'],
    transform: {
        '^.+\\.(ts|tsx)$': ['ts-jest', {
            tsconfig: {
                module: 'ESNext',
                moduleResolution: 'node',
                verbatimModuleSyntax: false,
                noEmit: true,
                allowJs: true,
                esModuleInterop: true
            },
            useESM: true
        }]
    },
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1',
        '\\.html\\?raw$': '<rootDir>/../__mocks__/rawLoaderMock.cjs',
        '^.+\\.css$': '<rootDir>/../__mocks__/styleMock.cjs',
        '^@/(.*)$': '<rootDir>/$1'
    },
    collectCoverageFrom: [
        'core/src/**/*.ts',
        '!core/src/**/*.test.ts',
        '!core/src/**/*.d.ts'
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
    passWithNoTests: true
};