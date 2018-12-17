const fs = require('fs');

function JsonFileModel(path){
    this.path = path;
    this.model = require(path);
}
JsonFileModel.prototype.flushModel = function(){
    fs.writeFileSync(this.path, JSON.stringify(this.model, null, 2), function (err) { //writing file sync because node can be crashed during async writing. that will cause file loss/
        if (err) return console.log('error writing file :\n'+err);
        //console.log(JSON.stringify(file));
        //console.log('writing to ' + this.path);
    });
};
module.exports = JsonFileModel;