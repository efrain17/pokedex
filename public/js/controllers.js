(function (_) {

  angular.module('pokedex.controllers', [])
    .controller('PokedexController', ['$rootScope','$scope', '$routeParams', 'pokemonService', function ($rootScope,$scope, $routeParams, pokemonService) {
      var type = $routeParams.type;
      $rootScope.title="Pokédex";
      var pokemonsOld=[];

      if (type) {
        $scope.type = type;

        pokemonService.byType(type).then(function (data) {
          $scope.pokemons = data
          $scope.groupped = partition(data, 4);
          pokemonsOld=$scope.pokemons;
        });
      } else {
        pokemonService.all().then(function (data) {
          $scope.pokemons = data;
          $scope.groupped = partition(data, 4);
          pokemonsOld=$scope.pokemons;
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
        $scope.groupped = partition(searchData, 4);
      }

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

    }]);

})(_);
