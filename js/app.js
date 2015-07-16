
var app = angular.module('intro-ui-router', [
	'ui.router'
]);

app.config(function($stateProvider, $urlRouterProvider){

	$urlRouterProvider.otherwise("/");

	$stateProvider
	    .state('home', {
	      url: "/",
	      templateUrl: "templates/main.html",
	      controller: 'MainCtrl',
	      resolve: {
	      	posts: function($http){
	      		return $http.get('/api/posts').then(function(posts){
					return posts.data;
				});
	      	}
	      }
	    })
	    .state('viewPost', {
			url: '/posts/:id',
			templateUrl: 'templates/post.html',
			controller: 'PostCtrl',
			resolve: {
				post: function($http, $stateParams){
					console.log($stateParams);
					return $http.get('/api/posts/' + $stateParams.id).then(function(post){
						return post.data;
					});
				}
			}
		})
});