const path = require('path');
const PathHelper = require(path.resolve(__dirname,'..','..','config','pathsHelper.js'));
const ph = new PathHelper();
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = function (options) {
    this.module = {
        rules: [
            {
                test:/\.php$/,
                use:[
                    {
                        loader: 'file-loader',
                        options:{
                            name:'[name].[hash:6].[ext]',
                            outputPath:'assets/php/'
                        }
                    }
                ]
            }
        ]
    };
    this.plugins = [
        new CopyWebpackPlugin([{
            from:ph
                .root()
                .examples()
                .src()
                .searchInCurrentFolder('assets')
                .searchInCurrentFolder('php')
                .searchInCurrentFolder('PHPMailer')
                .getAbsolutePath(),
            to:path.join('assets','php','PHPMailer')
        }])
    ];
};