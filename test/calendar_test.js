

describe('ngMaterialX.calendar',function () {
    let $rootScope,$compile,element;


    beforeEach(module('ngMaterialX.calendar'));
    beforeEach(function () {
        module(function ($provide) {
            $provide.value('$mdDateLocale',{});
            $provide.value('mdxDateUtil',{});
            $provide.value('$mdColors',{});
            $provide.value('mdxUtil',{});
        });
    })
    beforeEach(function () {

        inject(function (_$compile_,_$rootScope_) {
            $rootScope = _$rootScope_;
            $compile = _$compile_;
            element = $compile(
                '<mdx-calendar mode="single">' +
                '</mdx-calendar>'
            )($rootScope);
        });
    });

    it('ngMaterialX.calendar',function () {
        dump(element)
        expect(element.text()).toEqual('');
    });

});
