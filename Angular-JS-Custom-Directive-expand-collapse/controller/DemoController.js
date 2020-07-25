/**
 * Created by Aneejian on 14-05-2015.
 */

// Creating the module
var demoApp = angular.module('demoApp', []);

// Creating the controller
demoApp.controller('DemoController', ['$scope', '$http', function($scope, $http) {
    
    $http.get('json/customDataSet1.json')
        .then(function(res){
            $scope.customDataList = JSON.parse(JSON.stringify(res.data));
            $scope.customDataSet1 = res.data;            
        });

    $http.get('json/customDataSet2.json')
        .then(function(res){
            $scope.customDataSet2 = res.data;
        });

    $scope.dataFlag = false;

    $scope.updateData = function(data, callBackFunction) {
        if($scope.dataFlag) {
            var obj = $scope.customDataSet1[data.id - 1];
            $scope.customDataList[data.id - 1] = cloneObject(obj);
            $scope.dataFlag = false;
        } else{
            var obj = $scope.customDataSet2[data.id - 1];
            $scope.customDataList[data.id - 1] = cloneObject(obj);
            $scope.dataFlag = true;
        }

        callBackFunction();
    };

    var cloneObject = function (obj) {
        return JSON.parse(JSON.stringify(obj));
    }
}]);
