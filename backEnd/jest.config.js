export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/src'],
    testMatch: ['**/?(*.)+(spec|test).ts'],
    moduleFileExtensions: ['ts', 'js', 'json'],
    collectCoverageFrom: [
        'src/**/*.ts',
        '!src/**/*.test.ts',
        '!src/**/*.d.ts',
        '!src/config/createAdmin.ts'
    ],
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov'],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80
        }
    },
    transform: {
        '^.+\\.(ts|tsx)$': ['ts-jest', { 
            tsconfig: 'tsconfig.json',
            diagnostics: {
                ignoreCodes: [1343]
            }
        }]
    },
    moduleNameMapper: {
        '^(\\.\\.?/.*)\\.js$': '$1'
    }
};
