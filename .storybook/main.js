const path = require('path')

// Export a function. Accept the base config as the only param.
module.exports = {
    stories: ['../src/components/**/*.stories.js'],
    addons: [
        '@storybook/addon-knobs/register',
        '@storybook/addon-actions',
        '@storybook/addon-links',
        '@storybook/preset-typescript',
        '@storybook/addon-a11y/register',
        '@storybook/addon-docs/preset',
        'storybook-addon-themes'
    ],
    webpackFinal: async (config, { configType }) => {
        // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
        // You can change the configuration based on that.
        // 'PRODUCTION' is used when building the static version of storybook.

        // Make whatever fine-grained changes you need
        config.module.rules.push({
            test: /\.scss$/,
            include: path.resolve(__dirname, '../'),
            use: [
                'style-loader',
                'css-loader',
                'sass-loader',
                // {
                //     loader: 'sass-resources-loader',
                //     options: {
                //         resources: [
                //             path.resolve(__dirname, '../assets/scss/main.scss')
                //         ]
                //     }
                // }
            ]
        })

        config.resolve.alias = {
            ...config.resolve.alias,
            '@': path.resolve(__dirname, '../src')
        }

        // Return the altered config
        return config
    }
}
