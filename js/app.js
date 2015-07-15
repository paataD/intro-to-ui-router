
var app = angular.module('intro-ui-router', [
	'ui.router'
]);

app.config(function($stateProvider, $urlRouterProvider){

	$urlRouterProvider.otherwise("/");

	$stateProvider
	    .state('home', {
	      url: "/",
	      templateUrl: "templates/main.html",
	      controller: 'MainCtrl'
	    })
	    .state('viewPost', {
			url: '/posts/:title',
			templateUrl: 'templates/post.html',
			controller: 'PostCtrl'
		})
});