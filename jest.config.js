module.exports = {
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
        '^~/(.*)$': '<rootDir>/$1',
        '^vue$': 'vue/dist/vue.common.js',
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            'tests/__mocks__/fileMock.js'
    },
    moduleFileExtensions: ['ts', 'js', 'vue', 'json'],
    transform: {
        '^.+\\.ts$': 'ts-jest',
        '^.+\\.js$': 'babel-jest',
        '.*\\.(vue)$': 'vue-jest',
        '^.+\\.tsx?$': '<rootDir>/node_modules/ts-jest/preprocessor.js',
        '^.+\\.svg$': '<rootDir>/svgTransform.js'
    },
    collectCoverage: true,
    collectCoverageFrom: [
        '<rootDir>/components/**/*.vue',
        '<rootDir>/pages/**/*.vue',
        'src/**/*.{js,jsx}'
    ],
    testMatch: [
        '**/__tests__/**/*+(spec|test).[jt]s?(x)',
        '**/?(*.)+(spec|test).[jt]s?(x)'
    ]
}
