// Code goes here


(function() {

    var app = angular.module("githubViewer", []);

    var MainController = function($scope, $http, $interval, $Log) {

        var onUserComplete = function(response) {
            $scope.user = response.data;
            $http.get($scope.user.repos_url)
                .then(onRepos, onError);
        };

        var onRepos = function(response) {
            $scope.repos = response.data;
        };

        var onError = function(reason) {
            $scope.error = "Could not fetch the user";
        }
        
        var decrementCountdown = function() {
            $scope.countdown -= 1;
            if ($scope.countdown < 1) {
                $scope.search();
            }
        }

        var startCountdown = function() {
            $interval(decrementCountdown, 1000, $scope.countdown);
        }

        $scope.search = function() {
            $http.get("https://api.github.com/users/" + $scope.username)
                .then(onUserComplete, onError);
        };

        $scope.username = "angular";
        $scope.message = "GitHub Viewer";
        $scope.repoSortOrder = "-stargazers_count";
        $scope.countdown = 5;
        startCountdown();
    };

    app.controller("MainController", MainController);

}());