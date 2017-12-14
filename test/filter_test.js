describe('calculator', function () {
    let myFilter,$filter
    beforeEach(module('calculatorAppFilter'));
    beforeEach(inject(function ($injector) {
        $filter = $injector.get('$filter');
        // myFilter = $injector.get('myFilter');
    }));

    describe('filter', function () {
        it('name suffer with hello,world', function () {
            expect($filter('myFilter')('sunyue')).toBe('SUNYUEhello,world');
        });
    });

});