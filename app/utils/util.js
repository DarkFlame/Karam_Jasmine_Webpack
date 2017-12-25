import angular from 'angular';

class Util {
    constructor() {

    }
    addCssRule(selector, ruleText, index, sheet) {
        sheet = sheet || (function () {
            let style = document.createElement('style');

            // WebKit hack :(
            style.appendChild(document.createTextNode(''));

            document.getElementsByTagName('head')[0].appendChild(style);

            return style.sheet;
        })();

        if ('insertRule' in sheet) {
            sheet.insertRule(`${selector} { ${ruleText} }`, index || sheet.cssRules.length);
        } else if ('addRule' in sheet) {
            sheet.addRule(selector, ruleText, index || -1);
        }
    }
}

export default angular.module('ngMaterialX.util', []).service('mdxUtil', Util);