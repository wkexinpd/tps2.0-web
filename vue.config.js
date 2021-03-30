module.exports = {
    // 打包优化：工程文件打包的时候不生成.map文件
    /**
     * npm run build编译之后，我们查看编译生成的文件，发现有很多.map文件，这些文件占了不小的空间。
     * .map文件的作用是帮助编译后的代码调试，但是我们上线的代码已经调试完成，所以上线时可以不生成
     * .map文件。
     */
    productionSourceMap: false,
    css: {
        loaderOptions: {
            // 给 less-loader 传递 Less.js 相关选项
            less: {
                javascriptEnabled: true
            }
        }
    },
    devServer: {
        proxy: {
            '/api': {
                target: 'http://106.12.151.3',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
            '/auth': {
                target: 'http://106.12.151.3',
                ws: true,
                changeOrigin: true,
            },
            '/user': {
                target: 'http://106.12.151.3',
                ws: true,
                changeOrigin: true,
            },
            '/teacher':{
                target: 'http://106.12.151.3',
                ws: true,
                changeOrigin: true,
            },
            '/major': {
                target: 'http://106.12.151.3',
                ws: true,
                changeOrigin: true,
            },
            '/lecture': {
                target: 'http://106.12.151.3',
                ws: true,
                changeOrigin: true,
            },
            '/direction': {
                target: 'http://106.12.151.3',
                ws: true,
                changeOrigin: true,
            },
            '/major-class': {
                target: 'http://106.12.151.3',
                ws: true,
                changeOrigin: true,
            },
            '/staff': {
                target: 'http://106.12.151.3',
                ws: true,
                changeOrigin: true,
            },
            '/student': {
                target: 'http://106.12.151.3',
                ws: true,
                changeOrigin: true,
            },
            '/oss': {
                target: 'http://106.12.151.3',
                ws: true,
                changeOrigin: true,
            },
            '/direction-class': {
                target: 'http://106.12.151.3',
                ws: true,
                changeOrigin: true,
            },
            '/plan': {
                target: 'http://106.12.151.3',
                ws: true,
                changeOrigin: true,
            },
            '/switch': {
                target: 'http://106.12.151.3',
                ws: true,
                changeOrigin: true,
            },
            '/major-direction-relation': {
                target: 'http://106.12.151.3',
                ws: true,
                changeOrigin: true,
            },
            '/curriculum': {
                target: 'http://106.12.151.3',
                ws: true,
                changeOrigin: true,
            },
            '/video': {
                target: 'http://106.12.151.3',
                ws: true,
                changeOrigin: true,
            },
            '/upload':{
                target: 'http://tps-img.oss-cn-beijing.aliyuncs.com',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/upload':'/',
                },
            }
        }
    },
    publicPath:"./",
    //transpileDependencies: ["sl-vue-tree"],
}
