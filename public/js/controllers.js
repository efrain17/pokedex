(function (_) {

  angular.module('pokedex.controllers', [])
    .controller('PokedexController', ['$rootScope','$scope', '$routeParams', 'pokemonService', function ($rootScope,$scope, $routeParams, pokemonService) {
      var type = $routeParams.type;
      $rootScope.title="Pokédex";

      if (type) {
        $scope.type = type;

        pokemonService.byType(type).then(function (data) {
          $scope.pokemons = data
          $scope.groupped = partition(data, 4);
        });
      } else {
        pokemonService.all().then(function (data) {
          $scope.pokemons = data;
          $scope.groupped = partition(data, 4);
        });
      }


      function partition(data, n) {
        return _.chain(data).groupBy(function (element, index) {
          return Math.floor(index / n);
        }).toArray().value();
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

      function selectTab (tab) {
        $scope.tab = tab;
      };
    }]);

})(_);
