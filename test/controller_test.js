describe('calculator', function () {

    beforeEach(module('calculatorApp'));
    let $controller;

    beforeEach(inject(function(_$controller_){
        $controller = _$controller_;
    }));

    describe('sum', function () {
        it('1 + 1 should equal 2', function () {
            let $scope = {};
            let controller = $controller('CalculatorController', { $scope: $scope });
            $scope.x = 1;
            $scope.y = 2;
            $scope.sum();
            expect($scope.z).toBe(3);
            expect(controller.name).toBe('sunyue');
            expect($scope.name1).toBe(undefined);
        });
    });

});