module.exports = {
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '^~/(.*)$': '<rootDir>/src/components/$1',
        '^vue$': 'vue/dist/vue.common.js'
    },
    moduleFileExtensions: ['ts', 'js', 'vue', 'json'],
    transform: {
        '^.+\\.ts$': 'ts-jest',
        '^.+\\.js$': 'babel-jest',
        '.*\\.(vue)$': 'vue-jest',
        '^.+\\.tsx?$': '<rootDir>/node_modules/ts-jest/preprocessor.js',
        '^.+\\.svg$': '<rootDir>/.jest/svgTransform.js'
    },
    collectCoverage: true,
    collectCoverageFrom: [
        '<rootDir>/src/components/**/*.vue'
    ],
    testMatch: [
        '**/__tests__/**/*+(spec|test).[jt]s?(x)',
        '**/?(*.)+(spec|test).[jt]s?(x)'
    ]
}
