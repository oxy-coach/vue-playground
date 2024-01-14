const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        host: 'vue.test',
        port: 8081
    },
    configureWebpack: {
        devtool: 'source-map',
        performance: {
            maxEntrypointSize: 1024000,
            maxAssetSize: 1024000
        }
    }
})