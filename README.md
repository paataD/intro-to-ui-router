ui-router tutorial
====

If you're like me you've used [ui-router](https://github.com/angular-ui/ui-router/) before with angular.js. Your applications probably look something like this [angular-starter](https://github.com/jasonshark/angular-starter) template:

```
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
});
```

`templates/main.html` gets rendered in `<div ui-view></div>` of `index.html`.

This is a pretty simple implementation of routing with angular.js but it has worked for me. Sometimes I added dynamic states:

```
.state('viewPost', {
	url: '/posts/:title',
	templateUrl: 'templates/post.html',
	controller: 'PostCtrl'
})
```

As expected, this will route to post with the post title. To access the post title (and fetch the appropriate post from the server) we can inject `$stateParams` to the controller.

```
app.controller('PostCtrl', function($scope, $stateParams, BASE_URL){
	var post_title = $stateParams.title;

	$http.get(BASE_URL + '/api/' + post_title).then(function(postData){
		$scope.post = postData.data;
	})
});
```

Once the controller is instantialized it will fire a request to the appropriate (made up) endpoint. Once that request is returned with data the data will populate the `post` property of the scope. We access that in the html template with curly braces: `{{post}}`.

The issue with this is that there could be a small delay from when the page loads to when the page is actually populated from the server.

From the [docs](https://github.com/angular-ui/ui-router/wiki):

> You can use resolve to provide your controller with content or data that is custom to the state. If any of these dependencies are promises, they will be resolved and converted to a value before the controller is instantiated and the `$stateChangeSuccess` event is fired.

This means the data will be ready before the state is changed into or the template loads. The data and template will load at the same time. Refactoring our code, we could do this:

```
.state('viewPost', {

	url: '/posts/:title',
	templateUrl: 'templates/post.html',
	resolve: {
		post: function($http){
			return $http.get(BASE_URL + '/api/' + post_title);
		}
	},
	controller: 'PostCtrl'
})
```

Resolve makes our controller simpler:

```
app.controller('PostCtrl', function($scope, post){
	$scope.post = post.data;
});
```

The resolve function in the state definition, like most things in angular, is injectable. So we used `$http` in there but it could easily have been something like the `Posts` service (not defined above). The user will only be redirected after all promises in the resolve object have finished.

What about navigating to a specific post? We can inject angular expressions into url parameters using [ng-href](https://docs.angularjs.org/api/ng/directive/ngHref). So in main.html we'll render all of our posts and provide each one with the appropriate link.

```
<ul>
	<li><a ng-href='/posts/{{post.title}}'>{{post.title}}</a></li>
</ul>
```

This will work fine. An alternative to this approach is to use the states that we define in the ui-router configuration. We want to navigate to the `'viewPost'` state and pass in the post title as a parameter. For that we can use `ui-sref`.

To navigate to a normal state without parameters use `$state.go('home');` in your javascript and `ui-sref='home'` for html anchor tags. You could combine html and javasctipt and do something wild and crazy like `<p ng-click="$state.go('home')">Go home</p>`.

`ui-sref="{post: 'post title goes here'}"

[ui-sref docs](http://angular-ui.github.io/ui-router/site/#/api/ui.router.state.directive:ui-sref)

-simple node server to send posts data
-params property
-views property (+ui-view)
-resolve property
-abstract states
-highlighted navigation bar with ng-class