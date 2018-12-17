import "../style/common-styles.scss";
import "bootstrap";
import webpackLibStarter from "../../../../../webpack-lib-starter";

console.log('examples scripts are loaded!');
console.log('lib in window context is :'+window.webpackLibStarter.default);
console.log('calling lib with lodash dependency in window context:');
try{
    new window.webpackLibStarter.default('camel-cased-greeting').greet();
}catch (err){
    console.error(err);
}

console.log('calling lib with lodash dependency in commonjs context:');
new webpackLibStarter('camel-cased-greeting').greet();