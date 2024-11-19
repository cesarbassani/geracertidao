module.exports = {
    outputDir: '/var/www/app.geracertidao.com/html/',
    devServer: {
        proxy: {
            "/api/*": {
                target: "http://localhost:3001",
                secure: false
            }
        }
    },
    transpileDependencies: [
        /\bvue-awesome\b/
    ]
}
