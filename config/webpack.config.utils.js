const path = require('path');
const PathsHelper = require(path.join(__dirname,'pathsHelper.js'));
const CleanWebpackPlugin = require('clean-webpack-plugin');

let ph = new PathsHelper();
module.exports = function (options) {

    if (options.mode === 'production'){

    } else if (options.mode === 'development'){
        this.devtool = "eval-source-map";
    }

    this.plugins = [
        new CleanWebpackPlugin([
            ph
                .root()
                .build()
                .getBasename()
        ],{
            root: ph
                .root()
                .getAbsolutePath()
        }),
    ];
    this.externals = {
        jquery:{
            root: 'jQuery',
            commonjs: 'jquery',
            commonjs2: 'jquery',
            amd:'jquery'
        },
        lodash:{
            root: '_',
            commonjs: 'lodash',
            commonjs2: 'lodash',
            amd:'lodash'
        }
    }
};
