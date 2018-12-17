const path = require('path');
const PathHelper = require(path.resolve(__dirname,'..','..','config','pathsHelper.js'));
const ph = new PathHelper();
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const cssnano = require('cssnano');

module.exports = function (options) {
    let postcssPlugins = [
        autoprefixer({
            browsers:['ie >= 9', 'last 4 version']
        })
    ];
    let styleLoaders = [
        {
            loader: 'css-loader', //interprets @import and url() like import/require() and will resolve them. Uses file-loader to replace url() paths. Returns modified css
            options:{
                sourceMap:options.mode === 'development'
            }
        },
        {
            loader:'postcss-loader',
            options:{
                plugins:postcssPlugins,
                sourceMap:options.mode === 'development'
            }
        },
        {
            loader: "resolve-url-loader",//when sass-loader @imports file with relative url(), path is relative to imported file location. so it cant be resolved relative to importing file. resolve-rl-loader solves this problem
            options:{

            }
        },
        {
            loader: "sass-loader",
            options: {
                sourceMap: true //sourcemaps needed by resolve-url-loader even in production mode
            }
        }
    ];
    let stylePlugins = [];
    if (options.mode === 'production'){
        postcssPlugins.push(cssnano());
        styleLoaders.unshift(
            {
                loader: MiniCssExtractPlugin.loader,//Extracts css to separate file as specified in corresponding plugin.
                options:{
                    publicPath:'../../' //Paths replaced by file loader are relative to build root. Search for them in the same way,
                }
            }
        );
        stylePlugins.push(
            new MiniCssExtractPlugin({
                filename:'assets/css/style.[hash:6].css',
                chunkFilename:'[id].[chunkhash:6].css'
            })
        );
    } else if (options.mode === 'development'){
        styleLoaders.unshift(
            {
                loader: 'style-loader',
                options:{
                    singleton:true //adds all css to single <style></style>
                }
            }
        );
    }
    this.module = {
        rules: [
            {
                test:/\.(sa|sc|c)ss$/,
                use:styleLoaders
            }
        ]
    };
    this.plugins = stylePlugins;
};
