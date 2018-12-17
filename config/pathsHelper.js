let path = require('path');

function PathsHelper() {};

PathsHelper.prototype.searchInCurrentFolder = function(location){
    this.currentPath = path.join(this.currentPath,location);
    return this;
};
PathsHelper.prototype.root = function(){
    this.currentPath = path.resolve(__dirname,'..');
    return this;
};
PathsHelper.prototype.examples = function(){
    this.searchInCurrentFolder('examples');
    return this;
};
PathsHelper.prototype.config = function(){
    this.searchInCurrentFolder('config');
    return this;
};
PathsHelper.prototype.build = function(){
    this.searchInCurrentFolder('build');
    return this;
};
PathsHelper.prototype.src = function(){
    this.searchInCurrentFolder('src');
    return this;
};
PathsHelper.prototype.getAbsolutePath = function(){
    return this.currentPath;
};
PathsHelper.prototype.getBasename = function () {
    return path.basename(this.currentPath);
};
PathsHelper.prototype.toString = function () {
  return this.getAbsolutePath();
};
module.exports = PathsHelper;