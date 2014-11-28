var myApp = angular.module("importApp", []);



myApp.controller("appCtrl", function($scope, importIo) {
    $scope.flats = [
    {location: "Prenzlauerberg", 
     price: 550,
     link:"View Details" },
     {location: "Mitte", 
     price: 1100,
     link:"View Details" }];
     
     
     $scope.getResults = function(city){
           $scope.flats.length = 0;
           importIo.getData(city).then(function(response){
              console.log(response.data.results);
              var length = Math.min(20,response.data.results.length);
              for(i=1;i<length;i++) {
                 var flat = response.data.results[i];
                 $scope.flats.push({location: flat.location,
                                        price: flat.price,
                                       link: flat.link}
                  );
              }
              
  
           });  
       
       $scope.haveResults=true;
       
     }
     
     $scope.haveResults = false;
 
});

myApp.factory("importIo", function($http) {
    return {
         getData: function(city) {
            city = city.replace(" ","");
            return $http({method:"GET", 
                  url:"https://api.import.io/store/data/6d7b1385-227b-4c2a-b15b-15954adfc463/_query?input/webpage/url=http%3A%2F%2Fwww.zwischenmiete.de%2Fangebote_lesen.php%3FPHPSESSID%3D711e5395b1cb6e92968cad179d3fcb90%26stadt%3D"+city+"%26fuer%3DWohnungen%26mietart%3Degal%26zimin%3Degal%26zimax%3Degal&_user=edbab12f-9a27-4416-b538-7c8981e8bf15&_apikey=API_KEY_HERE"
                  
                  });
                   
         }
    };
});