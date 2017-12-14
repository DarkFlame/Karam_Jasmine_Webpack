angular.module('calculatorAppFilter',[])
    .filter('myFilter', function() {
        return function(input) {
            return input.toUpperCase() + 'hello,world';
        };
    });