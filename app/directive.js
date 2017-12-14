class Controller{
    /*@ngInject*/
    constructor($parse, $scope, $element, $attrs,version) {
        this.$scope = $scope;
        this.$element = $element;
        this.$parse = $parse;
        this.$attrs = $attrs;
        this.version = version;

    }
}

class Directive {
    /*@ngInject*/
    constructor() {
        this.restrict = 'AE';
        this.scope = {
        };
        this.controller = Controller;
        this.controllerAs = '$ctrl';
        this.bindToController = {
            ngModel:'=',
            // ngClick:'&?'
        };
        this.template = `
            <div >{{$ctrl.ngModel || $ctrl.version}}</div>
        `;
    }
}

angular.module('calculatorApp')
    .directive('calculatorDirective',() => new Directive())
