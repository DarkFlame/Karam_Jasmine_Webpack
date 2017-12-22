describe('ngMaterialX.onEnter',function () {
    let $rootScope,$compile,element;
    beforeEach(module('ngMaterialX.onEnter'));
    beforeEach(function () {
        inject(function (_$compile_,_$rootScope_) {
            $rootScope = _$rootScope_;
            $compile = _$compile_;
            $rootScope.test = function (event) {
                $rootScope.name = 'sunyue'
            };
            spyOn($rootScope,'test').and.callThrough();
        });
        element = $compile('<span mdx-on-enter="test($event,1)"></span>')($rootScope);
    });

    it('ngMaterialX.onEnter',function () {
        expect(element.text()).toEqual('');
    });

    it('ngMaterialX.OnKeyup.Enter',function () {
        browserTrigger(element,'keyup',{which: 13});
        expect($rootScope.test).toHaveBeenCalled();
        expect($rootScope.test).toHaveBeenCalledWith(jasmine.any(Event),1);
        expect($rootScope.name).toEqual('sunyue');
    });
    it('ngMaterialX.OnKeyup.Not.Enter',function () {
        browserTrigger(element,'keyup',{which: 14});
        expect($rootScope.test).not.toHaveBeenCalled();
    });

});
