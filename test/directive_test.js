'use strict';

describe('calculator',function () {
    beforeEach(module('calculatorApp'));

    describe('directive',function () {
        it('should print current version',function () {
            module(function ($provide) {
                $provide.value('version','TEST_VER');
            });
            inject(function ($compile,$rootScope,version) {
                let element = $compile('<span calculator-directive ng-model="name" ng-click="name = \'hello world\'"></span>')($rootScope);
                // $rootScope.name = 'hello world'
                // $rootScope.test = () => $rootScope.name = 'nice to meet'
                $rootScope.$digest();
                // console.log(element.scope())
                expect(element.text().trim()).toEqual('TEST_VER');
                browserTrigger(element,'click');
                expect(element.text().trim()).toEqual('hello world');
            });
        });
    });
});
