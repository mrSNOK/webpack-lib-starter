const path = require('path');
const PathsHelper = require(path.join(__dirname,'pathsHelper.js'));

module.exports = function (options) {
    this.module = {
        rules: [
            {
                test:/\.js$/,
                exclude:/node_modules/, //don't transform required third party scripts
                use:[
                    {
                        loader:'babel-loader', // runs js file through preset plugins and transpiles ES6 down to ES5
                        options:{
                            presets:['babel-preset-env']
                            //The sourceMap option is ignored. Instead, source maps are automatically enabled when webpack is configured to use them (via the devtool config option).
                        }
                    }
                ]
            }
        ]
    };
};