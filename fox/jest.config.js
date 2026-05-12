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
        '\\.html\\?raw$': '<rootDir>/../__mocks__/rawLoaderMock.js',
        '^.+\\.css$': '<rootDir>/../__mocks__/styleMock.js',
        '^@/(.*)$': '<rootDir>/$1'
    },
    passWithNoTests: true
};
