const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
    devtool: false,
    entry: {
        index: path.join(__dirname, "./demo/src/demo.js")
    },
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'demo/dist'),
        //publicPath: './'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: path.resolve(__dirname, "node_modules"),
                use: {
                    loader: 'babel-loader'
                },
            },
            {
                test: /(\.less|\.css)$/,
                use: [
                    {
                        loader: "style-loader" // creates style nodes from JS strings
                    },
                    {
                        loader: "css-loader" // translates CSS into CommonJS
                    },
                    {
                        loader: "less-loader" // compiles Less to CSS
                    }
                ]
            }
        ]
    }
    ,
    plugins:
        [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('production')
            }),
            new HtmlWebpackPlugin({
                title: 'Output Management',
                filename: 'index.html',
                template: './demo/src/test.html'
            }),
            new cleanWebpackPlugin(['*'], {
                root: path.resolve(__dirname, './demo/dist'),
                verbose: true,
                dry: false
            }),
        ],
    devServer: {
        host: '192.168.98.152'
    }
}