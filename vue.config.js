const merge = require('webpack-merge');
module.exports = {
    chainWebpack: (config) => {
        config.module
            .rule('eslint')
            .use('eslint-loader')
            .tap(options => merge(options, { emitWarning: false }));
    },
    productionSourceMap: true,
    css: {
        sourceMap: process.env.NODE_ENV !== 'production',
    },
    devServer: {
        port: 9000,
        proxy: {
            '/webApi/*': {
                // target: 'http://192.168.1.37:18083',     // Arron本地
                // target: 'http://192.168.1.44:18084',        // 测试开发
                // target: 'http://192.168.1.45:18083',
                // target: 'http://103.24.95.153:18084',
                // target: 'http://175.176.192.106:18084',
                target: 'http://103.84.109.162:18084',
                pathRewrite: {
                    "/webApi": ""
                },
                changeOrigin: true,
                secure: false
            }
        },
    },
};