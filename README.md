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
	    });
});
```

`templates/main.html` gets rendered in `<div ui-view></div>` of `index.html`.

This is a pretty simple implementation of routing with angular.js but it has worked for me. 

To show off dynamic routing and some more advanced features of ui-router I fired up an express server in `server.js` that serves index.html and a posts API. Sometimes it in necessary to add dynamic states:

For a really basic implementation, getting the posts:

```
app.controller('MainCtrl', function($scope, $http){
	$http.get('/api/posts').then(function(posts){
		
		$scope.posts = posts.data;
		console.log($scope.posts);
	})
});
```

Once the controller is instantialized it will fire a request to the appropriate endpoint. Once that request is returned with data the data will populate the `posts` array on the scope.

In `templates/main.html` we render the posts to the screen with a simple `ng-repeat`.

```
<h1>All posts</h1>
<div class='col-sm-12'>
	<ul>
		<li ng-repeat='post in posts'>
			<a ng-href='/#/posts/{{post._id}}'>{{post.title}}</a>
		</li>
	</ul>
</div>
```

The issue with this, having the call in the controller, is that there will be a small delay from when the page loads to when the page is actually populated with data from the server. ui-router has a solution.

From the [docs](https://github.com/angular-ui/ui-router/wiki):

> You can use resolve to provide your controller with content or data that is custom to the state. If any of these dependencies are promises, they will be resolved and converted to a value before the controller is instantiated and the `$stateChangeSuccess` event is fired.

Using the resolve property in our state:

```
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
```

Resolve makes our controller more simple:

```
app.controller('MainCtrl', function($scope, posts){
	$scope.posts = posts;
});
```

The advantage of this approach is that `posts` is gauranteed to be available when the controller for the route is instantialized.


#### Show an individual post

So we have a lists of posts. Each post uses `ng-href` so that we can use `{{}}` in the path string passed in (`{{post._id}}). Let's define the route for an individual post:

```
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
```

The post controller is light again:

```
app.controller('PostCtrl', function($scope, post){
	$scope.post = post;
});
```

And the view is simple:

```
<h1>{{post.title}}</h1>

<p>{{post.description}}</p>
```


That `/#/` for the ng-href is ugly. ui-router uses states, so we can use `ui-sref` instead. ui-sref directs to a state instead of a route. Our post list becomes:

```
<h1>All posts</h1>
<div class='col-sm-12'>
	<ul>
		<li ng-repeat='post in posts'>
			<a ui-sref="viewPost({id: post.id})">{{post.title}}</a>
		</li>
	</ul>
</div>
```

To navigate to states in the javascript you can use `$state.go('state_name');`

For instance a simple back button on the post page:

`<div class='btn btn-primary' ng-click='goBack()'>< Back</div>`

and the method is defined in `PostCtrl`:

```
app.controller('PostCtrl', function($scope, post, $state){
	$scope.post = post;

	$scope.goBack = function(){
		$state.go('home');
	};
});
```



-params property
-views property (+ui-view)
-resolve property
-abstract states
-highlighted navigation bar with ng-class