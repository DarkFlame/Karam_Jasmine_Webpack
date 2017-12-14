describe('calculator',function () {

    module.sharedInjector();
    beforeAll(module("calculatorApp"));

    let CustomService,CalculatorService,$httpBackend,$rootScope,$controller;
    let jsonResponse = [{"name": "en"},{"name": "es"},{"name": "fr"}];
    beforeEach(inject(function ($injector,_CalculatorService_,_$rootScope_,_$httpBackend_,_CustomService_,_$controller_) {
        CalculatorService = _CalculatorService_;
        // CalculatorService = $injector.get('CalculatorService');
        // 或者直接 inject(function(CalculatorService){...})
        // 三种注入service的方法都可以，推荐第一种，因为我们注入一次之后，复制给事先声明的变量，这样我们在it块中引用统一的变量
        $controller = _$controller_;
        CustomService = _CustomService_;
        $httpBackend = _$httpBackend_;
        $rootScope = _$rootScope_;
        $httpBackend.whenGET('languages.json')
            .respond(jsonResponse);
    }));

    describe('test service',function () {
        it('should return [1,2,3]',function () {
            let arr = CalculatorService.getArr();
            expect(arr).toContain(1);
            expect(arr).toContain(2);
            expect(arr).toContain(3);
            expect(arr.length).toEqual(3);
        });
        it('should return hello',function () {
            let ser = CustomService;
            expect(ser).toBeDefined();
            expect(ser.name).toEqual('hello');
        });

        it('should return promise',function (done) {
            let promise = CalculatorService.getPromiseTest()

            promise.then(data=>{
                expect(data.map(z=>z.name)).toContain('en');
                expect(data.map(z=>z.name)).toContain('es');
                expect(data.map(z=>z.name)).toContain('fr');
                done();
            })
            $httpBackend.flush();
        });

        describe('it test broadcast',function () {
            let message = 'i is message',$scope
            beforeEach(function () {
                $scope = $rootScope.$new();
                 spyOn($rootScope,'$broadcast').and.callThrough();
                 spyOn($rootScope,'$on').and.callThrough();
            });
            it("should broadcast message", function() {
                $rootScope.$broadcast.and.stub();
                CalculatorService.getBroadcast(message);
                expect($rootScope.$broadcast).toHaveBeenCalled();
                expect($rootScope.$broadcast).toHaveBeenCalledWith("global-message", message);
            });
            it("should on message to message", function() {
                $controller('CalculatorController', { $scope: $scope });
                //更友好的方式把变量展示在控制台
                // trigger event
                CalculatorService.getBroadcast(message);
                expect($rootScope.$on).toHaveBeenCalled();
                expect($rootScope.$on).toHaveBeenCalledWith('global-message', jasmine.any(Function));
                expect($scope.message).toEqual(message);
            });
        });
    });

});