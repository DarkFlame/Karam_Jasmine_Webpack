angular.module('calculatorApp')
    .factory('CalculatorService',
        /*@ngInject*/
        function ($http,$rootScope) {
            return {
                getArr() {
                    return [1,2,3]
                },
                getPromiseTest() {
                    return $http.get('languages.json').then(res=>res.data)
                },
                getBroadcast(message){
                     $rootScope.$broadcast('global-message',message)
                }
            }
        })
    .service('CustomService',function () {
        this.name = 'hello'
    });