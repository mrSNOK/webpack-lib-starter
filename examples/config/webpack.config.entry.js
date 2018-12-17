const path = require('path');
const PathHelper = require(path.resolve(__dirname,'..','..','config','pathsHelper.js'));
const ph = new PathHelper();
module.exports = function (options) {
    this.entry = {
        bundle:['babel-polyfill',ph
            .root()
            .examples()
            .src()
            .searchInCurrentFolder('assets')
            .searchInCurrentFolder('js')
            .searchInCurrentFolder('index.js')
            .getAbsolutePath()]
    };
    this.output = {
        filename: 'assets/js/[name].[hash:6].js',
        chunkFilename: 'assets/js/[name].[chunkhash:6].chunk.js',
        path: ph
            .root()
            .examples()
            .build()
            .getAbsolutePath()
    };
};