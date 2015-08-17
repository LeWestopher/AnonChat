/**
 * Created by Westopher on 8/13/2015.
 */

angular.module('ac.controllers', [])

    .controller('ChatBoxCtrl', ['$scope', '$rootScope', 'ChatService', function ($scope, $rootScope, ChatService) {
        $scope.activate = function () {
            console.log(ChatService.get());
        }
    }]);