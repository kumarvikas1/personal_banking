var app = angular.module('Personal-Banking',['chart.js','ngCookies','ngRoute']);

app.controller('AccountController',['$scope','$http','$location','$cookies',function($scope,$http,$location,$cookies){

$scope.accounts = '';
$scope.acc_names='';
$scope.acc_bal='';

$scope.bank_selected="";


$scope.accounts_details="";

$scope.username="";
$scope.password="";
$scope.isError="";
$scope.login_href="";
$scope.showNoTransaction="";
$scope.showTransaction="";
$scope.newuser= {
};


$scope.init_accounts = function() { 
	 $http.get('http://localhost:3000/accounts/?emailAddress='+$cookies.get('email')).success(function(response) {
	 	var json = [];
	 	var names = [];
	 	var bal =[];
        angular.forEach(response, function(value, key){
                json.push(value);
                names.push(value.bankName);
                bal.push(value.balance);
            });
        $scope.accounts = json;
        $scope.acc_names= names;
        $scope.acc_bal = bal;
    });
}


$scope.init_accounts_details = function() { 
     $http.get('http://localhost:3000/details/?emailAddress='+$cookies.get('email')+"&bankName="+$location.search().bank).success(function(response) {
        var json = [];
        angular.forEach(response, function(value, key){
                json.push(value);
            });
        if(json.length==0){
$scope.showNoTransaction=true
        } else {
$scope.showTransaction = true
        }
        $scope.accounts_details = json;
        $scope.bank_selected = $location.search().bank;
    });
}


$scope.login = function() {
$http.get('http://localhost:3000/users/?userId='+$scope.username).success(function(response) {
if(response != null && angular.fromJson(response).password==$scope.password){
    $cookies.put("email",$scope.username)
    $location.path("/welcome")
}
else {
    $scope.isError=true 
}
})}


$scope.register = function() {
$http({
          method  : 'POST',
          url     : 'http://localhost:3000/users',
          data    : $scope.newuser 
         })
 .success(function(response) {
$cookies.put("email",$scope.newuser.emailAddress)
$location.path('/welcome')
})
}

$scope.register_user = function() {
$location.path("/register")
}

$scope.sign_out = function() {
$cookies.remove('email');
}


$scope.home_link = function() {
    console.log($cookies.get('email'))
    if($cookies.get('email')==null){
$location.path("/")
    }
    else {
$location.path("/welcome")
}
}

}]);


app.config(function($routeProvider) {
        $routeProvider
            .when('/welcome', {
                templateUrl : 'welcome.html',
                controller : 'AccountController'
            })
            .when('/register', {
                templateUrl : 'register.html',
                controller : 'AccountController'
            })
             .when('/details', {
                templateUrl : 'details.html',
                controller : 'AccountController'
            })
             .otherwise({
                templateUrl : 'login.html',
                controller : 'AccountController'
            });

    });