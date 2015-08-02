var myApp = angular.module('myApp',[]);
myApp.controller('AppCtrl',['$scope','$http', function($scope, $http){
  console.log("Hello world form controller");

  var refresh = function(){

    //Indicando a rota onde buscar a lista de contatos
    $http.get('/contactList').success(function(response){
      console.log('Consegui os dados requisitados');
      $scope.contactList = response;
      delete $scope.contato;

    });
  };

  refresh();


  $scope.adicionarContato = function (contato){
    console.log(contato);
    $http.post('/contactList', contato).success(function(response){
      console.log(response);
      refresh();
    })
  };

  $scope.removerContato = function (id){
    //console.log(id);
    $http.delete('/contactList/' + id).success(function (response){
      refresh();
    });
  };

  //Passando o contato para o $scope.contato para posteriormente ser editado
  $scope.editarContato = function (id){
    console.log(id);
    $http.get('/contactList/' + id).success(function (response){
      $scope.contato = response;
    });
  };

  $scope.cancelarEdicao = function (){
    delete $scope.contato;
  };

  $scope.atualizarContato = function (){
    //console.log(contato._id);
    $http.put('/contactList/' + $scope.contato._id, $scope.contato).success(function (response){
      refresh();
    });
  };

}]);
