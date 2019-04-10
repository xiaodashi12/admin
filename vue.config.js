
const path = require('path');

function resolve(dir) {
    return path.join(__dirname,'.', dir);
}

module.exports = {
    baseUrl : '/',
    publicPath : '/',
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('@assets',resolve('src/assets'))
            .set('styles',resolve('src/styles'))
            .set('@utils',resolve('src/utils'))
    },
    devServer:{
        // 设置代理
        // before: require('./src/mock'),
        proxy: {
            "/issue": {
                target: "http://127.0.0.1:8080", // 访问数据的计算机域名
                ws: true, // 是否启用websockets
                changOrigin: true //开启代理
            },
            "/archives": {
                target: "http://127.0.0.1:8080", // 访问数据的计算机域名
                ws: true, // 是否启用websockets
                changOrigin: true //开启代理
            }
        }

    }
}
