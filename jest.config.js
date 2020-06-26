module.exports = {
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
        '^~/(.*)$': '<rootDir>/src/lib-components/$1',
        '^vue$': 'vue/dist/vue.common.js'
    },
    moduleFileExtensions: ['ts', 'js', 'vue', 'json'],
    transform: {
        '^.+\\.ts$': 'ts-jest',
        '^.+\\.js$': 'babel-jest',
        '.*\\.(vue)$': 'vue-jest'
    },
    collectCoverage: true,
    collectCoverageFrom: [
        '<rootDir>/components/**/*.vue',
        '<rootDir>/pages/**/*.vue'
    ],
    testMatch: [
        '**/__tests__/**/*+(spec|test).[jt]s?(x)',
        '**/?(*.)+(spec|test).[jt]s?(x)'
    ]
}
