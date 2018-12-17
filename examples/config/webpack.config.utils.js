const path = require('path');

const PathHelper = require(path.resolve(__dirname,'..','..','config','pathsHelper.js'));
const ph = new PathHelper();
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = function (options) {

    if (options.mode === 'production'){
        this.optimization = { //define webpack defaults explicitly
            splitChunks: {
                chunks: 'all', //'async' is default value
                    minSize: 30000,
                    //maxSize: 0,//not supported in current version
                    minChunks: 1,
                    maxAsyncRequests: 5,
                    maxInitialRequests: 3,
                    automaticNameDelimiter: '~',
                    name: true,
                    cacheGroups: {
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                            priority: -10
                    },
                default: {
                        minChunks: 2,
                            priority: -20,
                            reuseExistingChunk: true
                    }
                }
            }
        }
    } else if (options.mode === 'development'){
        this.devServer = {
            noInfo:true,//turn to true to show less info about build process
            inline:true //inserts script in bundle, to take care of live reloading
        };
        this.devtool = "eval-source-map";
    }

    this.plugins = [
        new CleanWebpackPlugin([
            ph
                .root()
                .examples()
                .build()
                .getBasename()
        ],{
            root: ph
                .root()
                .examples()
                .getAbsolutePath()
        }),
        new webpack.ProvidePlugin({ //replaces a symbol in source through the respective import, but does not expose the symbol on the global namespace
            'window.jQuery': 'jquery',
            $:'jquery',
            jQuery:'jquery',
            _:'lodash',
            //Tether:'tether' //bootstrap 4 alpha 6 dependency
            Popper: ['popper.js', 'default']//bootstrap 4 beta dependency
        })
    ];
    /*this.externals = {
        [options.libName]:options.libExportName
    }*/
};
