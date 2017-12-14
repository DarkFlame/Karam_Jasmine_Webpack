angular.module('calculatorApp',[])
    .controller('CalculatorController',
    function CalculatorController($scope,$rootScope) {
        $scope.sum = function () {
            $scope.z = $scope.x + $scope.y;
        };
        this.name = 'sunyue';
        $scope.message = '';
        $rootScope.$on('global-message',function(e,message){
            $scope.message = message
        })
    });