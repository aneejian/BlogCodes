'use strict';
demoApp.directive('viewMore', function ($timeout, $window) {
    return {
        restrict: 'E',
        scope: {
            customdata: '='
        },
        templateUrl: 'directive/viewMoreDirective.html',
                    
        link: function (scope, elm, attrs) {
        }
    };
});
