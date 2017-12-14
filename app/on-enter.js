
export default angular.module('ngMaterialX.onEnter', []).directive('mdxOnEnter', /*@ngInject*/($parse) => {
    return {
        restrict: 'AE',
        link: (scope, element, attrs) => {
            let handler = (event) => {
                if (event.which === 13) {
                    scope.$apply(() => {
                        $parse(attrs.mdxOnEnter)(scope, {
                            $event: event
                        });
                    });
                    event.preventDefault();
                }
            };
            scope.name = 100;
            element.on('keyup', handler);
            scope.$on('$destroy', ()=>{
                element.off('keyup', handler);
            });
        }
    };
});