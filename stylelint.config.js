module.exports = {
    extends: [
        'stylelint-config-standard',
        'stylelint-config-prettier',
        'stylelint-config-sass-guidelines',
    ],
    // add your custom config here
    // https://stylelint.io/user-guide/configuration
    rules: {
        indentation: 4,
        'max-nesting-depth': 20,
        'selector-max-id': 5,
    },
}
