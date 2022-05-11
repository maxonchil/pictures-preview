module.exports = {
    preset: 'jest-preset-angular',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    testPathIgnorePatterns: [
        '^<rootDir>/node_modules/',
        '^<rootDir>/dist/',
        '^<rootDir>/.angular/',
    ],
    transform: {
        '^.+\\.(ts|js|html)$': 'jest-preset-angular',
    },
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$',
        },
    },
    testMatch: [
        '<rootDir>/src/app/**/*.spec.ts',
    ],
    transformIgnorePatterns: [
        '<rootDit>/node_modules/',
    ],
    moduleNameMapper: {
        '^@modules/(.*)': '<rootDir>/src/app/modules/$1',
        '^@pages/(.*)': '<rootDir>/src/app/pages/$1',
        '^@services/(.*)': '<rootDir>/src/app/services/$1',
        '^@shared/(.*)': '<rootDir>/src/app/shared/$1',
        '^@store/(.*)': '<rootDir>/src/app/store/$1',
    },
};
