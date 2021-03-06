/**
 * Created by nathan on 2/3/15.
 */

angular.module('blake').directive("objectsForCopy", function () {
    return {
        restrict: 'E',
        scope: true,
        templateUrl: "/blake/static/directives/objects-for-copy/template.html",
        controller: "ObjectsForCopyController"
    }
});

angular.module('blake').controller("ObjectsForCopyController", function ($scope, BlakeDataService) {
    $scope.$watch(BlakeDataService.getSelectedCopy, function (copy) {
        if (copy) {
            $scope.copy = copy;
            BlakeDataService.getObjectsForCopy(copy.bad_id).then(function (data) {
                $scope.objects = data;
            })
        }
    });
});