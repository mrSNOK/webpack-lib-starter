/*
* use es6 modules for app src.
* create common, prod and dev configs.
* webpack.config.js in root of the project merges configs based on process.env.NODE_ENV with webpack-merge. WPMerge test: https://runkit.com/embed/u1kk97bcsyi7
* for both dev and prod add bootstrap and jquery.
* export jquery to window with provide plugin
*
*
* javascript
*   prod: no source maps
*         => add hashes to bundles
*         => convert to es5 with babel for legacy browsers support
*         => add babel polyfills for legacy browsers support
*         => uglyfy/minimize for performance purpose
*         => move vendor dependencies to separate chunks and add hashes for caching purpose
*   dev: include source maps for debugging
* html
*   prod: covert .pug to html
*         => generate html file from template with dynamicly inserted assets and scripts
*   dev: covert .pug to html
*         => generate html file from template with dynamicly inserted assets and scripts
* css
*   prod: convert sass to css
*         => add vendor prefixes
*         => minify css
*         => extract css to separate file and add hashes
*   dev: convert sass to css
*         => add vendor prefixes
*         => extract css to style tag
* images
*   prod: extract images required/imported in css and html to build/assets, replace paths to public
*   dev: minify images required/imported in css and html
*        => extract images to build/assets, replace paths to public
* fonts
*   prod: extract fonts required/imported in css to build/assets, replace paths to public
*   dev: extract fonts required/imported in css to build/assets, replace paths to public
* */

const merge = require('webpack-merge');
const prettyJSON = require('prettyjson');
const _ = require('lodash');
const PathsHelper = require('./config/pathsHelper');
let ph = new PathsHelper();

const EntryLibConfig = require(ph.root().config().searchInCurrentFolder('webpack.config.entry.js').getAbsolutePath());
const CommonJsConfig = require(ph.root().config().searchInCurrentFolder('webpack.config.javascript.js').getAbsolutePath());
const LibUtilsConfig = require(ph.root().config().searchInCurrentFolder('webpack.config.utils.js').getAbsolutePath());

const JsonFileModel = require(ph.root().config().searchInCurrentFolder('JsonFileModel').getAbsolutePath());
let packageJsonModel = new JsonFileModel(ph.root().searchInCurrentFolder('package.json').getAbsolutePath());

module.exports = (env, argv) => {
    const wpMode = argv.mode || 'development';
    const buildTarget = env.target || 'library';
    const libName = ph.root().getBasename();
    const libExportName = _.camelCase(libName);
    console.log(`============== building ${buildTarget} for ${wpMode}... ==============`);
    packageJsonModel.model.name = libName;
    packageJsonModel.flushModel();

    let mergedConfig;
    let configOptions = {
        mode:wpMode,
        libName: libName,
        libExportName: libExportName
    };
    console.log('buildTarget :'+buildTarget);
    if(buildTarget === 'library'){
        packageJsonModel.model.name = libName;
        packageJsonModel.flushModel();
        mergedConfig = merge.smart(
            new EntryLibConfig(configOptions),
            new CommonJsConfig(configOptions),
            new LibUtilsConfig(configOptions)
        );
    }else if (buildTarget === 'examples'){
        const EntryExmplConfig = require(ph.root().examples().config().searchInCurrentFolder('webpack.config.entry.js').getAbsolutePath());
        const FontsExmplConfig = require(ph.root().examples().config().searchInCurrentFolder('webpack.config.fonts.js').getAbsolutePath());
        const ImagesExmplConfig = require(ph.root().examples().config().searchInCurrentFolder('webpack.config.images.js').getAbsolutePath());
        const MailerExmplConfig = require(ph.root().examples().config().searchInCurrentFolder('webpack.config.mailer.js').getAbsolutePath());
        const StyleExmplConfig = require(ph.root().examples().config().searchInCurrentFolder('webpack.config.style.js').getAbsolutePath());
        const UtilsExmplConfig = require(ph.root().examples().config().searchInCurrentFolder('webpack.config.utils.js').getAbsolutePath());
        const ViewExmplConfig = require(ph.root().examples().config().searchInCurrentFolder('webpack.config.view.js').getAbsolutePath());

        mergedConfig = merge.smart(
            new EntryExmplConfig(configOptions),
            new CommonJsConfig(configOptions),
            new FontsExmplConfig(configOptions),
            new ImagesExmplConfig(configOptions),
            new MailerExmplConfig(configOptions),
            new StyleExmplConfig(configOptions),
            new UtilsExmplConfig(configOptions),
            new ViewExmplConfig(configOptions)
        );
    }

    console.log(`mergedConfig is :
        ${prettyJSON.render(mergedConfig,{
        keysColor: 'blue',
        dashColor: 'magenta',
        stringColor: 'white'
        }
    )}`);

    return mergedConfig;
};