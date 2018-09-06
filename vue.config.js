const merge = require('webpack-merge');
module.exports = {
    chainWebpack: (config) => {
        config.module
            .rule('eslint')
            .use('eslint-loader')
            .tap(options => merge(options, { emitWarning: false }));
    },
    productionSourceMap: false,
    css: {
        sourceMap: process.env.NODE_ENV !== 'production',
    },
    devServer: {
        port: 9000,
        proxy: {
            '/api': {
                target: 'http://vuewebapp.lottofight.game.com',
                pathRewrite: {
                    '^/api': '/',
                },
            },
        },
    },
};