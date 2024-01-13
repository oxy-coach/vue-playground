const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        host: '0.0.0.0',
        port: 8080
    },
    configureWebpack: {
        devtool: 'source-map',
        performance: {
            maxEntrypointSize: 1024000,
            maxAssetSize: 1024000
        }
    }
})