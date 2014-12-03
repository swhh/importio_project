var myApp = angular.module("importApp", []);

var apiKey = "apiKeyhere";

myApp.controller("appCtrl", function($scope, importIo) {
    $scope.flats = [];
          
     $scope.haveResults = false;
     $scope.page = 0;
     
     $scope.getResults = function(city,page){
          if(page != undefined) {
            page++;
            $scope.page++;
            console.log($scope.page);
          }
          else {
            $scope.page = 0;
          }
           $scope.flats.length = 0;
           importIo.getData1(city,page).then(function(response){
             if (response.data.results) {
              var length = Math.min(20,response.data.results.length);
              for(i=1;i<length;i++) {
                 var flat = response.data.results[i];
                 $scope.flats.push({location: flat.location,
                                        price: Number(flat.price.slice(0,-1)),
                                       link: flat.link}
                  );
              }
             } 
  
           });
           
           importIo.getData2(city,page).then(function(response){
             if (response.data.results) {
              var length = Math.min(20,response.data.results.length);
              for(i=1;i<length;i++) {
                 var flat = response.data.results[i];
                 $scope.flats.push({location: flat.location,
                                        price: Number(flat.price.slice(0,-1)),
                                       link: flat.link}
                  );
              }
             }
              
  
           });   
       $scope.haveResults=true;
       
     };


 
});

myApp.factory("importIo", function($http) {
         var url="";
    return {
         getData1: function(city,page) {
            if(city) {
              city = city.replace(" ","+");
            }
            if(page == undefined) {
               url = "https://api.import.io/store/data/6d7b1385-227b-4c2a-b15b-15954adfc463/_query?input/webpage/url=http%3A%2F%2Fwww.zwischenmiete.de%2Fangebote_lesen.php%3FPHPSESSID%3D711e5395b1cb6e92968cad179d3fcb90%26stadt%3D"+city+"%26fuer%3DWohnungen%26mietart%3Degal%26zimin%3Degal%26zimax%3Degal&_user=edbab12f-9a27-4416-b538-7c8981e8bf15&_apikey="+apiKey;
            }
            else {
               url = "https://api.import.io/store/data/6d7b1385-227b-4c2a-b15b-15954adfc463/_query?input/webpage/url=http%3A%2F%2Fwww.zwischenmiete.de%2Fangebote_lesen.php%3Flim%3D"+page+"%26fuer%3DWohnungen%26stadt%3D"+city+"%26PHPSESSID%3D711e5395b1cb6e92968cad179d3fcb90&_user=edbab12f-9a27-4416-b538-7c8981e8bf15&_apikey="+apiKey;
            }
            return $http({method:"GET", 
                  url:url
                  });
                   
         },
         getData2: function(city,page) {
            var url="";
            if(city) {
              city = city.replace(" ","-");
            }
            if(page == undefined) {
               url = "https://api.import.io/store/data/b98811cb-d0d2-4d75-b592-fea4b25d424e/_query?input/webpage/url=https%3A%2F%2Fwww.dreamflat.de%2Fwg-"+city+"%2F&_user=edbab12f-9a27-4416-b538-7c8981e8bf15&_apikey="+apiKey;
            }
            else {
               url = "https://api.import.io/store/data/b98811cb-d0d2-4d75-b592-fea4b25d424e/_query?input/webpage/url=https%3A%2F%2Fwww.dreamflat.de%2Fwg-"+city+"%2F%3Fpage%3D"+page+"&_user=edbab12f-9a27-4416-b538-7c8981e8bf15&_apikey="+apiKey;
            }
            return $http({method:"GET", 
                  url:url      
                  });
                   
         }
         
         
    };
});

myApp.directive('resize', function($window) {

   return {   restrict:"A",
   
       link:function (scope, element, attrs) {
          scope.$watch('haveResults'
          , function(value){
            if(scope.haveResults) {
            element.css("height","2000px");
            }
       });
      }
    };
  });
  
