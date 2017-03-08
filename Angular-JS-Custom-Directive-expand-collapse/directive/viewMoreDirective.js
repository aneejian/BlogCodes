/**
 * Created by Aneejian on 12/05/2015.
 */

'use strict';
demoApp.directive('viewMore', function ($timeout, $window) {
    return {
        restrict: 'E',
        scope: {
            customdata: '=',
            callback: '&'
        },
        templateUrl: 'directive/viewMoreDirective.html',
                    
        link: function (scope, elm, attrs) {

            var viewMore = function () {
                var id = scope.customdata.id;
                var offsetHeight = (elm[0].querySelector('#viewMoreDataDiv' + id)).offsetHeight; //Visible height of the viewMoreDataDiv div
                var scrollHeight = (elm[0].querySelector('#viewMoreDataDiv' + id)).scrollHeight; //Scrollable height of the viewMoreDataDiv div
                
                if ((offsetHeight + 2) < scrollHeight) {
                    $("#viewMoreDiv" + id).show();
                } else {
                    $("#viewMoreDiv" + id).hide();
                }
            };

            $timeout(function () {
                viewMore();
                scope.$apply();
            }, 10);

            var w = angular.element($window);

            w.bind('resize', function () {
                callBackFunction();
            });

            /** showMore - Called on click of 'View more' link **/
            scope.showMore = function (id) {
                var el = $("#viewMoreDataDiv" + id),
                curHeight = el.height(),
                autoHeight = el.css('height', 'auto').height(); //Temporarily change to auto and get the height.

                el.height(curHeight).animate({ height: autoHeight }, 600, function () {
                    /*Now, change the height to auto when animation finishes. 
                    Added to make the container flexible (Optional).*/
                    el.css('height', 'auto');
                });
                $("#viewMore" + id).hide();
                $("#viewLess" + id).show();
            }

            /** showLess - Called on click of 'View more' link **/
            scope.showLess = function (id) {
                $("#viewMoreDataDiv" + id).animate({ height: '160px' }, 500);
                $("#viewMore" + id).show();
                $("#viewLess" + id).hide();
            }

            /** updateData - Called on click of refresh button **/
            scope.updateData = function () {
                scope.callback({
                    cbFn: callBackFunction
                });
            }

            /** callBackFunction: Used for call back from controller to directive 
            after the execution of translation function **/
            var callBackFunction = function () {
                var id = scope.customdata.id;
                var $content = $('#viewMoreDataDiv' + id);

                $content.height('160px');
                $("#viewMore" + id).show();
                $("#viewLess" + id).hide();

                $timeout(viewMore, 0);
            }
        }
    };
});
