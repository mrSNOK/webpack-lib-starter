const path = require('path');
const PathHelper = require(path.resolve(__dirname,'..','..','config','pathsHelper.js'));
const ph = new PathHelper();
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function (options) {
    this.module = {
        rules: [
            {
                test:/\.pug$/,
                use:[
                    {
                        loader:'pug-loader', // compiles pug templates to html
                        options: {
                            pretty:options.mode === 'development'
                        }
                    }
                ]
            }
        ]
    };
    this.plugins = [
        new HtmlWebpackPlugin({
            template: ph
                .root()
                .examples()
                .src()
                .searchInCurrentFolder('index.pug')
                .getAbsolutePath(),
            filename: "index.html",
            favicon: ph
                .root()
                .examples()
                .src()
                .searchInCurrentFolder('assets')
                .searchInCurrentFolder('img')
                .searchInCurrentFolder('fav.png')
                .getAbsolutePath()
        }),
        new AddAssetHtmlPlugin({
            filepath: require.resolve(ph.root().getAbsolutePath()),
            outputPath: 'assets/js',
            publicPath: 'assets/js'
        })
    ];
};
