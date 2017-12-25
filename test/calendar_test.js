

describe('ngMaterialX.calendar',function () {
    let $rootScope,$compile,element;


    beforeEach(module('ngMaterialX.calendar'));
    beforeEach(module('ngMaterialX.dateUtil'));
    beforeEach(module('ngMaterialX.util'));
    beforeEach(function () {
        // module(function ($provide) {
        //     $provide.value('$mdDateLocale',{});
        //     $provide.value('mdxDateUtil',{});
        //     $provide.value('$mdColors',{});
        //     $provide.value('mdxUtil',{});
        // });
        module({
            $mdDateLocale:{},
            $mdColors:{}
        })
    })
    beforeEach(function () {

        inject(function (_$compile_,_$rootScope_,mdxDateUtil) {
            $rootScope = _$rootScope_;
            $compile = _$compile_;


        });
    });

    it('ngMaterialX.calendar single',function () {
        element = $compile(
            '<mdx-calendar mode="single">' +
            '</mdx-calendar>'
        )($rootScope);
        $rootScope.$digest();
        expect(element.text()).not.toEqual('');
    });

    it('ngMaterialX.calendar range',function () {
        element = $compile(
            '<mdx-calendar mode="range">' +
            '</mdx-calendar>'
        )($rootScope);
        $rootScope.$digest();
        dump(element.isolateScope().viewCount)
        expect(element.text()).not.toEqual('');
    });

});
