angular.module('TVShowApp.controllers', [])
    .controller("showController", ['$scope', '$http', function($scope, $http) {

        var apiKey = '';
        $scope.results = [];
        var today = new Date();
        var apiDate = today.getFullYear() +
            ('0' + (today.getMonth() + 1)).slice(-2) +
            ('0' + today.getDate()).slice(-2);

        $http.jsonp(
            'http://api.trakt.tv/calendar/premieres.json/' +
                apiKey + '/' + apiDate + '/30?callback=JSON_CALLBACK'
        ).success(function(data) {
            angular.forEach(data, function(value, index) {
                var date = value.date;
                angular.forEach(value.episodes, function(tvshow, index) {
                    tvshow.date = date;
                    $scope.results.push(tvshow);
                });
            });
        }).error(function(error) {
            console.log(error);
        });
    }
]);