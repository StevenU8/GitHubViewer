// Code goes here


(function() {

    var app = angular.module("githubViewer", []);

    var MainController = function($scope, $http) {

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

        $scope.search = function() {
            $http.get("https://api.github.com/users/" + $scope.username)
                .then(onUserComplete, onError);
        };

        $scope.username = "angular";
        $scope.message = "GitHub Viewer";
        $scope.repoSortOrder = "-stargazers_count";
    };

    app.controller("MainController", ["$scope", "$http", MainController]);

}());