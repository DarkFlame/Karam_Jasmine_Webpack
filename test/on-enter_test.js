'use strict';

describe('ngMaterialX.onEnter', function() {
    beforeEach(module('ngMaterialX.onEnter'));

    describe('ngMaterialX.onEnter', function() {
        it('ngMaterialX.onEnter', function() {
            inject(function($compile, $rootScope) {
                let element = $compile('<span mdx-on-enter="console.log(1111);"></span>')($rootScope);
                expect(element.text()).toEqual('');
                expect($rootScope.name).toEqual(100);
            });
        });
    });
});
