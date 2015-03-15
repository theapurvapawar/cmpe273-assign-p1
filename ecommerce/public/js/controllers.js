var ecommerceControllers = angular.module('ecommerce-app', []);
/*
ecommerceApp.controller('ProductsController', function ($scope) {
  
  $http.get('phones/phones.json').success(function(data) {
    $scope.phones = data;
  
});
*/

ecommerceControllers.controller('StoreController',
	function ($scope, $http) {
  $http.get('/api/products').success(function(data) {
    $scope.products = data;
  });
});


ecommerceControllers.controller('CategoryController', 
	function ($scope, $http) {
  $http.get('/api/products/'+document.URL.split('store/')[1]).success(function(data) {
    $scope.products = data;
  });
});

ecommerceControllers.controller('ProductController', 
  function ($scope, $http) {
  $http.get('/api/products/product_id/' + document.URL.split('/')[
      document.URL.split('/').length-1
    ]).success(function(data) {
    $scope.products = data; 
    today = new Date();
    $scope.date = today.toString();
  });
});