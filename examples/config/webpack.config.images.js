const path = require('path');
const PathHelper = require(path.resolve(__dirname,'..','..','config','pathsHelper.js'));
const ph = new PathHelper();

module.exports = function (options) {
    let imgLoaders = [
        {
            loader: "file-loader",//Copies required resource to outputPath folder. Returns path as outputPath+name
            options:{
                name:'[name].[hash:6].[ext]',
                outputPath:'assets/images/'
            }
        }
    ];
    if (options.mode === 'production'){
        imgLoaders.push(
            {
                loader:'image-webpack-loader', //adds compressing for images in production
                options:{
                    //TODO: compression options
                }
            }
        );
    }
    this.module = {
        rules: [
            {
                test:/\.(png|jpg|gif|svg)$/,
                use:imgLoaders
            }
        ]
    }
};
