(function (_) {

  angular.module('pokedex.controllers', [])
    .controller('PokedexController', ['$rootScope','$scope', '$routeParams', 'pokemonService', function ($rootScope,$scope, $routeParams, pokemonService) {
      var type = $routeParams.type;
      $rootScope.title="Pokédex";
      var pokemonsOld=[];
      $scope.currentPage = 1;
      $scope.maxSize = 7;
      $scope.itemsPerPage=12;

      if (type) {
        $scope.type = type;

        pokemonService.byType(type).then(function (data) {
          $scope.pokemons = data
          $scope.groupped = partition(data, 4);
          pokemonsOld=$scope.pokemons;
          $scope.totalItems =$scope.pokemons.length;
        });
      } else {
        pokemonService.all().then(function (data) {
          $scope.pokemons = data;
          $scope.groupped = partition(data, 4);
          pokemonsOld=$scope.pokemons;
          $scope.totalItems =$scope.pokemons.length;
        });
      }

      function partition(data, n) {
        return _.chain(data).groupBy(function (element, index) {
          return Math.floor(index / n);
        }).toArray().value();
      }

      $scope.searchPokemon= function(){
        var searchData=pokemonsOld.filter(function(data){
        return data.name.toLowerCase().indexOf($scope.textSearch.toLowerCase())!== -1;});
        $scope.pokemons = searchData;
        $scope.totalItems =parseInt($scope.pokemons.length/4);
        $scope.groupped = partition(searchData, 4);
      }

      $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
      };

      $scope.pageChanged = function() {
        console.log('Page changed to: ' + $scope.currentPage);
      };       

    }])

    .controller('PokemonController', ['$rootScope','$scope', '$routeParams', 'pokemonService', function ($rootScope,$scope, $routeParams, pokemonService) {
      var name = $routeParams.name;

      pokemonService.byName(name)
      .then(function (data) {
        $scope.pokemon = data;
        $rootScope.title='Pokédex | '+name;
      });
    }])

    .controller('TabsController',['$scope',function ($scope) {
       $scope.tab = 1;

      $scope.selectTab =function (tab) {
        $scope.tab = tab;
      };

      $scope.isActive =function(tab){
        return $scope.tab===tab; 
      };

    }])

    .controller('RatingCtrl', function ($scope) {
        $scope.rate =randomNUm();
        $scope.max = 7;
        $scope.isReadonly = false;

      $scope.hoveringOver = function(value) {
        $scope.overStar = value;
        $scope.percent = parseInt(100 * (value / $scope.max));
        };

      function randomNUm() {
         return Math.round(Math.random()*(7-1)+parseInt(1));
         }
    })

    .controller('PaginationDemoCtrl', function ($scope, $log) {
        
        $scope.bigTotalItems = 175;
        $scope.bigCurrentPage = 1;
      })

  .filter('startFromGrid', function() {
        return function(input, start) {
        start = +start;
        return input.slice(start);}
  });





})(_);
