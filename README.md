# Webpack library starter

Basic webpack configuration and folder layout for starting new UMD library or component. based on [webpack-project-starter](https://github.com/mrSNOK/webpack-project-starter)

## Features

Provides ability to build UMD library and usage examples in [parallel](https://www.npmjs.com/package/npm-run-all). Examples can be used for demonstration of library features and to test it during the development. As library peer dependencies should not be included in it's build, [webpack externals](https://webpack.js.org/configuration/externals/) is used in configuration. See config/webpack.config.js for more details.

## Usage commands

* npm run build-lib-dev : builds only library in development mode.
* npm run build-lib-prod : builds only library in production mode.
* npm run start-lib-dev : builds only library in development mode and watch for changes
* npm run build-examples-dev : builds only examples in development mode. Examples can import built library.
* npm run build-examples-prod : builds only examples in production mode. Examples can import built library.
* npm run start-examples-dev : builds only examples in development mode and serves them with webpack-dev-server. Examples can import built library.
* build-all-dev : sequentially build library and examples in development mode. Examples can import built library.
* build-all-prod : sequentially build library and examples in production mode. Examples can import built library.
* start-all-dev : sequentially build library and examples in development mode. Examples can import built library. Watches for changes in library or examples files. Serves examples with webpack-dev-server