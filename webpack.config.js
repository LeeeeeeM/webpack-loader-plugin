var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HotModuleReplacementPlugin = require('webpack').HotModuleReplacementPlugin;

var HelloWorldPlugin = require('./plugins/HelloWorldPlugin');

var FileListPlugin = require('./plugins/FileListPlugin');

var MyPlugin = require('./plugins/MyPlugin');

var MyAwesomePlugin = require('./plugins/MyAwesomePlugin');

module.exports = {
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000,
        hot: true
    },
    entry: path.join(__dirname, './src/app.js'),
    output: {
        path: path.join(__dirname, "dist"),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.html$/,
            use: ['html-loader', 'html-minify-loader']
        }]
    },
    resolveLoader: {
        modules: [path.join(__dirname, './src/loaders'), 'node_modules']
    },
    plugins: [
        new HtmlWebpackPlugin(),
        new HotModuleReplacementPlugin(),
        new HelloWorldPlugin({
            options: true
        }),
        new FileListPlugin({

        }),
        new MyPlugin({

        }),
        new MyAwesomePlugin()
    ]
}