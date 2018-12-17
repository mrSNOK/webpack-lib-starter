const path = require('path');

const PathsHelper = require(path.join(__dirname,'pathsHelper.js'));
let ph = new PathsHelper();

const JsonFileModel = require(ph
    .root()
    .config()
    .searchInCurrentFolder('JsonFileModel')
    .getAbsolutePath()
);
let packageJsonModel = new JsonFileModel(ph
    .root()
    .searchInCurrentFolder('package.json')
    .getAbsolutePath()
);

module.exports = function (options) {
    let libName = options.libName || 'default.libname';
    let libFilename = libName + ((options.mode === 'production' ? '.min': '')+'.js');
    packageJsonModel.model.main = ph
            .root()
            .build()
            .getBasename()+'/'+libFilename;
    packageJsonModel.flushModel();
    this.entry = {
        bundle:ph
            .root()
            .src()
            .searchInCurrentFolder('index.js')
            .getAbsolutePath()
    };
    this.output = {
        filename: libFilename,
        library: options.libExportName,
        libraryTarget: 'umd',
        umdNamedDefine: true,
        path: ph
            .root()
            .build()
            .getAbsolutePath()
    };
};