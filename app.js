var myApp = angular.module("importApp", []);

myApp.controller("appCtrl", function($scope) {
    $scope.flats = [
    {location: "Prenzlauerberg", 
     price: 550,
     link:"View Details" },
     {location: "Mitte", 
     price: 1100,
     link:"View Details" }];
     
     $scope.testCtrl = function(city) {
       alert(city);
     };
});

